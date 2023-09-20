#! /usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import { execSync } from "child_process";
import terminalLink from "terminal-link";
import { getVersion, setVersion } from "./utils";
import { PojectName, Project } from "./types";
import { config } from "./config";
import { BUILD_DOCKER_FILE_PATH, BUILD_CONFIG_PATH } from "./constant";

(function () {
  let version = "";
  let project: Project = {} as Project;

  async function build() {
    if (!fs.existsSync(BUILD_CONFIG_PATH)) {
      console.log(chalk.red(`⛔ ${BUILD_CONFIG_PATH} 目录不存在`));
      return;
    }
    if (!fs.existsSync(BUILD_DOCKER_FILE_PATH)) {
      console.log(chalk.red(`⛔ ${BUILD_DOCKER_FILE_PATH} 目录不存在`));
      return;
    }
    if (!fs.existsSync(project.distPath)) {
      console.log(chalk.red(`⛔ ${project.distPath} 目录不存在`));
      return;
    }

    console.log(chalk.gray("开始执行docker命令..."));

    fs.copyFileSync(BUILD_CONFIG_PATH, project.distPath + "/build.conf");
    console.log(chalk.blue(`拷贝 build.conf 至 ${project.distPath}`));

    const buildExecStr = `docker build -f ${BUILD_DOCKER_FILE_PATH} -t emhes/${project.name}:${version} ${project.distPath}`;
    console.log(chalk.blue(`${buildExecStr} ...`));
    execSync(`${buildExecStr}`);

    const tagExecStr = `docker tag emhes/${project.name}:${version} harbor.emhes.cn:1080/platform/${project.name}:${version}`;
    console.log(chalk.blue(`${tagExecStr} ...`));
    execSync(tagExecStr);

    const pushExecStr = `docker push harbor.emhes.cn:1080/platform/${project.name}:${version}`;
    console.log(chalk.blue(`${pushExecStr} ...`));
    execSync(pushExecStr);

    const harborLink = terminalLink(
      "[查看镜像]",
      `https://harbor.emhes.cn:1080/harbor/projects/${project.id}/repositories/${project.name}`
    );
    const pushLink = terminalLink(
      "[发布版本]",
      "https://serverweb.emhes.cn/#/containers"
    );
    console.log(
      chalk.greenBright(`👌 操作成功, 项目信息: ${project.label}(${version})`),
      chalk.gray("   👉"),
      chalk.blueBright(harborLink),
      chalk.blueBright(pushLink)
    );
  }

  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "projectName",
        message: "打包项目",
        choices: Object.keys(config).map((key: string) => {
          return {
            key: key,
            name: config[key as PojectName].label,
            value: key,
          };
        }),
      },
      {
        type: "rawlist",
        name: "versionName",
        message: "打包版本",
        choices: [
          { name: "测试环境(dev)", value: "dev" },
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
        build();
        return;
      }
      const inputVersion = () => {
        inquirer
          .prompt([
            {
              type: "input",
              name: "inputVersion",
              message: "请输入版本号(如: 1.0.xx.xxxx)",
            },
          ])
          .then((result) => {
            const { inputVersion } = result;
            version = setVersion(inputVersion);
            if (!version) {
              console.log(
                chalk.red("🚫 版本号格式不正确, 正确格式为: x.x.xx.xxxx")
              );
              return;
            }
            build();
          });
      };
      inputVersion();
    });
})();
