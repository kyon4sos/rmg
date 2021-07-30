<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { GET_CONFIG } from "@/store/types";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      store: null,
    };
  },
  methods: {
    ...mapActions("app", [GET_CONFIG]),
  },
  created() {
    this.GET_CONFIG();
  },
};
</script>
<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
}
</style>
