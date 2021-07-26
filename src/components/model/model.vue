<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      v-bind="$attrs"
      v-on="$listeners"
      @close="handleHidden"
    >
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "n-model",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialogVisible: this.visible,
    };
  },
  watch: {
    visible(newValue) {
      this.dialogVisible = newValue;
    },
  },
  methods: {
    handleHidden() {
      this.dialogVisible = false;
      this.$emit("update:visible", false);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
