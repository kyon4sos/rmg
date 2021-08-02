<template>
  <div class="key-container">
    <ul
      class="key-list"
      v-infinite-scroll="load"
      ref="cc"
      infinite-scroll-delay="300"
      infinite-scroll-distance="200"
    >
      <li
        class="key-item hover-bg"
        v-for="k in keys"
        :key="k"
        @click="handleSelect(k)"
      >
        {{ k }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { GET_VALUE } from "@/store/types";
export default {
  computed: {
    ...mapState({
      keys: (state) => state.redis.keys,
    }),
  },
  methods: {
    ...mapActions("redis", [GET_VALUE]),
    handleSelect(key) {
      this.GET_VALUE(key);
    },
    load() {},
  },
};
</script>

<style lang="scss">
.key-container {
  width: 240px;
  height: 100%;
  border-right: 1px solid var(--borderColor);
  overflow: auto;
  .key-item {
    padding: 4px 8px;
  }
  position: absolute;
}
</style>
