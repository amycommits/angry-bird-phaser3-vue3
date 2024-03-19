<template>
  <div>
    <component :is="currentComponent" />
    <button @click="changeScene">Change Scene</button>
  </div>
</template>
<script>
  import EndGame from './EndGame.vue'
  import GamePlay from './GamePlay.vue'
  import StartScreen from './StartScreen.vue'
  
  export default {
    name: 'GameWrapper',
    data() {
      return {
        activeComponent: StartScreen,
        activeIndex: 0,
        availableScenes: [StartScreen, GamePlay, EndGame]
      }
    },
    components: {
      EndGame,
      GamePlay,
      StartScreen,
    },
    computed: {
      currentComponent() {
        return this.activeComponent
      }
    },
    methods: {
      changeScene() {
        const nextIndex = this.activeIndex + 1
        this.activeIndex =  nextIndex === this.availableScenes.length ? 0 : nextIndex
        this.activeComponent = this.availableScenes[this.activeIndex]
      }
    }
  }
</script>