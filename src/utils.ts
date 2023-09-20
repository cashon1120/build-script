import dayjs from 'dayjs';

export const getVersion = () => {
    let str = '1.0.'
    const date = new Date()
    const year = date.getFullYear().toString().slice(2) + '.'
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const version =  str + year + month + day
    return {
        name: `正式环境${version}`,
        value: version
    }
};

export const setVersion = (env: string) => {
  if (env === "dev") {
    return "dev";
  }
  if (env.split(".").length !== 4) {
    return "";
  }
  return env;
};
