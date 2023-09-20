#! /usr/bin/env node

import { execSync } from "child_process";
import fs from 'fs';
import inquirer from "inquirer";
import chalk from "chalk";

import { config } from "./config";
import { BUILD_DOCKER_FILE_PATH, BUILD_CONFIG_PATH } from "./constant";

const setVersion = (env: string) => {
  if (env === "dev") {
    return "dev";
  }
  if (env.split(".").length !== 4) {
    return "";
  }
  return env;
};

(function () {
  let projectKey = "";
  let version = "";
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "打包项目",
        message: "请选择打包项目",
        choices: Object.keys(config).map((key: string) => config[key].label),
      },
    ])
    .then((answer) => {
      Object.keys(config).map((key: string) => {
        if (config[key].label === answer["打包项目"]) {
          projectKey = key;
        }
      });
      inquirer
        .prompt([
          {
            type: "input",
            name: "版本号",
            message: "请输入版本号(测试环境:dev, 开发环境: 1.0.xx.xxxx)",
          },
        ])
        .then((result) => {
          const inputVersion = result["版本号"];
          if (!inputVersion) {
            console.log(chalk.red("请输入版本号"));
            return;
          }
          version = setVersion(inputVersion);
          if (!version) {
            console.log(chalk.red("版本号格式不正确, 如: 1.0.xx.xxxx"));
            return;
          }
          const project = config[projectKey];
          console.log(chalk.green(`打包信息: ${project.label} - ${version}`))
          console.log('projectKey: ' + project.distPath)
          console.log('执行命令========================>')
          async function build() {
            await fs.copyFileSync(BUILD_CONFIG_PATH, project.distPath + '/build.conf')
            console.log(chalk.green(`拷贝 build.conf 至 ${project.distPath}`))
            
            const buildStr = `docker build -f ${BUILD_DOCKER_FILE_PATH} -t emhes/${project.name}:${version} ${project.distPath}`;
            console.log(chalk.blue(`${buildStr} ...`));
            await execSync(`${buildStr}`);

            const tagStr = `docker tag emhes/${project.name}:${version} harbor.emhes.cn:1080/platform/${project.name}:${version}`;
            console.log(chalk.blue(`${tagStr} ...`));
            await execSync(tagStr);

            const pushStr = `docker push harbor.emhes.cn:1080/platform/${project.name}:${version}`;
            console.log(chalk.blue(`${pushStr} ...`));
            await execSync(pushStr);

            console.log(
              chalk.green(
                "执行完成, 查看镜像: https://harbor.emhes.cn:1080, 发布版本: https://serverweb.emhes.cn/#/containers"
              )
            );
          }
          build();
        });
    });
})();
