import LocalStore from "electron-store";
import { initRedis } from "@/api";
import { CONFIG_SERVERS } from "@/constant";
import Vue from "vue";
import {
  SET_SERVERS,
  SET_SERVERS_CONFIG,
  SET_ACTIVE_SERVER,
  DEL_SERVERS,
  GET_CONFIG,
  SET_CONFIG,
  DEL_CONFIG,
  INIT,
} from "../types";
const localStore = new LocalStore();
const state = () => ({
  activeServer: {
    id: "",
    name: "",
    host: "",
    port: 0,
  },
  servers: [],
});
const getters = {};
const mutations = {
  [SET_SERVERS](state, payload) {
    state.servers.push(payload);
  },
  [SET_SERVERS_CONFIG](state, payload) {
    state.servers = [...payload];
  },
  [SET_ACTIVE_SERVER](state, id) {
    state.servers.forEach((s) => {
      if (s.id == id) {
        Vue.set(s, "conn", !s.conn);
        state.activeServer = s;
      } else {
        Vue.set(s, "conn", false);
      }
    });
  },
  [DEL_SERVERS](state, id) {
    const idx = state.servers.findIndex((s) => s.id == id);
    id != -1 && state.servers.splice(idx);
  },
};
const actions = {
  async [INIT]({ commit }, id) {
    const servers = localStore.get(CONFIG_SERVERS);
    const s = servers.find((s) => s.id == id);
    commit(SET_ACTIVE_SERVER, id);
    commit("redis/SET_REDIS", s, { root: true });
  },
  async [GET_CONFIG]({ commit }) {
    const servers = localStore.get(CONFIG_SERVERS);

    commit(SET_SERVERS_CONFIG, servers);
  },
  async [SET_CONFIG]({ dispatch, state }, payload) {
    const servers = [...state.servers];

    servers.forEach((s) => (s.conn = false));
    const idx = servers.findIndex((s) => s.id == payload.id);
    if (idx >= 0) {
      servers.splice(idx, 1, payload);
    } else {
      servers.push(payload);
    }
    localStore.set(CONFIG_SERVERS, servers);
    dispatch(GET_CONFIG);
  },
  async [DEL_CONFIG]({ dispatch, state }, id) {
    const servers = [...state.servers];
    const idx = servers.findIndex((s) => s.id == id);
    if (idx != -1) {
      servers.splice(idx, 1);
      localStore.set(CONFIG_SERVERS, servers);
      dispatch(GET_CONFIG);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
