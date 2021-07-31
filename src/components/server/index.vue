<template>
  <div class="server-wrap">
    <ServerList />
    <Setting />
  </div>
</template>

<script>
import Setting from "./setting";
import ServerList from "./server-list";
export default {
  components: {
    Setting,
    ServerList,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.server-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
