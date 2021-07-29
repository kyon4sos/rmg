<template>
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
                @click="handleValEdit(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip placement="top" content="保存">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-delete"
                @click="handleValDelete(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip placement="top" content="删除">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleValDelete(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </n-table>
    </el-col>
  </el-row>
</template>

<script>
import NTable from "@/components/table";
import { mapActions, mapMutations, mapState } from "vuex";
import { SET_EDITOR_VALUE } from "@/store/types";
export default {
  components: { NTable },
  computed: {
    ...mapState({
      valueType: (state) => state.redis.valueType,
      tableData: (state) => state.redis.tableData,
    }),
    columns() {
      if (this.valueType == "hash") {
        return [
          { type: "index", label: "row" },
          { width: "200", label: "field", prop: "field" },
          {
            width: "200",
            label: "value",
            prop: "value",
          },
        ];
      }
      return [
        { type: "index", label: "row" },
        {
          width: "200",
          label: "value",
          prop: "value",
        },
      ];
    },
  },
  methods: {
    ...mapMutations("redis", [SET_EDITOR_VALUE]),
    handleValDelete(idx, row) {},
    handleValEdit(idx, row) {
      this.SET_EDITOR_VALUE(row);
    },
  },
};
</script>

<style></style>
