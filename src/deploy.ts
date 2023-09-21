import axios from "axios";
import chalk from "chalk";
import ora from "ora";
const spinner = ora(chalk.gray("正在发布, 请稍后..."))
const deployDev = (name: string) => {
  axios
    .post("http://192.168.70.2:9000/api/auth", {
      username: "admin",
      password: "Aore!@#+_6688",
    })
    .then((response) => {
      if (response.data && response.data.jwt) {
        console.log('登录成功')
        console.log(`http://192.168.70.2:9000/api/endpoints/2/docker/images/create?fromImage=harbor.emhes.cn:1080/platform/${name}:dev`)
        axios
          .post(
            `http://192.168.70.2:9000/api/endpoints/2/docker/images/create?fromImage=harbor.emhes.cn:1080/platform/${name}:dev`,
            {},
            {
              headers: {
                Authorization: response.data.jwt,
                "X-Registry-Auth": "eyJyZWdpc3RyeUlkIjoxfQ==",
              },
            }
          )
          .then((res) => {
            spinner.stop();
            console.log(chalk.green("✅ 发布成功!"));
          })
          .catch(() => {
            spinner.stop();
            console.log(chalk.red("自动发布失败，请点击上方链接手动发布"));
          });
      }
    })
    .catch(() => {
      spinner.stop();
      console.log(chalk.red("http://192.168.70.2:9000/api/auth 登录失败"));
    });
};

export const deployContainer = (name: string, env: string) => {
  spinner.start();
  setTimeout(() => {
    if (env === "dev") {
      deployDev(name);
      return;
    }
  }, 3000);
};
