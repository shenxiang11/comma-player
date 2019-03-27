import VPlayer from './components/VPlayer.vue';

// eslint-disable-next-line func-names
VPlayer.install = function (Vue) {
  Vue.component(VPlayer.name, VPlayer);
};

export default VPlayer;
