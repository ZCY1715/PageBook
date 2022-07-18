<script>
import useStore from "../../store"
import ArrowDown from '../../assets/svgs/ArrowDown.svg?vueComponent'

export default {
  data() {
    return {
      store: useStore(),
    }
  },
  components: { ArrowDown },
  methods: {
    scrollDown() {
      this.$el.parentNode.scrollTo({ top: window.innerHeight })
    }
  }
}

</script>

<template>
  <div :class="$style.container">
    <Image :src="store.config.bannerImg" :class="$style.bannerImg" @click="() => store.themeColor.switchThemeColor()" />
    <div :class="$style.arrowDown" @click="scrollDown">
      <span>
        <ArrowDown />
      </span>
    </div>
    <div :class="$style.banner_wave_1"></div>
    <div :class="$style.banner_wave_2"></div>
  </div>
</template>

<style module>
.container {
  width: 100vw;
  height: 100vh;
}

.bannerImg {
  width: 100%;
  height: 100%;
  position: relative;
}

.arrowDown {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 70px;
  top: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  cursor: var(--pointer);
}

@keyframes arrowDown_animation {
  0% {
    top: 0;
    opacity: 0.5;
  }

  5% {
    top: 0;
    opacity: 0.5;
  }

  45% {
    top: 20px;
    opacity: 1;
  }

  55% {
    top: 20px;
    opacity: 1;
  }

  95% {
    top: 0;
    opacity: 0.5;
  }

  100% {
    top: 0;
    opacity: 0.5;
  }
}

.arrowDown span {
  position: absolute;
  opacity: 0.5;
  animation: arrowDown_animation 2s ease-in-out infinite;
  width: 25px;
  height: 25px;
  cursor: var(--pointer);
}

@-webkit-keyframes wave1

/*Safari and Chrome*/
  {
  0% {
    left: -1500px;
    bottom: -5px
  }

  50% {
    left: 0px;
    bottom: 0px
  }

  100% {
    left: -1500px;
    bottom: -5px
  }
}

@-webkit-keyframes wave2 {
  0% {
    left: -1450px
  }

  50% {
    left: 0px
  }

  100% {
    left: -1450px
  }

}

@keyframes wave1

/*Safari and Chrome*/
  {
  0% {
    left: -1500px;
    bottom: -5px
  }

  50% {
    left: 0px;
    bottom: 0px
  }

  100% {
    left: -1500px;
    bottom: -5px
  }
}

@keyframes wave2 {
  0% {
    left: -1450px
  }

  50% {
    left: 0px
  }

  100% {
    left: -1450px
  }

}

.banner_wave_1 {
  width: auto;
  height: 65px;
  background: url("../../assets/wave1.png") repeat-x;
  filter: brightness(var(--wave-brightness));
  _filter: alpha(opacity=80);
  position: absolute;
  bottom: 0;
  width: 400%;
  left: -236px;
  opacity: 1;
  animation: wave1 90s infinite;
  -webkit-animation: wave1 90s infinite;
}

.banner_wave_2 {
  width: auto;
  height: 80px;
  background: url("../../assets/wave2.png") repeat-x;
  _filter: alpha(opacity=80);
  position: absolute;
  bottom: 0;
  width: 400%;
  left: 0;
  opacity: 1;
  animation: wave2 90s infinite;
  -webkit-animation: wave2 90s infinite;
}

@media(max-width:860px) {

  .banner_wave_1,
  .banner_wave_2 {
    display: inline-block;

  }

  @-webkit-keyframes wave1

  /*Safari and Chrome*/
    {
    0% {
      left: -750px;
      bottom: -2px
    }

    50% {
      left: 0px;
      bottom: 0px
    }

    100% {
      left: -750px;
      bottom: -2px
    }
  }

  @-webkit-keyframes wave2 {
    0% {
      left: -750px
    }

    50% {
      left: 0px
    }

    100% {
      left: -750px
    }

  }

  @keyframes wave1

  /*Safari and Chrome*/
    {
    0% {
      left: -750px;
      bottom: -2px
    }

    50% {
      left: 0px;
      bottom: 0px
    }

    100% {
      left: -750px;
      bottom: -2px
    }
  }

  @keyframes wave2 {
    0% {
      left: -750px
    }

    50% {
      left: 0px
    }

    100% {
      left: -750px
    }

  }

  .banner_wave_1 {
    width: auto;
    height: 65px;
    background: url("../../assets/wave1.png") repeat-x;
    _filter: alpha(opacity=80);
    position: absolute;
    bottom: 0;
    width: 400%;
    left: 750px;
    z-index: 5;
    opacity: 1;
    animation: wave1 90s infinite;
    -webkit-animation: wave1 60s infinite;
  }

  .banner_wave_2 {
    width: auto;
    height: 80px;
    background: url("../../assets/wave2.png") repeat-x;
    _filter: alpha(opacity=80);
    position: absolute;
    bottom: 0;
    width: 400%;
    left: 0;
    z-index: 4;
    opacity: 1;
    animation: wave2 90s infinite;
    -webkit-animation: wave2 60s infinite;
  }
}
</style>