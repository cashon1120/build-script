#!/usr/bin/env node
import e from"fs";import t from"chalk";import s from"inquirer";import{execSync as o}from"child_process";import r from"terminal-link";const n=()=>{const e=new Date,t="1.0."+(e.getFullYear().toString().slice(2)+".")+(e.getMonth()+1).toString().padStart(2,"0")+e.getDate().toString().padStart(2,"0");return{name:`正式环境(${t})`,value:t}},i={cloud:{label:"运营平台",name:"vrm_cs_new",distPath:"/Users/ymhx/Documents/vrm_cs_new/dist/",id:2},zsmx:{label:"中升铭行",name:"vrm_new_zsmx",distPath:"/Users/ymhx/Documents/vrm_new_zsmx/dist",id:2},wx:{label:"亿盟公众号",name:"vrm_wx",distPath:"/Users/ymhx/Documents/vrm_login/dist",id:2},ubi:{label:"UBI",name:"vrm_ubi",distPath:"/Users/ymhx/Documents/vrm_ubi/dist",id:2},mz:{label:"慕再",name:"vrm_mz",distPath:"/Users/ymhx/Documents/vrm_ubi/dist",id:2},qtdp:{label:"前台大屏",name:"vrm_reception",distPath:"/Users/ymhx/Documents/vrm_big_screen_new/dist",id:2}},m="/Users/ymhx/Documents/build/build.conf",a="/Users/ymhx/Documents/build/build.Dockerfile";!function(){let l="",c={};async function d(){if(!e.existsSync(m))return void console.log(t.red(`⛔ ${m} 目录不存在`));if(!e.existsSync(a))return void console.log(t.red(`⛔ ${a} 目录不存在`));if(!e.existsSync(c.distPath))return void console.log(t.red(`⛔ ${c.distPath} 目录不存在`));console.log(t.gray("开始执行docker命令...")),e.copyFileSync(m,c.distPath+"/build.conf"),console.log(t.blue(`拷贝 build.conf 至 ${c.distPath}`));const s=`docker build -f ${a} -t emhes/${c.name}:${l} ${c.distPath}`;console.log(t.blue(`${s} ...`)),o(`${s}`);const n=`docker tag emhes/${c.name}:${l} harbor.emhes.cn:1080/platform/${c.name}:${l}`;console.log(t.blue(`${n} ...`)),o(n);const i=`docker push harbor.emhes.cn:1080/platform/${c.name}:${l}`;console.log(t.blue(`${i} ...`)),o(i);const d=r("[查看镜像]",`https://harbor.emhes.cn:1080/harbor/projects/${c.id}/repositories/${c.name}`),h=r("[发布版本]","https://serverweb.emhes.cn/#/containers");console.log(t.greenBright(`👌 操作成功, 项目信息: ${c.label}(${l})`),t.gray("   👉"),t.blueBright(d),t.blueBright(h))}s.prompt([{type:"rawlist",name:"projectName",message:"打包项目",choices:Object.keys(i).map((e=>({key:e,name:i[e].label,value:e})))},{type:"rawlist",name:"versionName",message:"打包版本",choices:[{name:"测试环境(dev)",value:"dev"},n(),"自定义"]}]).then((e=>{c=i[e.projectName];const o=e.versionName;if("自定义"!==o)return l=o,void d();s.prompt([{type:"input",name:"inputVersion",message:"请输入版本号(如: 1.0.xx.xxxx)"}]).then((e=>{const{inputVersion:s}=e;var o;l="dev"===(o=s)?"dev":4!==o.split(".").length?"":o,l?d():console.log(t.red("🚫 版本号格式不正确, 正确格式为: x.x.xx.xxxx"))}))}))}();
