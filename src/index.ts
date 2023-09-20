#! /usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import { execSync } from "child_process";

import { getVersion, setVersion } from "./utils";
import { config } from "./config";
import { BUILD_DOCKER_FILE_PATH, BUILD_CONFIG_PATH } from "./constant";

(function () {
  let version = "";
  let project: any = {};

  async function build() {
    console.log(chalk.green(`${project.label}: ${version}`));
    console.log("执行命令========================>");

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

    console.log(
      chalk.green(
        "执行完成, 查看镜像: https://harbor.emhes.cn:1080, 发布版本: https://serverweb.emhes.cn/#/containers"
      )
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
            name: config[key].label,
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
      project = config[result.projectName];
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
              console.log(chalk.red("版本号格式不正确, 如: 1.0.xx.xxxx"));
              return;
            }
            build();
          });
      };
      inputVersion();
    });
})();
