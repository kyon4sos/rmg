import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import redis from "./redis";
import app from "./app";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  modules: { redis, app },
  strict: false,
  plugins: debug ? [createLogger()] : [],
});

export default store;
