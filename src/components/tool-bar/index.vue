<template>
  <el-row class="tool-bar mb-8" :gutter="4">
    <el-col :span="5">
      <el-autocomplete
        :disabled="disRefresh"
        v-model="searchKey"
        size="small"
        placeholder="请输入key"
        clearable
        :trigger-on-focus="false"
        prefix-icon="el-icon-search"
        @select="handleSelectSugg"
        :fetch-suggestions="handleQuery"
      ></el-autocomplete>
    </el-col>
    <el-col :span="3">
      <el-select
        :value="activeDb"
        :disabled="disRefresh"
        placeholder="请选择数据库"
        size="small"
        @change="handleChangeDb"
      >
        <el-option
          v-for="(db, idx) in 16"
          :key="idx"
          :label="`db${idx}`"
          :value="idx"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="16">
      <div class="float-right">
        <el-button-group>
          <el-button
            icon="el-icon-loading"
            type="success"
            size="small"
            :disabled="disRefresh"
            @click="handleRefresh"
          ></el-button>
          <el-button
            icon="el-icon-copy-document"
            type="info"
            size="small"
            :disabled="disable"
            @click="handleCopy"
          ></el-button>
          <el-dropdown @command="handleCommand">
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="small"
              :disabled="disRefresh"
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="c"
                v-for="(c, idx) in dropdowns"
                :key="idx"
                >{{ c.toUpperCase() }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-button-group>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import {
  GET_ALL_KEYS,
  SET_VALUETYPE,
  SET_DISABLE,
  SET_INIT,
  SET_CURKEY,
  GET_VALUE,
  SELECT_DB,
} from "@/store/types";
import { keys } from "@/api";
export default {
  data() {
    return {
      searchKey: "",
      dropdowns: ["string", "hash", "list", "zset", "set"],
    };
  },
  computed: {
    ...mapState({
      redis: (state) => state.redis.redis,
      value: (state) => state.redis.value,
      activeDb: (state) => state.redis.activeDb,
    }),
    disable() {
      return this.redis == null || this.curKey == "";
    },
    disRefresh() {
      return this.redis == null;
    },
  },
  methods: {
    ...mapActions("redis", [GET_ALL_KEYS, GET_VALUE, SELECT_DB]),
    ...mapMutations("redis", [
      SET_VALUETYPE,
      SET_DISABLE,
      SET_INIT,
      SET_CURKEY,
    ]),
    handleChangeDb(val) {
      this.SELECT_DB(val);
    },
    async handleQuery(query, cb) {
      if (query) {
        let res = await keys(`*${query}*`);
        res = res.map((k) => ({
          value: k,
        }));
        cb(res);
      }
    },
    async handleSelectSugg(k) {
      this.SET_CURKEY(k.value);
      this.GET_VALUE(k.value);
    },
    handleCommand(command) {
      this.SET_VALUETYPE(command);
      this.SET_DISABLE(false);
      this.SET_INIT();
    },
    handleRefresh() {
      this.GET_ALL_KEYS();
    },
    async handleCopy() {
      try {
        const type = typeof this.value;
        let res = null;
        switch (type) {
          case "string":
            res = this.value;
            break;
          default:
            res = JSON.stringify(this.value);
            break;
        }

        await this.$copyText(res);
        this.$message({
          message: "复制成功",
          type: "success",
        });
      } catch (e) {
        e;
        this.$message({
          message: e,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.tool-bar {
}
</style>
