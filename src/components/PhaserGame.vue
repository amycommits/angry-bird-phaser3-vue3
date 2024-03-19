<template>
  <button v-if="!hasGameStarted" @click="clickStart">Start</button>
  <canvas v-if="hasGameStarted" id="gameCanvas" />
</template>
<script>
import { EventBus } from '../utils/EventBus';
import startGame from '../utils/gameScene'

export default {
  data() {
    return {
      hasGameStarted: false
    }
  },
  methods: {
  clickStart() {
    startGame('gameCanvas');
    this.hasGameStarted = true
  }
}


}

// const game = ref();

// onMounted(() => {

    

// });                                                                                               

// onUnmounted(() => {

//     if (game.value)
//     {
//         game.value.destroy(true);
//         game.value = null;
//     }
    
// });

// defineExpose({ game });

</script>