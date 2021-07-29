<template>
  <div class="value-container">
    <ToolPane />
    <PropertyPane />
    <CodeEditor />
  </div>
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
  flex-grow: 1;
  flex-shrink: 0;
  overflow: auto;
  .el-row {
    margin-bottom: 16px;
  }
  .codemirror {
    height: 100%;
    .el-col {
      height: 100%;
    }
  }
}
</style>
