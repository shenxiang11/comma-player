<template>
  <div id="app">
    <v-player
      :options="playerOptions"
      @error="handleError"
      @statusChange="handleStatusChange"
      ref="player">
      <div class="custom-content">
        <div
          v-if="shouldShowPlayBtn"
          class="btn"
          @click="play">
          <img class="btn-icon" src="./assets/play.svg" />
          <span class="btn-text">播放</span>
        </div>
        <div
          v-if="shouldShowPauseBtn"
          class="btn"
          @click="pause">
          <img class="btn-icon" src="./assets/stop.svg" />
          <span class="btn-text">暂停</span>
        </div>
        <div
          class="btn"
          @click="replace">
          <img class="btn-icon" src="./assets/replace.svg" />
          <span class="btn-text">替换</span>
        </div>
        <div
          class="btn"
          @click="remove">
          <img class="btn-icon" src="./assets/remove.svg" />
          <span class="btn-text">删除</span>
        </div>
      </div>
    </v-player>
    <div>
      <input v-model="videoAddress" placeholder="视频地址" />
    </div>
  </div>
</template>

<script>
import VPlayer from '@/components/VPlayer.vue';
import poster from '@/assets/poster.png';

export default {
  name: 'app',
  data() {
    return {
      videoAddress: 'http://www.w3school.com.cn/i/movie.ogg',
      status: null,
    };
  },
  computed: {
    shouldShowPlayBtn() {
      return ['LOADED', 'PAUSED', 'ENDED', 'ERROR'].includes(this.status);
    },
    shouldShowPauseBtn() {
      return ['PLAYING'].includes(this.status);
    },
    playerOptions() {
      return {
        poster,
        src: this.videoAddress,
      };
    },
  },
  methods: {
    play() {
      this.$refs.player.play();
    },
    pause() {
      this.$refs.player.pause();
    },
    replace() {
      alert('在下方输入视频地址即替换');
    },
    remove() {
      this.videoAddress = '';
    },
    handleStatusChange(state) {
      this.status = state;
    },
    handleError(err) {
      console.error(err);
    },
  },
  components: {
    VPlayer,
  },
};
</script>

<style lang="scss">
.custom-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    margin: 10px;
    padding: 20px;
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    .btn-icon {
      width: 30px;
      height: 30px;
    }
    .btn-text {
      margin: 10px 0;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
