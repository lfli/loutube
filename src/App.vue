<template>
  <div class="app-box">
    <Header class="header" @toggle-side-drawer="show = !show" />
    <div class="content">
      <Sidebar class="sidebar" />
      <router-view />
    </div>
  </div>
  <transition name="sideDrawer">
    <SideDrawer @close="show = false" v-if="show" />
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
  --scrollbarWidth: 12px;
}
.app-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header {
  height: var(--headerHeight);
  width: calc(100vw - var(--scrollbarWidth));
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.97);
}
.content {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
}
.sidebar {
  position: absolute;
  top: var(--headerHeight);
  width: var(--sidebar);
  height: calc(100vh - var(--headerHeight));
}

/* router-view */
.content > div:last-child {
  position: absolute;
  left: var(--sidebar);
  width: calc(100vw - var(--sidebar));
  height: 100vh;
  overflow-y: scroll;
  padding-top: var(--headerHeight);
  background-color: var(--themeBgColor);
}

/* 滑动条样式 ↓ */
.content > div:last-child::-webkit-scrollbar {
  width: var(--scrollbarWidth);
}
.content > div:last-child::-webkit-scrollbar-track-piece {
  background-color: #f1f1f1;
}
.content > div:last-child::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
}
/* 滑动条样式 ↑ */

@media screen and (max-width: 800px) {
  .sidebar {
    width: 0;
  }
  /* router-view */
  .content > div:last-child {
    width: 100vw;
    left: 0;
  }
}
span[class~="iconfont"] {
  cursor: pointer; /** 鼠标变小手 */
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
