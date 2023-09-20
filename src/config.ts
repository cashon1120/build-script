import {ConfigType} from './types'

// build.conf 文件所在目录
export const BUILD_CONFIG_PATH = "/Users/ymhx/Documents/build/build.conf";

// build.Dockerfile 文件所在目录
export const BUILD_DOCKER_FILE_PATH = "/Users/ymhx/Documents/build/build.Dockerfile";

export const config: ConfigType = {
  cloud: {
    label: "运营平台",
    name: "vrm_cs_new",
    distPath: "/Users/ymhx/Documents/vrm_cs_new/dist/",
    id: 2
  },
  zsmx: {
    label: "中升铭行",
    name: "vrm_new_zsmx",
    distPath: "/Users/ymhx/Documents/vrm_new_zsmx/dist",
    id: 2
  },
  wx: {
    label: "亿盟公众号",
    name: "vrm_wx",
    distPath: "/Users/ymhx/Documents/vrm_login/dist",
    id: 2
  },
  ubi: {
    label: "UBI",
    name: "vrm_ubi",
    distPath: "/Users/ymhx/Documents/vrm_ubi/dist",
    id: 2 
  },
  mz: {
    label: "慕再",
    name: "vrm_mz",
    distPath: "/Users/ymhx/Documents/vrm_ubi/dist",
    id: 2 
  },
  qtdp: {
    label: "前台大屏",
    name: "vrm_reception",
    distPath: "/Users/ymhx/Documents/vrm_big_screen_new/dist",
    id: 2
  },
};
