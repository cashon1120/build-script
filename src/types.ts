export type PojectName = "cloud" | "zsmx" | "wx" | "ubi" | "mz" | "qtdp" | "chache" | "ccScreen";

export interface Project {
  label: string;
  name: string;
  distPath: string; // 打包后的目录所在位置
  imageID: number; // 对应镜像仓库里的项目id，比如platform的id就是2
  containerURL?: string
}

export type ConfigType = {
  [key in PojectName]: Project;
};
