<template>
  <el-table :data="data"  style="width: 100%" border>
    <el-table-column
      :type="c.type"
      :prop="c.prop"
      :label="c.label"
      :width="c.width"
      :key="idx"
      v-for="(c, idx) in columns"
    >
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
