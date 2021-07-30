<template>
  <el-row class="value-container">
    <ToolPane />
    <PropertyPane />
    <CodeEditor />
  </el-row>
</template>

<script>
import ToolPane from "@/components/tool-pane";
import PropertyPane from "@/components/property-pane";
import CodeEditor from "@/components/code-editor";
export default {
  components: { CodeEditor, ToolPane, PropertyPane },
};
</script>

<style lang="scss">
.value-container {
  padding: 8px;
  min-width: 440px;
  margin-left: 240px;
  .codemirror {
    height: 100%;
    .el-col {
      height: 100%;
    }
  }
}
</style>
