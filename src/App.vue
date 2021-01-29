<template>
  <div class="app-box">
    <Header @toggle-side-drawer="show = !show" />
    <div>
      <Sidebar />
      <router-view />
    </div>
  </div>
  <transition name="sideDrawer">
    <SideDrawer @toggle-side-drawer="show = !show" v-if="show" />
  </transition>
  <transition name="cloth">
    <div v-if="show" class="cloth" @click="show = false"></div>
  </transition>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header/index.vue"; // @ is an alias to /src
import Sidebar from "@/components/Sidebar/index.vue";
import SideDrawer from "@/components/SideDrawer/index.vue";

@Options({
  components: {
    Header,
    Sidebar,
    SideDrawer,
  },
})
export default class App extends Vue {
  show = false;
}
</script>

<style>
:root {
  --headerHeight: 56px;
  --sidebar: 72px;
  --themeBgColor: rgb(249, 249, 249);
  --sideDrawerWidth: 240px;
  --translateXSideDrawer: -240px;
}
.app-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
/* header 的高度 */
.app-box > div:first-child {
  height: var(--headerHeight);
}
/* 内容的高度 */
.app-box > div:last-child {
  display: flex;
  height: calc(100% - var(--headerHeight));
}
/* sidebar 的宽度 */
.app-box > div:last-child > div:first-child {
  width: var(--sidebar);
}
/* 内容的宽度 */
.app-box > div:last-child > div:last-child {
  width: calc(100% - var(--sidebar));
  background-color: var(--themeBgColor);
}
@media screen and (max-width: 800px) {
  .app-box > div:last-child > div:first-child {
    width: 0;
  }
  .app-box > div:last-child > div:last-child {
    width: 100%;
  }
}
.cloth {
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

/* 遮布动画 */
.cloth-enter-active {
  animation: cloth-in 0.2s;
}
.cloth-leave-active {
  animation: cloth-in 0.2s reverse;
}
@keyframes cloth-in {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.5);
  }
}

/* 抽屉动画 */
.sideDrawer-enter-active {
  animation: sideDrawer-in 0.2s;
}
.sideDrawer-leave-active {
  animation: sideDrawer-in 0.2s reverse;
}
@keyframes sideDrawer-in {
  0% {
    transform: translateX(var(--translateXSideDrawer));
  }
  100% {
    transform: translateX(0);
  }
}

/* css 初始化 */
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
button,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
body {
  background: #fff;
  color: #555;
  font-size: 14px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
}
td,
th,
caption {
  font-size: 14px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  font-size: 100%;
}
address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
  font-style: normal;
  font-weight: normal;
}
a {
  color: #555;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
img {
  border: none;
}
ol,
ul,
li {
  list-style: none;
}
input,
textarea,
select,
button {
  font: 14px Verdana, Helvetica, Arial, sans-serif;
}
table {
  border-collapse: collapse;
}
html {
  overflow-y: scroll;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
</style>
