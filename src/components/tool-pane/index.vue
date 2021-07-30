<template>
  <el-row class="tool-pane" :gutter="8">
    <el-col class="mb-8" :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
      <el-input v-model="curKey" :disabled="disRefresh" size="small">
        <template slot="prepend">{{ valueType }}</template>
        <template slot="append">TTL : {{ ttl }}</template>
      </el-input>
    </el-col>
    <el-col class="mb-8" :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
      <div class="float-right">
        <el-button-group>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleEditKey"
            :disabled="disable"
          ></el-button>
          <el-button
            type="success"
            size="small"
            icon="el-icon-time"
            @click="handleSetTTl"
            :disabled="disable"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDelKey"
            :disabled="disable"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-check"
            @click="handleSaveKey"
            :disabled="disableSave"
          ></el-button>
        </el-button-group>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { DEL_KEY, SET_TTL } from "@/store/types";
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
    ...mapActions("redis", [DEL_KEY, SET_TTL]),
    handleEditKey() {},
    handleDelKey() {
      this.DEL_KEY();
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
    async handleSaveKey(val) {
      const res = await this.redis.exists(this.curKey);
      if (res) {
        this.$confirm("key已经存在, 是否覆盖?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.del(this.curKey);
            this.saveKey(this.editValue);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "操作取消",
            });
          });
      }
    },
  },
};
</script>

<style lang="scss">
.tool-pane {
}
</style>
