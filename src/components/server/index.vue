<template>
  <div class="server-wrap">
    <n-icon @click="handleSelectServer" icon="el-icon-menu"></n-icon>
    <!-- <ul class="active-server" v-if="activeServer.id">
      <li>{{ activeServer.name }}</li>
      <li>{{ activeServer.host }}</li>
      <li>{{ activeServer.port }}</li>
    </ul> -->
    <n-icon icon="el-icon-switch-button"></n-icon>
    <n-drawer
      :visible.sync="drawer"
      direction="ltr"
      title="选择服务器"
      custom-class="server-drawer"
      :size="280"
    >
      <div class="drawer-body">
        <div class="server-list">
          <div class="server-item hover-bg" :key="s.id" v-for="s in servers">
            <div class="server-name">
              <i class="el-icon-monitor"></i>
              <el-tooltip
                class="item"
                effect="dark"
                :content="s.host + ':' + s.port"
                placement="top-start"
              >
                <span> {{ s.name }}</span>
              </el-tooltip>
            </div>
            <div class="ops">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top-start"
              >
                <i class="el-icon-edit-outline" @click="handleEdit(s.id)"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top-start"
              >
                <i class="el-icon-delete" @click="handleDel(s.id)"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="链接"
                placement="top-start"
              >
                <el-switch
                  v-model="s.conn"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="handleSwitchChange(s.id)"
                >
                </el-switch>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="drawer-footer">
          <AddForm :editId.sync="editId" />
        </div>
      </div>
    </n-drawer>
  </div>
</template>

<script>
import AddForm from "./add-form";
import { mapMutations, mapState } from "vuex";
import { SET_ACTIVE_SERVERS, DEL_SERVERS } from "@/store/types";
export default {
  components: {
    AddForm,
  },
  data() {
    return {
      visible: false,
      drawer: false,
      form: { id: "", name: "测试", host: "127.0.0.1", port: 6379, db: [] },
      redis: null,
      editId: null,
    };
  },
  computed: {
    ...mapState({
      servers: (state) => state.servers,
      activeServer: (state) => state.activeServer,
    }),
  },
  methods: {
    ...mapMutations({
      setActiveSer: SET_ACTIVE_SERVERS,
      delServer: DEL_SERVERS,
    }),
    handleSelectServer() {
      this.drawer = true;
    },
    handleSwitchChange(id) {
      this.setActiveSer(id);
      this.drawer = false;
    },
    handleEdit(id) {
      console.log("id", id);
      this.editId = id;
    },
    handleDel(id) {
      this.delServer(id);
    },
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
  .active-server {
    text-align: center;
    color: #fff;
    font-size: 12px;
    > li {
      margin-bottom: 4px;
    }
  }
  .drawer-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    .server-list {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      height: 80%;
      .server-item {
        padding: 8px 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .server-name {
          display: inline-block;
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          i {
            margin-right: 16px;
          }
        }
        .ops {
          display: flex;
          align-items: center;
          > i {
            margin: 8px;
          }
        }
      }
    }
    .drawer-footer {
      padding: 0 20px;
    }
  }
}
</style>
