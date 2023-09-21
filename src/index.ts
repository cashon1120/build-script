#! /usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import terminalLink from "terminal-link";
import { execSync, exec } from "child_process";
import clipboard from "clipboardy";
import { getVersion } from "./utils";
import { PojectName, Project } from "./types";
import ora from "ora";
import {
  config,
  BUILD_DOCKER_FILE_PATH,
  BUILD_CONFIG_PATH,
  IMAGE_URL,
  CONTAINER_URL_DEV,
  CONTAINER_URL_PROD,
} from "./config";

import { deployContainer } from "./deploy";

// 执行命令
async function execDocker(project: Project, version: string) {
  if (!fs.existsSync(BUILD_CONFIG_PATH)) {
    console.log(chalk.red(`🚫 ${BUILD_CONFIG_PATH} 目录不存在`));
    return;
  }
  if (!fs.existsSync(BUILD_DOCKER_FILE_PATH)) {
    console.log(chalk.red(`🚫 ${BUILD_DOCKER_FILE_PATH} 目录不存在`));
    return;
  }
  if (!fs.existsSync(project.distPath)) {
    console.log(chalk.red(`🚫 ${project.distPath} 目录不存在`));
    return;
  }
  console.log();
  fs.copyFileSync(BUILD_CONFIG_PATH, project.distPath + "/build.conf");
  console.log(chalk.blue(`✅ 拷贝 build.conf 至 ${project.distPath}`));

  const tagName = `harbor.emhes.cn:1080/platform/${project.name}:${version}`;

  const buildExecStr = `docker build -f ${BUILD_DOCKER_FILE_PATH} -t ${tagName} ${project.distPath}`;
  let spinner = ora(chalk.gray(`${buildExecStr}`)).start();

  const process = exec(buildExecStr);
  if (process && process.stdout && process.stderr) {
    process.on("close", function () {
      // const tagExecStr = `docker tag ${tagName} harbor.emhes.cn:1080/platform/${project.name}:${version}`;
      // console.log(chalk.blue(`执行 ${tagExecStr}`));
      // execSync(tagExecStr);
      spinner.stop();
      console.log(chalk.blue(`✅ ${buildExecStr}`));

      const pushExecStr = `docker push ${tagName}`;
      spinner = ora(chalk.gray(`${pushExecStr}`)).start();
      execSync(pushExecStr);
      spinner.stop();
      console.log(chalk.blue(`✅ ${pushExecStr}`));

      const removeExecStr = `docker rmi ${tagName}`;
      spinner = ora(chalk.gray(`${removeExecStr}`)).start();
      execSync(removeExecStr);
      spinner.stop();
      console.log(chalk.blue(`✅ ${removeExecStr}`));

      // 方便直接跳转到相关网页查看/操作
      const imageLink = terminalLink(
        "查看镜像",
        `${IMAGE_URL}/harbor/projects/${project.imageID}/repositories/${project.name}`
      );
      const containerProd = terminalLink(
        "发布版本(正式)",
        project.containerID.prod
          ? `${CONTAINER_URL_PROD}/new?from=${project.containerID.prod}`
          : CONTAINER_URL_PROD
      );
      const containerDev = terminalLink(
        "发布版本(测试)",
        project.containerID.dev
          ? `${CONTAINER_URL_DEV}/new?from=${project.containerID.dev}`
          : CONTAINER_URL_DEV
      );
      console.log();
      console.log(
        chalk.greenBright(`👌 Docker镜像推送成功: ${project.label}`),
        chalk.greenBright(`${project.name}:`),
        chalk.underline(chalk.greenBright(version)),
        version !== "dev" ? chalk.gray("(已复制)") : ""
      );
      console.log(); // 来个空行
      console.log(
        chalk.gray("👉 更多操作:"),
        chalk.blueBright(imageLink),
        chalk.blueBright(containerDev),
        chalk.blueBright(containerProd)
      );
      if (version !== "dev") {
        clipboard.writeSync(version);
      }
      console.log(); // 来个空行

      // deployContainer(project.name, version);
    });
  }
}

(function () {
  let version = "";
  let project: Project = {} as Project;
  let defaultProjectIndex = 0;
  let defaultVersionIndex = 1;
  const args = process.argv.splice(2);
  if (args[0]) {
    let hasProject = false;
    Object.keys(config).map((key: string, index: number) => {
      if (key === args[0]) {
        hasProject = true;
        defaultProjectIndex = index;
      }
    });
    // 没有找到对应的项目
    if (!hasProject) {
      console.log(
        chalk.gray("👻 没找到"),
        chalk.yellow(`{${args[0]}}`),
        chalk.gray("这个项目, 请从下方选择打包项目⬇️")
      );
    }
  }
  if (args[1] === "dev") {
    defaultVersionIndex = 0;
  }

  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "projectName",
        message: "打包项目",
        default: defaultProjectIndex,
        choices: Object.keys(config).map((key: string) => {
          return {
            key,
            name: config[key as PojectName].label,
            value: key,
          };
        }),
      },
      {
        type: "rawlist",
        name: "versionName",
        message: "打包版本",
        default: defaultVersionIndex,
        choices: [
          { name: "测试环境: dev", value: "dev" },
          getVersion(),
          "自定义",
        ],
      },
    ])
    .then((result) => {
      project = config[result.projectName as PojectName];
      const slectedVersion = result.versionName;
      if (slectedVersion !== "自定义") {
        version = slectedVersion;
        execDocker(project, version);
        return;
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "inputVersion",
            message: "请输入版本号(如: 1.0.xx.xxxx)",
            validate: (value: string) => {
              return value.split(".").length === 4
                ? true
                : chalk.red("🚫 版本号格式不正确, 正确格式为: x.x.xx.xxxx");
            },
          },
        ])
        .then((result) => {
          const { inputVersion } = result;
          version = inputVersion;
          execDocker(project, version);
        });
    });
})();
