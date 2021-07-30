import { Message } from "element-ui";

import {
  SET_TTL,
  DEL_KEY,
  UPDATE_VALUE,
  CREATE_KEY,
  GET_ALL_KEYS,
  GET_VALUE,
  SET_VALUETYPE,
  SET_REDIS,
  SET_TABLE,
  SET_KEYS,
  SET_VALUE,
  SET_CURKEY,
  SET_EDITOR_VALUE,
  KEY_EXIST,
  SET_CLEAR,
  SET_DISABLE,
  SELECT_DB,
  SET_ACTIVE_DB,
  GET_KEY,
  INIT_REDIS,
  RENAME_KEY,
} from "../types";
import {
  getAllKeys,
  getValue,
  toArray,
  update,
  delKey,
  keyExists,
  keys,
  selectDb,
  expire,
  initRedis,
  create,
  renameKey,
} from "@/api";

const state = () => ({
  connected: false,
  redis: null,
  activeDb: 0,
  searchKey: "",
  curKey: "",
  valueType: "",
  value: { index: 0, value: "" },
  editorVal: { value: "hello world", field: "", index: 0 },
  keys: [],
  loading: false,
  disableSave: true,
  tableData: [],
});
const getters = {
  activeSer: (state, getters, rootState) => {
    return rootState.app.activeServer;
  },
};
const mutations = {
  [SET_REDIS](state, config) {
    const redis = initRedis(config);
    state.redis = Object.assign({}, redis);
  },
  [SET_ACTIVE_DB](state, db) {
    state.activeDb = db;
  },
  [SET_KEYS](state, keys) {
    state.keys = [...keys];
  },
  [SET_CURKEY](state, curKey) {
    state.curKey = curKey;
  },
  [SET_VALUE](state, value) {
    state.value = value;
  },
  [SET_EDITOR_VALUE](state, { field = "", value = "" }) {
    state.editorVal = { ...state.editorVal, field, value };
  },
  [SET_VALUETYPE](state, value) {
    state.valueType = value;
  },
  [SET_TABLE](state, data) {
    state.tableData = [...data];
  },
  [SET_DISABLE](state, data) {
    state.disableSave = data;
  },
  [SET_CLEAR](state) {
    state.curKey = "";
    state.value = "";
    state.editorVal = { value: "" };
  },
};
const actions = {
  async [CREATE_KEY]({ dispatch, state }) {
    const { curKey, valueType, editorVal } = state;
    const res = await create(curKey, valueType, editorVal);
    dispatch("Message", res);
    dispatch(GET_KEY, curKey);
  },
  async [GET_VALUE]({ commit }, key) {
    const { type, value } = await getValue(key);
    commit(SET_VALUE, value);
    commit(SET_VALUETYPE, type);
    commit(SET_CURKEY, key);
    commit(SET_TABLE, toArray(value));
    switch (type) {
      case "string":
        commit(SET_EDITOR_VALUE, { value: value });
        break;
      default:
        commit(SET_EDITOR_VALUE, { value: "" });
        break;
    }
  },
  async [GET_ALL_KEYS]({ state, commit }) {
    if (state.redis == null) {
      return;
    }
    const res = await getAllKeys("*");
    commit(SET_KEYS, res);
  },
  async [RENAME_KEY]({ state, dispatch }, newKey) {
    try {
      const res = await renameKey(state.curKey, newKey);
      dispatch("message", res);
    } catch (error) {
      console.log(error);
    }
  },
  async [UPDATE_VALUE]({ state, dispatch }) {
    state.loading = true;
    const { curKey, valueType, editorVal } = state;
    const res = await update(curKey, valueType, editorVal);
    dispatch("message", res);
    state.loading = false;
  },
  async [SET_TTL]({ state, dispatch }, time) {
    const res = await expire(state.curKey, time);
    dispatch("message", res);
  },
  async [KEY_EXIST]({ dispatch }, key) {
    const res = await keyExists(key);
    dispatch("message", res);
  },
  async [DEL_KEY]({ dispatch, commit, state }) {
    this.loading = true;
    const res = await delKey(state.curKey);
    dispatch("message", res);
    commit(SET_CLEAR);
    state.loading = false;
  },
  async [GET_KEY]({ dispatch, state }) {
    this.loading = true;
    const res = await keys(state.curKey);
    dispatch("message", res);
    state.loading = false;
  },

  async [SELECT_DB]({ commit, dispatch, state }, db) {
    this.loading = true;
    const res = await selectDb(db);
    dispatch(GET_ALL_KEYS);
    commit(SET_ACTIVE_DB, db);
    dispatch("message", res);
    state.loading = false;
  },
  message({ commit }, res) {
    Message.closeAll();
    Message({
      duration: 1500,
      showClose: true,
      offset: 100,
      ...handleMap[res](),
    });
  },
};
const handleMap = {
  1: () => {
    ok();
    return { message: "ok", type: "success" };
  },
  OK: () => {
    ok();
    return { message: "ok", type: "success" };
  },
  0: () => {
    ok();
    return { message: "ok", type: "success" };
  },
  null: () => {
    error();
    return { message: "error", type: "error" };
  },
};
const ok = () => {
  console.log("ok handle");
};
const error = () => {
  console.log("error handle");
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
