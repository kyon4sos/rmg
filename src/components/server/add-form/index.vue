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
import { mapMutations, mapState } from "vuex";
import { getUniqueId } from "@/utils";
import newRedis from "@/redis";
import { SET_SERVERS, EDIT_SERVERS } from "@/store/types";
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
    };
  },
  computed: {
    ...mapState({
      servers: (state) => state.servers,
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
    ...mapMutations({
      setServer: SET_SERVERS,
      editeServer: EDIT_SERVERS,
    }),
    handleAdd() {
      this.modelAddVisible = true;
      console.log("add", this.editId);
    },
    handleSubmit() {
      this.modelAddVisible = false;
      this.disconnect();
      if (!this.editId) {
        this.form.id = getUniqueId();
        this.setServer(JSON.parse(JSON.stringify(this.form)));
        return false;
      }
      this.editeServer(this.form);
      this.$emit("update:editId", null);
    },
    handleCancel() {
      this.modelAddVisible = false;
      if (this.editId) {
        this.$emit("update:editId", null);
      }
      console.log("update:editId", this.editId);
      this.disconnect();
    },
    disconnect() {
      this.redis && this.redis.disconnect();
    },
    async handleTest() {
      this.loading = true;
      try {
        this.redis = newRedis({
          host: this.form.host,
          port: this.form.port,
          password: this.form.password,
        });
        // this.redis.on("error", () => {
        //   this.redis.quit();
        // });
        // this.redis.on("connect", () => {
        //   Notification.success({
        //     title: "成功",
        //     message: "链接成功",
        //   });
        // });
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
  beforeDestroy() {
    this.disconnect();
  },
};
</script>

<style></style>
