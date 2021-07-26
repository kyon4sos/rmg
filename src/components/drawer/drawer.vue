<template>
  <el-drawer
    :visible.sync="drawerVisible"
    v-bind="$attrs"
    @close="handleHidden"
  >
    <template #title>
      <slot name="title"> </slot>
    </template>
    <slot></slot>
  </el-drawer>
</template>

<script>
export default {
  name: "n-drawer",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawerVisible: this.visible,
    };
  },
  watch: {
    visible(newVal) {
      this.drawerVisible = newVal;
    },
  },
  methods: {
    handleHidden() {
      this.$emit("update:visible", this.drawerVisible);
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
