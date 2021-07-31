<template>
  <div class="default-layout">
    <el-container>
      <el-aside width="44px">
        <server></server>
      </el-aside>
      <el-container direction="vertical">
        <AppHeader />
        <el-main v-loading="loading">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Server from "@/components/server";
import AppHeader from "@/components/app-header/AppHeader.vue";
import { mapState } from "vuex";
export default {
  components: {
    Server,
    AppHeader,
  },
  computed: {
    ...mapState({
      loading: (state) => state.redis.loading,
    }),
  },
  methods: {},
};
</script>

<style lang="scss">
.default-layout {
  overflow-x: hidden;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-main {
    min-width: 600px;
    background-color: var(--mainColor);
  }
  .el-aside {
    height: 100vh;
    background-color: var(--primaryColor);
    padding: 16px 0;
    align-items: center;
  }
}
</style>
