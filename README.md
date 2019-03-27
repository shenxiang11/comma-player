# comma-player

## install

```bash
npm install comma-player
// or
yarn add comma-player
```

## options

```js
/**
 * default options 
 */
{
  errMsg: 'Your browser does not support the video tag.',
  width: 320,
  height: 240,
  autoplay: false,
  loop: false,
  progress: true,
}
```

* errMsg - 不支持h5时显示的文案
* width - 播放器长
* height - 播放器宽
* autoplay - 自动播放
* loop - 循环播放
* progress - 是否显示进度条

## demo

```vue
<template>
  <div id="app">
    <comma-player
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
    </comma-player>
    <div>
      <input v-model="videoAddress" placeholder="视频地址" />
    </div>
  </div>
</template>

<script>
import 'comma-player/dist/v-player.css';
import CommaPlayer from 'comma-player';

const poster = 'https://www.baidu.com/link?url=bK12qrpwAkEPX3f00_AuMQloZ4tT5ohHGsO5x4y8rytJcXnq-9CozX4qf-qb_PJa1i6DzHXCHGnlSDrFBKKas96J7V5BczrzxX7_3nSGQ-s-1M-GOvvQ9rY7keEZ52d4ihA_bSQ6pmaMYdYc5fqTo2tY4niELWVVf33s_bx7rJgQegNO4gGI1O4OH0yntWfso26IH4mrksE6Z8-87zRvvDZBE7TAz7TMwXpWAtYoSFdlWGG_8MuyM2f8vBzE4IpbLrwYQSBT6Y8sqiA8yOJ3Z6M_ErtK3P_wVrwv-yNWMLKrwzCx0KQGaWfiC4DZbbRRLL3Xp7UDRAc-LjdJboZSvQKdJMPXAWOY-5uXSrj-SHcb8n6x9TxFrxVLdMrAT-Jca3sRnv9U-ILkpy-m41fQXX08SNhXhKLXlEDQkPSeqXOfzuRmBrzbQON0Y2qqJnl6Yita5kR_6iOhN8QcZ44WPxSd668Lyc8X4-y2CNv2gHzkJyNFAsU3SVnt3fmyR7cExWI2js2Vhtzq_leT6stx_nAzE3HrnprXdcH78k8kSHwzklhpUAEtbjr0mzTePZHswEwiHiZvd-hXjBUOtkrPLm2N7tgcxODuNZ6LBoS41HsWARIiBintRgWu8Npg7iXp6k1ubUoWDm410ZAQJQnucq&timg=https%3A%2F%2Fss0.bdstatic.com%2F94oJfD_bAAcT8t7mm9GUKT-xh_%2Ftimg%3Fimage%26quality%3D100%26size%3Db4000_4000%26sec%3D1553675495%26di%3D76a32f8b5ea481fa9bdc3793cf260941%26src%3Dhttp%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F26118777cb366f758d7c75218cc9d6b11e1ebf64.jpg&click_t=1553675498305&s_info=1280_721&wd=&eqid=d4b9ecc500026023000000045c9b34e7';

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
    CommaPlayer
  }
}
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
```