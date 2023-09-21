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
    containerID: {
      dev: 'ce0d89adc73b5d7a6b01a74722698106b2ec980ff1e87184de02394ae7c433be',
      prod: '1bde2cd986c54b58fe84d58f40c380b7afa4f5a02495e25e934582376dea78ce'
    }
  },
  wx: {
    label: "运营公众号",
    name: "vrm_wx",
    distPath: "/Users/ymhx/Documents/vrm_login/dist",
    imageID: 2,
    containerID: {
      dev: '',
      prod: '901aa887210e83dbe25305e5764ab3514dd7ec8a9ec6a6216d2f0cb92169bd7b'
    }
  },
  zsmx: {
    label: "中升铭行",
    name: "vrm_new_zsmx",
    distPath: "/Users/ymhx/Documents/vrm_new_zsmx/dist",
    imageID: 2,
    containerID: {
      dev: '1421bcb7f14f8fdafef1f81d278ef7be2892a728b92175e7f2b2b9ad241e6f0b',
      prod: '2cdac7e4d29d2932d5d876cef04a738cd81c62ff6585479539a24e98932d444f'
    }
  },
  ubi: {
    label: "UBI",
    name: "vrm_ubi",
    distPath: "/Users/ymhx/Documents/vrm_ubi/dist",
    imageID: 2,
    containerID: {
      dev: '',
      prod: '414c1543b3501397ff482a2559298b0bc999dcf7a3d9b3b3533edd102c7dd331'
    }
  },
  mz: {
    label: "慕再",
    name: "vrm_mz",
    distPath: "/Users/ymhx/Documents/vrm_ubi/dist",
    imageID: 2,
    containerID: {
      dev: 'f8775986acf3f71d605e9c6e9a478c1c1974f4ecfd9874b7782ce1aafbc61e7b',
      prod: ''
    }
  },
  qtdp: {
    label: "前台大屏",
    name: "vrm_reception",
    distPath: "/Users/ymhx/Documents/vrm_big_screen_new/dist",
    imageID: 2,
    containerID: {
      dev: '',
      prod: '28c0d09e8ef926ddab9aaa9a5ae252383ff847050c9f8296c9f769ed38f04f86'
    }
  },
};
