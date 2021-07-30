<template>
  <div class="redis-data">
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
.redis-data {
  width: 100%;
  position: relative;
  height: calc(100vh - 76px - 40px);
  border: 1px solid #c7c7c7;
  border-radius: 6px;
  overflow: hidden;
}
</style>
