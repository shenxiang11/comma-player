<template>
  <div class="__VPlayer__">
    <video
      :src="opt.src"
      :width="opt.width"
      :height="opt.height"
      :poster="opt.poster"
      :autoplay="opt.autoplay"
      :loop="opt.loop"
      @timeupdate="$handleTimeupdate"
      ref="video">
        {{opt.errMsg}}
    </video>
    <div class="control">
      <div class="slots">
        <slot></slot>
      </div>
      <div class="optional-controls">
        <div
          class="progress"
          v-if="opt.progress">
          <div
            class="inner"
            :style="progressStyle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultOptions = {
  errMsg: 'Your browser does not support the video tag.',
  width: 320,
  height: 240,
  autoplay: false,
  loop: false,
  progress: true,
};

const STATUS = {
  INITIAL: 'INITIAL', // 初始化
  LOADING: 'LOADING', // 加载中
  LOADED: 'LOADED', // 加载完成
  PAUSED: 'PAUSED', // 暂停
  PLAYING: 'PLAYING', // 播放中
  ENDED: 'ENDED', // 已结束
  ERROR: 'ERROR', // 出现错误
};

export default {
  name: 'VPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return defaultOptions;
      },
    },
  },
  data() {
    return {
      currentTime: 0,
      totalTime: null,
      status: STATUS.INITIAL,
    };
  },
  computed: {
    opt() {
      return { ...defaultOptions, ...this.options };
    },
    progressStyle() {
      if (this.totalTime) {
        return {
          width: `${this.currentTime / this.totalTime * 100}%`,
        };
      }
      return {
        width: 0,
      };
    },
  },
  watch: {
    status(currentStatus) {
      this.$emit('statusChange', currentStatus);
    },
  },
  methods: {
    play() {
      if (this.status === STATUS.PAUSED
          || this.status === STATUS.LOADED
          || this.status === STATUS.ENDED) {
        this.$refs.video.play();
      }
    },
    pause() {
      if (this.status === STATUS.PLAYING) {
        this.$refs.video.pause();
      }
    },
    $handleError(errMsg) {
      this.$emit('error', new Error(errMsg));
      this.status = STATUS.ERROR;
    },
    $handleLoadStart() {
      this.status = STATUS.LOADING;
    },
    $handleLoadedData() {
      this.status = STATUS.LOADED;
      this.totalTime = this.$refs.video.duration;
    },
    $handlePlay() {
      this.status = STATUS.PLAYING;
    },
    $handleEnd() {
      this.status = STATUS.ENDED;
    },
    $handlePause() {
      this.status = STATUS.PAUSED;
    },
    $handleTimeupdate() {
      this.currentTime = this.$refs.video.currentTime;
    },
  },
  mounted() {
    this.$refs.video.addEventListener('loadstart', this.$handleLoadStart);
    this.$refs.video.addEventListener('loadeddata', this.$handleLoadedData);
    this.$refs.video.addEventListener('canplay', this.$handleCanPlay);
    this.$refs.video.addEventListener('play', this.$handlePlay);
    this.$refs.video.addEventListener('pause', this.$handlePause);
    this.$refs.video.addEventListener('ended', this.$handleEnd);
    this.$refs.video.addEventListener('emptied', this.$handleError.bind(null, '当媒介资源元素突然为空时（网络错误、加载错误等）运行脚本'));
    this.$refs.video.addEventListener('error', this.$handleError.bind(null, '当在元素加载期间发生错误时运行脚本'));
  },
  destroyed() {
    this.$refs.video.removeEventListener('loadstart', this.$handleLoadStart);
    this.$refs.video.removeEventListener('loadeddata', this.$handleLoadedData);
    this.$refs.video.removeEventListener('canplay', this.$handleCanPlay);
    this.$refs.video.removeEventListener('play', this.$handlePlay);
    this.$refs.video.removeEventListener('pause', this.$handlePause);
    this.$refs.video.removeEventListener('ended', this.$handleEnd);
    this.$refs.video.removeEventListener('emptied', this.$handleError);
    this.$refs.video.removeEventListener('error', this.$handleError);
  },
};
</script>

<style lang="scss">
.__VPlayer__ {
  position: relative;
  display: inline-flex;
  .control {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: all 0.3s;
  }
  &:hover .control {
    opacity: 1;
  }
  .optional-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    .progress {
      width: 100%;
      height: 100%;
      height: 3px;
      background-color: rgba(0, 0, 0, 0.7);
      .inner {
        background-color: #fff;
        height: 100%;
      }
    }
  }
}
</style>
