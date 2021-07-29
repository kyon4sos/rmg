<template>
  <div class="home">
    <ToolBar />
    <RedisData />
  </div>
</template>

<script>
import ToolBar from "@/components/toolbar";
import RedisData from "@/components/redis-data";
export default {
  name: "Home",
  components: { ToolBar, RedisData },
  methods: {},
};
</script>
<style lang="scss">
.home {
  // padding-right: 16px;
  height: calc(100vh - 76px);
}
</style>
