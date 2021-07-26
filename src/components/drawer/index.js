import DrawerComp from "./drawer.vue";

DrawerComp.install = (Vue) => {
  Vue.component(DrawerComp.name, DrawerComp);
};

export default DrawerComp;
