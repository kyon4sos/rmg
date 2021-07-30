<template>
  <el-row class="tool-pane" :gutter="8">
    <el-col class="mb-8" :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
      <el-input :value="curKey" :disabled="disRefresh" size="small">
        <template slot="prepend">{{ valueType }}</template>
        <template slot="append">TTL : {{ ttl }}</template>
      </el-input>
    </el-col>
    <el-col class="mb-8" :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
      <div class="float-right">
        <el-button-group>
          <el-tooltip content="重命名KEY">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleEditKey"
              :disabled="disable"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="设置TTL">
            <el-button
              type="success"
              size="small"
              icon="el-icon-time"
              @click="handleSetTTl"
              :disabled="disable"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDelKey"
              :disabled="disable"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="保存">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-check"
              @click="handleSaveKey"
              :disabled="disableSave"
            ></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import {
  DEL_KEY,
  SET_TTL,
  SET_CURKEY,
  CREATE_KEY,
  SAVE_KEY,
  RENAME_KEY,
} from "@/store/types";
import { exists } from "@/api";
export default {
  data() {
    return {
      ttl: -1,
    };
  },
  computed: {
    ...mapState({
      redis: (state) => state.redis,
      curKey: (state) => state.redis.curKey,
      valueType: (state) => state.redis.valueType,
      disableSave: (state) => state.redis.disableSave,
    }),
    disable() {
      return this.redis == null || this.curKey == "";
    },
    disRefresh() {
      return this.redis == null;
    },
  },
  methods: {
    ...mapMutations("redis", [SET_CURKEY]),
    ...mapActions("redis", [
      DEL_KEY,
      SET_TTL,
      CREATE_KEY,
      SAVE_KEY,
      RENAME_KEY,
    ]),
    handleEditKey() {
      this.$prompt("请输入key", "提示", {
        inputType: "text",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.RENAME_KEY(value);
        })
        .catch(() => {});
    },
    handleDelKey() {
      this.DEL_KEY();
    },
    handleInputKey(val) {
      this.SET_CURKEY(val);
    },

    handleSetTTl() {
      this.$prompt("请输入TTL", "提示", {
        inputType: "text",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\+?[1-9][0-9]*$/,
        inputErrorMessage: "不是有效数字",
      })
        .then(({ value }) => {
          this.SET_TTL(value);
        })
        .catch(() => {});
    },
    async handleSaveKey() {
      const res = true;
      this.DEL_LEY(this.curKey);
      this.CREATE_KEY();

      // if (res) {
      //   this.$confirm("key已经存在, 是否覆盖?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   })
      //     .then(() => {})
      //     .catch(() => {
      //       this.$message({
      //         type: "info",
      //         message: "操作取消",
      //       });
      //     });
      // }
    },
  },
};
</script>

<style lang="scss">
.tool-pane {
}
</style>
