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
import { SET_VALUE, SET_EDITOR_VALUE, SAVE_KEY } from "@/store/types";
export default {
  components: { codemirror },
  data() {
    return {
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
  watch: {},
  computed: {
    ...mapState({
      valueType: (state) => state.redis.valueType,
      editorVal: (state) => state.redis.editorVal,
      value: (state) => state.redis.value,
    }),
    codemirror() {
      return this.$refs.myCm.codemirror;
    },
  },
  methods: {
    ...mapMutations("redis", [SET_VALUE, SET_EDITOR_VALUE]),
    ...mapActions("redis", [SAVE_KEY]),
    handleCmReady(cm) {},
    handleCmFocus(cm) {},
    handleCmCodeChange(value) {
      this.SET_EDITOR_VALUE({ ...this.editorVal, value });
    },
    handleCmBlur(val) {
      this.$confirm("内容已经修改，是否保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$emit("save", this.value);
          this.SAVE_KEY();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.vue-codemirror {
  height: 100%;
  .CodeMirror {
    height: 100%;
    font-family: auto;
  }
}
</style>
