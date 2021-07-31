<template>
  <div class="server-list">
    <n-icon @click="handleSelectServer" icon="el-icon-menu"></n-icon>
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
                  :value="s.conn"
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
import { mapActions, mapMutations, mapState } from "vuex";
import { DEL_CONFIG, SET_ACTIVE_SERVER, INIT } from "@/store/types";
import AddForm from "../add-form";
export default {
  components: { AddForm },
  data() {
    return {
      drawer: false,
      editId: null,
    };
  },
  computed: {
    ...mapState({
      servers: (state) => state.app.servers,
      activeServer: (state) => state.app.activeServer,
    }),
  },
  methods: {
    ...mapMutations("app", [SET_ACTIVE_SERVER]),
    ...mapActions("app", [DEL_CONFIG, INIT]),
    handleSelectServer() {
      this.drawer = true;
    },
    handleSwitchChange(id) {
      this.INIT(id);
    },
    handleEdit(id) {
      this.editId = id;
    },
    handleDel(id) {
      this.DEL_CONFIG(id);
    },
  },
};
</script>

<style lang="scss">
.server-list {
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
