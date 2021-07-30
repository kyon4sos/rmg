<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
      >添加服务器</el-button
    >
    <n-model
      :visible.sync="modelAddVisible"
      :title="title"
      :append-to-body="true"
      @close="handleCancel"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="alias">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="host">
          <el-input v-model="form.host"></el-input>
        </el-form-item>
        <el-form-item label="port">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="test">
          <el-button type="primary" @click="handleTest" :loading="loading"
            >test</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </n-model>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import { mapActions, mapMutations, mapState } from "vuex";
import { getUniqueId } from "@/utils";
import { initRedis } from "@/api";
import { SET_SERVERS, EDIT_SERVERS, SET_CONFIG } from "@/store/types";
export default {
  props: {
    editId: {
      type: String,
    },
  },

  data() {
    return {
      modelAddVisible: false,
      form: { id: "", name: "测试", host: "127.0.0.1", port: 6379, db: [] },
      redis: null,
      loading: false,
      store: null,
    };
  },
  computed: {
    ...mapState({
      servers: (state) => state.app.servers,
    }),
    title() {
      return this.editId ? "编辑" : "新增";
    },
  },
  watch: {
    editId(newVal) {
      if (newVal) {
        const s = this.servers.find((s) => s.id == this.editId);
        this.form = { ...s };
        this.modelAddVisible = true;
      }
    },
  },
  methods: {
    ...mapActions("app", [SET_CONFIG]),
    handleAdd() {
      this.modelAddVisible = true;
    },
    handleSubmit() {
      this.modelAddVisible = false;
      this.disconnect();
      this.form.id;
      if (!this.form.id) {
        this.form.id = getUniqueId();
      }
      this.SET_CONFIG(JSON.parse(JSON.stringify(this.form)));
      this.form.id = null;
    },
    handleCancel() {
      this.modelAddVisible = false;
      if (this.editId) {
        this.$emit("update:editId", null);
      }
      this.disconnect();
    },
    disconnect() {
      this.redis && this.redis.disconnect();
    },
    saveStorage() {},
    async handleTest() {
      this.loading = true;
      try {
        this.redis = initRedis({
          host: this.form.host,
          port: this.form.port,
          password: this.form.password,
        });
        await this.redis.connect();
      } catch (e) {
        Notification.error({
          title: "错误",
          message: "无法链接,检测网络或者配置",
        });
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 600);
      }
    },
  },
  created() {},
  beforeDestroy() {
    this.disconnect();
  },
};
</script>

<style></style>
