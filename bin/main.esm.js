#!/usr/bin/env node
import e from"fs";import t from"chalk";import o from"inquirer";import s from"terminal-link";import{exec as r,execSync as n}from"child_process";import i from"clipboardy";import a from"ora";const c=()=>{const e=new Date,t="1.0."+e.getFullYear().toString().slice(2)+"."+(e.getMonth()+1).toString().padStart(2,"0")+e.getDate().toString().padStart(2,"0");return{name:`正式环境: ${t}`,value:t}},l="http://47.110.158.152:9000/#/containers",m="/Users/ymhx/Documents/build/build.conf",d="/Users/ymhx/Documents/build/build.Dockerfile",g={cloud:{label:"运营平台",name:"vrm_cs_new",distPath:"/Users/ymhx/Documents/vrm_cs_new/dist/",imageID:2},chache:{label:"尤恩叉车平台",name:"vrm_cs_new",distPath:"/Users/ymhx/Documents/vrm_cs_new/dist/",imageID:2,containerURL:l},ccScreen:{label:"尤恩叉车大屏",name:"vrm_chachescreen",distPath:"/Users/ymhx/Documents/chache_big_screen/dist/",imageID:2,containerURL:l},wx:{label:"运营公众号",name:"vrm_wx",distPath:"/Users/ymhx/Documents/vrm_login/dist",imageID:2},zsmx:{label:"中升铭行",name:"vrm_new_zsmx",distPath:"/Users/ymhx/Documents/vrm_new_zsmx/dist",imageID:2},ubi:{label:"UBI",name:"vrm_ubi",distPath:"/Users/ymhx/Documents/vrm_ubi/dist",imageID:2},mz:{label:"慕再",name:"vrm_mz",distPath:"/Users/ymhx/Documents/vrm_ubi/dist",imageID:2},qtdp:{label:"前台大屏",name:"vrm_reception",distPath:"/Users/ymhx/Documents/vrm_big_screen_new/dist",imageID:2}};async function h(o,c){if(!e.existsSync(m))return void console.log(t.red(`🚫 ${m} 目录不存在`));if(!e.existsSync(d))return void console.log(t.red(`🚫 ${d} 目录不存在`));if(!e.existsSync(o.distPath))return void console.log(t.red(`🚫 ${o.distPath} 目录不存在`));console.log(),e.copyFileSync(m,o.distPath+"/build.conf"),console.log(t.blue(`✅ 拷贝 build.conf 至 ${o.distPath}`));const l=`harbor.emhes.cn:1080/platform/${o.name}:${c}`,g=`docker build -f ${d} -t ${l} ${o.distPath}`;let h=a(t.gray(`${g}`)).start();const u=r(g);u&&u.stdout&&u.stderr&&u.on("close",(function(){h.stop(),console.log(t.blue(`✅ ${g}`));const e=`docker push ${l}`;h=a(t.gray(`${e}`)).start(),n(e),h.stop(),console.log(t.blue(`✅ ${e}`));const r=`docker rmi ${l}`;h=a(t.gray(`${r}`)).start(),n(r),h.stop(),console.log(t.blue(`✅ ${r}`));const m=s("查看镜像",`https://harbor.emhes.cn:1080/harbor/projects/${o.imageID}/repositories/${o.name}`),d=o.containerURL||"https://serverweb.emhes.cn/#/containers",u=s("发布[正式]版本",d),p=s("发布[测试]版本","http://192.168.70.2:9000/#!/2/docker/containers");console.log(),console.log(t.greenBright(`👌 Docker镜像推送成功: ${o.label}`),t.greenBright(`${o.name}:`),t.underline(t.greenBright(c)),"dev"!==c?t.gray("(已复制)"):""),console.log(),console.log(t.gray("👉 更多操作:"),t.cyanBright(u),t.yellowBright(p),t.blueBright(m)),"dev"!==c&&i.writeSync(c),console.log()}))}!function(){let e="",s={},r=0,n=1;const i=process.argv.splice(2);if(i[0]){let e=!1;Object.keys(g).map(((t,o)=>{t===i[0]&&(e=!0,r=o)})),e||console.log(t.gray("👻 没找到"),t.yellow(`{${i[0]}}`),t.gray("这个项目, 请从下方选择打包项目⬇️"))}"dev"===i[1]&&(n=0),console.log(t.yellow("🔰 打包前请确认docker已启动!")),console.log(),o.prompt([{type:"rawlist",name:"projectName",message:"打包项目",default:r,choices:Object.keys(g).map((e=>({key:e,name:g[e].label,value:e})))},{type:"rawlist",name:"versionName",message:"打包版本",default:n,choices:[{name:"测试环境: dev",value:"dev"},c(),"自定义"]}]).then((r=>{s=g[r.projectName];const n=r.versionName;if("自定义"!==n)return e=n,void h(s,e);o.prompt([{type:"input",name:"inputVersion",message:"请输入版本号(如: 1.0.xx.xxxx)",validate:e=>4===e.split(".").length||t.red("🚫 版本号格式不正确, 正确格式为: x.x.xx.xxxx")}]).then((t=>{const{inputVersion:o}=t;e=o,h(s,e)}))}))}();
