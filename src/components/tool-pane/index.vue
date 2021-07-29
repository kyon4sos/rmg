<template>
  <el-row :gutter="12">
    <el-col :span="16">
      <el-input v-model="curKey" :disabled="disRefresh">
        <template slot="prepend">{{ valueType }}</template>
        <template slot="append">TTL : {{ ttl }}</template>
      </el-input>
    </el-col>
    <el-col :span="8">
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
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { DEL_KEY } from "@/store/types";
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
    ...mapActions("redis", [DEL_KEY]),
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
        
          this.setTTL(value);
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

<style></style>
