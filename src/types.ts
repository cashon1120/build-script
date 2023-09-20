export type PojectName = "cloud" | "zsmx" | "wx" | "ubi" | "mz" | "qtdp";

export interface Project {
  label: string;
  name: string;
  distPath: string; // 打包后的目录所在位置
  id: number; // 对应仓库里的项目id，比如platform的id就是2
}

export type ConfigType = {
  [key in PojectName]: Project;
};
