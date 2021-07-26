<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  // background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background-color: #2196f3;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px rgb(0 0 0 / 30%);
  background-color: #7296f8;
}
::-webkit-scrollbar-track {
  // background-color: #e0e0e0;
}
</style>
