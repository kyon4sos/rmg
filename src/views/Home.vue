<template>
  <div class="home">
    <div class="tool-bar">
      <el-autocomplete
        :disabled="disable"
        v-model="searchKey"
        size="small"
        placeholder="请输入key"
        clearable
        :trigger-on-focus="false"
        prefix-icon="el-icon-search"
        @select="handleSelectSugg"
        :fetch-suggestions="querySearch"
      ></el-autocomplete>
      <!-- <el-switch
        v-model="darkMode"
        active-text="暗黑模式"
        active-color="#333"
        inactive-color="#ddd"
      >
      </el-switch> -->
      <el-button-group>
        <el-button
          :key="idx"
          :type="b.type"
          :icon="b.icon"
          v-for="(b, idx) in btnGroup"
          @click="b.handler"
          :disabled="disable"
        ></el-button>
      </el-button-group>
    </div>
    <div class="data-warp" v-loading="loading">
      <div class="key-container">
        <ul
          class="key-list"
          v-infinite-scroll="load"
          ref="cc"
          infinite-scroll-delay="300"
          infinite-scroll-distance="200"
        >
          <li
            class="key-item hover-bg"
            v-for="k in keys"
            :key="k"
            @click="handleSelect(k)"
          >
            {{ k }}
          </li>
        </ul>
      </div>
      <div class="value-container" :class="darkMode ? 'dark-mode' : ''">
        <!-- <pre id="code" v-html="html" v-show="editing"></pre> -->
        <el-row :gutter="12">
          <el-col :span="12">
            <el-input v-model="curKey" :disabled="disable">
              <template slot="prepend">{{ valueType }}</template>
              <template slot="append">TTL : {{ ttl }}</template>
              >
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleDelKey"
                :disabled="disable"
              ></el-button>
              <el-button
                type="success"
                icon="el-icon-time"
                @click="handleDelKey"
                :disabled="disable"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleDelKey"
                :disabled="disable"
              ></el-button>
            </el-button-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <n-table
              :data="tableData"
              :columns="columns"
              v-if="valueType != 'string'"
            >
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip placement="top" content="编辑">
                    <el-button
                      size="mini"
                      icon="el-icon-edit"
                      @click="handleValueEdit(scope.$index, scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip placement="top" content="删除">
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="handleValueDelete(scope.$index, scope.row)"
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </n-table>
          </el-col>
        </el-row>
        <el-row class="codemirror">
          <el-col :span="24">
            <codemirror
              ref="myCm"
              :value="value"
              :options="cmOptions"
              @ready="handleCmReady"
              @focus="handleCmFocus"
              @input="handleCmCodeChange"
              @blur="handleCmBlur"
            ></codemirror>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import NTable from "@/components/table";
import { mapState } from "vuex";
import { codemirror } from "vue-codemirror";
// base style
import "codemirror/lib/codemirror.css";
// theme css
import "codemirror/theme/dracula.css";
// language
import "codemirror/mode/javascript/javascript.js";
// active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";

// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import DiffMatchPatch from "diff-match-patch";
// DiffMatchPatch config with global
window.diff_match_patch = DiffMatchPatch;
window.DIFF_DELETE = -1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 0;
// const handle =
export default {
  name: "Home",
  components: { codemirror, NTable },
  data() {
    return {
      btnGroup: [
        {
          icon: "el-icon-loading",
          handler: this.handleRefresh,
          type: "primary",
        },
        {
          icon: "el-icon-copy-document",
          handler: this.handleCopy,
          type: "primary",
        },
        {
          icon: "el-icon-plus",
          handler: this.handleAdd,
          type: "primary",
        },
        {
          icon: "el-icon-delete",
          handler: this.handleDel,
          type: "danger",
        },
      ],
      tableData: [],
      columns: [
        { type: "index", label: "row" },
        {
          width: "200",
          label: "value",
          prop: "value",
        },
      ],
      dbIdx: 0,
      searchKey: "",
      idx: 34,
      loading: false,
      darkMode: true,
      keys: [],
      curKey: "",
      value: "",
      ttl: -1,
      valueType: "",
      cmOptions: {
        tabSize: 4,
        mode: "javascript",
        json: true,
        theme: "dracula",
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        styleActiveLine: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        hintOptions: {
          completeSingle: false,
        },
      },
    };
  },

  computed: {
    ...mapState({
      redis: (state) => state.redis,
    }),
    disable() {
      return this.redis == null;
    },
    codemirror() {
      return this.$refs.myCm.codemirror;
    },
    // valueType() {
    //   return this.tableData instanceof Array;
    // },
  },
  watch: {
    redis() {
      if (this.redis != null) {
        this.redis.select(this.dbIdx);
        this.getAllKeys();
        // this.redis.keys("*").then((res) => (this.keys = [...res]));
      }
    },
    // idx(newVal) {
    //   console.log(newVal);
    //   this.keys = Object.keys(this.db).slice(0, newVal);
    // },
  },
  mounted() {
    this.init();
    console.log("this is current codemirror object", this.codemirror);
  },
  methods: {
    handleCmReady(cm) {
      console.log("the editor is readied!");
    },
    handleCmFocus(cm) {
      console.log("the editor is focus!");
    },
    handleCmCodeChange(newCode) {
      console.log("this is new code", newCode);
      this.code = newCode;
    },
    handleCmBlur() {
      this.$confirm("内容已经修改，是否保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    load() {
      this.idx += 20;
      console.log(this.idx);
      // this.keys = Object.keys(this.db).slice(0, this.idx);
      // return this.keys.slice(this.idx, 20);
    },
    async querySearch(query, cb) {
      if (query) {
        let res = await this.redis.keys(`*${query}*`);
        res = res.map((k) => ({
          value: k,
        }));
        cb(res);
      }
    },
    async handleSelectSugg(k) {
      this.curKey = k.value;
      this.getValue(k.value);
    },
    handleChangeTtl() {},
    handleDelKey() {},
    handleValueEdit(idx, row) {
      console.log(row.key, row.value);
      if (Object.prototype.hasOwnProperty.call(row, "key")) {
        this.value = JSON.stringify({
          [row.key]: row.value,
        });
        return;
      }
      this.value = JSON.stringify(row.value);
      console.log(this.value);
    },
    handleValueDelete(idx, row) {
      console.log(idx, row);
    },
    async handleCopy() {
      try {
        await this.$copyText(this.value);
        this.$message({
          message: "复制成功",
          type: "success",
        });
      } catch (e) {
        console.log(e);
        this.$message({
          message: e,
          type: "error",
        });
      }
    },
    handleRefresh() {
      this.getAllKeys();
    },
    handleAdd() {},
    handleDel() {
      this.delKey(this.curKey);
    },
    handleSelect(key) {
      this.value = "";
      this.getValue(key);
    },
    async saveKey() {
      // const res = await this.redis.set(key);
      // console.log(res);
    },
    async delKey(key) {
      const res = await this.redis.del(key);
      console.log(res);
    },
    async getAllKeys() {
      if (this.redis == null) {
        return;
      }
      this.loading = true;
      const res = await this.redis.keys("*");
      console.log(res);
      this.keys = [...res];
      this.loading = false;
    },
    async getValue(key) {
      this.loading = true;
      const type = await this.redis.type(key);
      this.valueType = type;
      this.setColumns(type);
      console.log(type);
      let res = null;
      switch (type) {
        case "none":
          this.$message({
            message: "key不存在",
            type: "warn",
          });
          break;
        case "string":
          res = await this.redis.get(key);
          this.value = res;
          break;
        case "hash":
          res = await this.redis.hgetall(key);
          console.log(res);
          break;
        case "list":
          res = await this.redis.lrange(key, 0, -1);
          break;
        case "set":
          res = await this.redis.smembers(key);
          break;
        case "zset":
          res = await this.redis.zrange(key, 0, -1);
          break;
        default:
          break;
      }
      this.tableData = this.toArray(res);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      return res;
    },
    setColumns(type) {
      if (type == "hash") {
        this.columns = [
          { type: "index", label: "row" },
          { width: "200", label: "key", prop: "key" },
          {
            width: "200",
            label: "value",
            prop: "value",
          },
        ];
        return;
      }
      this.columns = [
        { type: "index", label: "row" },
        {
          width: "200",
          label: "value",
          prop: "value",
        },
      ];
    },
    toArray(res) {
      if (res instanceof Array)
        return res.map((r, index) => ({
          index,
          value: r.value || r,
        }));
      if (res instanceof Object) {
        return Object.keys(res).map((r) => ({
          key: r,
          value: res[r],
        }));
      }
      return res;
    },
    init() {},
  },
};
</script>
<style lang="scss">
.home {
  .tool-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  height: calc(100vh - 76px);
  .data-warp {
    height: calc(100vh - 76px - 40px);
    display: flex;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    overflow: hidden;
  }
  .key-container {
    width: 300px;
    height: 100%;
    border-right: 1px solid #c7c7c7;
    .key-item {
      padding: 4px 8px;
    }
  }
  .value-container {
    padding: 8px;
    flex: 1 1 400px;
    overflow: auto;
    .vue-codemirror {
      height: 100%;
      .CodeMirror {
        height: 100%;
      }
    }
    .el-row {
      margin-bottom: 16px;
    }
    .codemirror {
      height: 100%;
      .el-col {
        height: 100%;
      }
    }
  }
}
</style>
