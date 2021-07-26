import ModelComp from './model.vue'

ModelComp.install = (Vue) => {
	Vue.component(ModelComp.name, ModelComp)
}

export default ModelComp
