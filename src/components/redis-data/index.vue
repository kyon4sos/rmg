<template>
  <div class="data-wrap">
    <KeyPane />
    <ValuePane />
  </div>
</template>

<script>
import ValuePane from "@/components/value-pane";
import KeyPane from "@/components/key-pane";
export default {
  components: { ValuePane, KeyPane },
};
</script>

<style>
.data-wrap {
  flex-shrink: 0;
  height: calc(100vh - 76px - 40px);
  display: flex;
  border: 1px solid #c7c7c7;
  border-radius: 6px;
  overflow: hidden;
}
</style>
