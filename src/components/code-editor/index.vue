<template>
  <el-row class="codemirror">
    <el-col :span="24">
      <codemirror
        ref="myCm"
        :value="editorVal.value"
        :options="cmOptions"
        @ready="handleCmReady"
        @focus="handleCmFocus"
        @input="handleCmCodeChange"
        @blur="handleCmBlur"
      ></codemirror>
    </el-col>
  </el-row>
</template>

<script>
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
// import DiffMatchPatch from "diff-match-patch";
import { mapActions, mapMutations, mapState } from "vuex";
// window.diff_match_patch = DiffMatchPatch;
// window.DIFF_DELETE = -1;
// window.DIFF_INSERT = 1;
// window.DIFF_EQUAL = 0;
import {
  SET_VALUE,
  SET_EDITOR_VALUE,
  UPDATE_VALUE,
  GET_VALUE,
} from "@/store/types";
export default {
  components: { codemirror },
  data() {
    return {
      tmp: null,
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
  watch: {
    curKey() {
      this.tmp = null;
    },
  },
  mounted() {},
  computed: {
    ...mapState({
      redis: (state) => state.redis.redis,
      valueType: (state) => state.redis.valueType,
      editorVal: (state) => state.redis.editorVal,
      curKey: (state) => state.redis.curKey,
    }),
    codemirror() {
      return this.$refs.myCm.codemirror;
    },
  },
  methods: {
    ...mapMutations("redis", [SET_VALUE, SET_EDITOR_VALUE]),
    ...mapActions("redis", [UPDATE_VALUE, GET_VALUE]),
    handleCmReady(cm) {},
    handleCmFocus(cm) {
      if (!this.tmp) {
        this.tmp = { ...this.editorVal };
      }
    },
    handleCmCodeChange(value) {
      this.SET_EDITOR_VALUE({ value });
    },
    handleCmBlur(val) {
      if (!this.redis) {
        return;
      }
      console.log("handleCmBlur", this.tmp, this.editorVal);
      console.log(
        "handleCmBlur",
        JSON.stringify(this.tmp) == JSON.stringify(this.editorVal)
      );
      if (!this.curKey) {
        return;
      }
      const f = JSON.stringify(this.tmp) == JSON.stringify(this.editorVal);
      if (f || !this.tmp) {
        return;
      }
      this.$confirm("内容已经修改，是否保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.UPDATE_VALUE();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
          this.SET_EDITOR_VALUE(this.tmp);
        })
        .finally(() => {
          console.log("finall");
          this.tmp = null;
        });
    },
  },
};
</script>

<style lang="scss">
.vue-codemirror {
  height: 100vh;
  .CodeMirror {
    height: 100%;
    font-family: auto;
  }
}
</style>
