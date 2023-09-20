export type PojectName = "cloud" | "zsmx" | "wx" | "ubi" | "mz" | "qtdp";

export interface Project {
  label: string;
  name: string;
  // 打包后的目录所在位置
  distPath: string;
  // 对应仓库里的项目id，比如platform的id就是2
  id: number;
}

export type ConfigType = {
  [key in PojectName]: Project;
};
