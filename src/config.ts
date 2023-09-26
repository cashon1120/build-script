import { ConfigType } from "./types";

/**
 * 镜像地址
*/
export const IMAGE_URL = "https://harbor.emhes.cn:1080"

/**
 * 容器地址(测试)
*/
export const CONTAINER_URL_DEV = 'http://192.168.70.2:9000/#!/2/docker/containers'

/**
 * 容器地址(正式)
*/
export const CONTAINER_URL_PROD = 'https://serverweb.emhes.cn/#/containers'

/**
 * 叉车容器地址(正式)
*/
export const CONTAINER_URL_PROD_CHACHE = 'http://47.110.158.152:9000/#/containers'


/**
 * build.conf 文件目录
*/
export const BUILD_CONFIG_PATH = "/Users/ymhx/Documents/build/build.conf";


/**
 * build.Dockerfile 文件目录
*/
export const BUILD_DOCKER_FILE_PATH = "/Users/ymhx/Documents/build/build.Dockerfile";


export const config: ConfigType = {
  cloud: {
    label: "运营平台",
    name: "vrm_cs_new",
    distPath: "/Users/ymhx/Documents/vrm_cs_new/dist/",
    imageID: 2,
  },
  chache: {
    label: "叉车",
    name: "vrm_cs_new",
    distPath: "/Users/ymhx/Documents/vrm_cs_new/dist/",
    imageID: 2,
    containerURL: CONTAINER_URL_PROD_CHACHE
  },
  wx: {
    label: "运营公众号",
    name: "vrm_wx",
    distPath: "/Users/ymhx/Documents/vrm_login/dist",
    imageID: 2,
  },
  zsmx: {
    label: "中升铭行",
    name: "vrm_new_zsmx",
    distPath: "/Users/ymhx/Documents/vrm_new_zsmx/dist",
    imageID: 2,
  },
  ubi: {
    label: "UBI",
    name: "vrm_ubi",
    distPath: "/Users/ymhx/Documents/vrm_ubi/dist",
    imageID: 2,
  },
  mz: {
    label: "慕再",
    name: "vrm_mz",
    distPath: "/Users/ymhx/Documents/vrm_ubi/dist",
    imageID: 2,
  },
  qtdp: {
    label: "前台大屏",
    name: "vrm_reception",
    distPath: "/Users/ymhx/Documents/vrm_big_screen_new/dist",
    imageID: 2,
  },
};
