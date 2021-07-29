<template>
  <el-header height="22px">
    <div class="dragable"></div>
    <div class="app-ops" @click="handleClick">
      <i class="icon mini-size el-icon-minus" data-ops="app-mini"></i>
      <i class="icon max-size el-icon-full-screen" data-ops="app-max"></i>
      <i class="icon close el-icon-close" data-ops="app-close"></i>
    </div>
  </el-header>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  methods: {
    handleClick(e) {
      const ops = e.target.dataset.ops || "none";
      ipcRenderer.send(ops);
    },
  },
};
</script>

<style>
.dragable {
  height: 100%;
  flex: 1 1 0;
  user-select: none;
  -webkit-app-region: drag;
}
.icon {
  font-size: 10px;
  padding: 2px;
  color: transparent;
  padding: 2px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 8px;
}
.icon:hover {
  color: #fff;
}
.mini-size {
  background-color: #32d635;
}
.max-size {
  background-color: #fdbb26;
}
.close {
  background-color: #f54f50;
}
</style>
