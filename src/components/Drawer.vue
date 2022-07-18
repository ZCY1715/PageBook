<script>
export default {
  props: ['data', 'targetIndex', 'index'],
  computed: {
    name() {
      return this.data.name || 'Home'
    },
    title() {
      return this.data.title || '主页'
    },
    isTarget() {
      return this.targetIndex === this.index
    },
    isLeft() {
      return this.targetIndex > this.index
    },
    isRight() {
      return this.targetIndex < this.index
    }
  },

}
</script>

<template>
  <div :style="'--z: ' + (999 - index)" :class="[
    $style.container,
    isLeft ? $style.leftContainer : '',
    isRight ? $style.rightContainer : '',
    isTarget ? $style.targetContainer : ''
  ]">
    <div :class="$style.main">
      <router-view :name="name" />
    </div>
    <div :class="$style.control">
      <span :style="'--i: ' + index" @click.prevent="() => $emit('switch')" :class="[
        isTarget ? $style.targetBth : '',
        isLeft ? $style.leftBth : '',
        isRight ? $style.rightBth : ''
      ]">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<style module>
.container {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  position: fixed;
  top: 30px;
  display: flex;
  z-index: var(--z);
  transition: .5s;
  pointer-events: none;
}

.leftContainer {
  right: calc(100% - 60px);
  animation: containerRightToLeft 2s;
}

@keyframes containerRightToLeft {
  0% {
    right: 60px;
  }

  100% {
    right: calc(100% - 60px);
  }
}

.rightContainer,
.targetContainer {
  right: 60px;
  animation: containerLeftToRight 2s;
}

@keyframes containerLeftToRight {
  0% {
    right: calc(100% - 60px);
  }

  100% {
    right: 60px;
  }
}

.main {
  flex-grow: 1;
  padding: 30px 30px 30px 60px;
  margin-bottom: 5px;
  border-radius: 0 20px 20px 0;
  background-color: #fff;
  pointer-events: all;
}

.rightContainer .main {
  box-shadow: #ddd 2px 2px 5px;
  background-color: #ddd;
  animation: mainRightToLeft 2s;
}

.leftContainer .main {
  background-color: #ddd;
  animation: mainRightToLeft 2s;
}

@keyframes mainRightToLeft {
  0% {
    background-color: #fff;
  }

  100% {
    background-color: #ddd;
  }
}

.targetContainer .main {
  background-color: #fff;
  box-shadow: #fff 2px 2px 5px;
  animation: mainLeftToRight 2s;
}

@keyframes mainLeftToRight {
  0% {
    background-color: #ddd;
    box-shadow: #ddd 2px 2px 5px;
  }

  100% {
    background-color: #fff;
    box-shadow: #fff 2px 2px 5px;
  }
}


.control {
  width: 60px;
  position: relative;
  display: flex;
  align-items: center;
}

.control>span {
  position: absolute;
  top: calc(30px + var(--i) * 95px);
  z-index: 1000;
  width: 30px;
  padding: 20px 0 20px 5px;
  font-size: 18px;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  transition: 2s;
  color: #000;
  pointer-events: all;
  cursor: var(--pointer);
}

.targetBth {
  background-color: #fff;
  box-shadow: #fff 2px 2px 5px;
}

.leftBth,
.rightBth {
  background-color: #ddd;
  box-shadow: #ddd 2px 2px 5px;
}
</style>