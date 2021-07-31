<template>
  <div>
    <n-icon icon="el-icon-setting" @click="drawer = true"></n-icon>
    <n-drawer
      :visible.sync="drawer"
      direction="ltr"
      title="设置"
      custom-class="server-drawer"
      :size="280"
    >
      <div class="drawer-body">
        <div class="setting-item">
          <span>背景色</span>
          <el-color-picker
            v-model="color"
            show-alpha
            size="small"
            :predefine="predefineColors"
            @active-change="handleActiveChange"
            @change="handleChange"
          >
          </el-color-picker>
        </div>
      </div>
    </n-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      color: "rgba(255, 69, 0, 0.68)",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
    };
  },
  methods: {
    handleActiveChange(color) {
      console.log(color);
      const ele = document.documentElement;
      ele.style.setProperty("--mainColor", color);
    },
    handleChange() {},
  },
};
</script>

<style lang="scss">
.drawer-body {
  padding: 0px 20px;
  color: #333;
}
.setting-item {
  padding: 8px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}
</style>
