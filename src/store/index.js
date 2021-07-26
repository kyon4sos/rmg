import Vue from "vue";
import Vuex from "vuex";
import {
  SET_SERVERS,
  SET_ACTIVE_SERVERS,
  DEL_SERVERS,
  EDIT_SERVERS,
} from "./types";
import newRedis from "@/redis";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    activeServer: {
      id: "",
      name: "",
      host: "",
      port: 0,
      db: [],
    },
    redis: null,
    servers: [],
  },
  mutations: {
    [SET_SERVERS](state, payload) {
      state.servers.push(payload);
    },
    [SET_ACTIVE_SERVERS](state, id) {
      state.servers.filter((s) => s.id != id).forEach((s) => (s.conn = false));
      state.activeServer = state.servers.find((s) => s.id == id);
      state.redis = newRedis(state.activeServer);
    },
    [EDIT_SERVERS](state, payload) {
      let idx = state.servers.findIndex((s) => s.id == payload.id);
      if (idx != -1) {
        state.servers.splice(idx, 1, payload);
      }
    },
    [DEL_SERVERS](state, id) {
      console.log(id);
      const idx = state.servers.findIndex((s) => s.id == id);
      id != -1 && state.servers.splice(idx);
    },
  },
  actions: {},
  modules: {},
});
