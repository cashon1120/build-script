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

export const CONTAINER_URL_PROD_ZSMS = 'http://zsmxweb.emhes.cn:9000/#!/2/docker/containers'

/**
 * 运营JAVA版本容器地址
*/
export const CONTAINER_URL_CLOUD_JAVA = 'https://servervideo.emhes.cn/#!/2/docker/containers'

/**
 * build.conf 文件目录
*/
export const BUILD_CONFIG_PATH = "/Users/ymhx/Documents/build/build.conf";


/**
 * build.Dockerfile 文件目录
*/
export const BUILD_DOCKER_FILE_PATH = "/Users/ymhx/Documents/build/build.Dockerfile";

const PROJECT_PATH = '/Users/ymhx/Documents/'


export const config: ConfigType = {
  cloud: {
    label: "运营平台",
    name: "vrm_cs_new",
    distPath: `${PROJECT_PATH}vrm_cs_new/dist/`,
    imageID: 2,
  },

  cloud_java: {
    label: "运营平台(JAVA)",
    name: "vrm_cs_java",
    distPath: `${PROJECT_PATH}vrm_cs_new/dist/`,
    imageID: 2,
    containerURL: CONTAINER_URL_CLOUD_JAVA
  },
  bjsz: {
    label: "北京市政",
    name: "vrm_cs_bjsz",
    distPath: `${PROJECT_PATH}vrm_cs_new/dist/`,
    imageID: 2,
    containerURL: CONTAINER_URL_CLOUD_JAVA
  },
  chache: {
    label: "尤恩叉车平台",
    name: "vrm_cs_new",
    distPath: `${PROJECT_PATH}vrm_cs_new/dist/`,
    imageID: 2,
    containerURL: CONTAINER_URL_PROD_CHACHE
  },
  ccScreen: {
    label: "尤恩叉车大屏",
    name: "vrm_chachescreen",
    distPath: `${PROJECT_PATH}chache_big_screen/dist/`,
    imageID: 2,
    containerURL: CONTAINER_URL_PROD_CHACHE
  },
  wx: {
    label: "运营公众号",
    name: "vrm_wx",
    distPath: `${PROJECT_PATH}vrm_login/dis`,
    imageID: 2,
  },
  zsmx: {
    label: "中升铭行",
    name: "vrm_new_zsmx",
    distPath: `${PROJECT_PATH}vrm_new_zsmx/dist`,
    containerURL: CONTAINER_URL_PROD_ZSMS,
    imageID: 2,
  },
  ubi: {
    label: "UBI",
    name: "vrm_ubi",
    distPath: `${PROJECT_PATH}vrm_ubi/dist`,
    imageID: 2,
  },
  mz: {
    label: "慕再",
    name: "vrm_mz",
    distPath: `${PROJECT_PATH}vrm_mz/dist`,
    imageID: 2,
  },
  qtdp: {
    label: "前台大屏",
    name: "vrm_reception",
    distPath: `${PROJECT_PATH}vrm_big_screen_new/dist`,
    imageID: 2,
  },
  gcdp: {
    label: "跟车大屏",
    name: "vrm_gcscreen",
    distPath: `${PROJECT_PATH}follow_screen/dist`,
    imageID: 2,
  },
};
