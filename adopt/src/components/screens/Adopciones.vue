<script>
import { VueFlux, FluxPagination, Transitions } from 'vue-flux';

export default {
   components: {
      VueFlux,
      FluxPagination
   },

   data: () => ({
      fluxOptions: {
         autoplay: true
      },
      fluxImages: [ 'https://picsum.photos/1024/980/?image=10', 'https://picsum.photos/1024/480/?image=12', 'https://picsum.photos/1024/480/?image=22' ],
      fluxTransitions: {
         transitionSwipe: Transitions.transitionSwipe,
      }
   })
   
}
</script>

<template >
   <div>
      <vue-flux
   :options="fluxOptions"
   :images="fluxImages"
   :transitions="fluxTransitions"
   ref="slider" style="height:300px">
      <flux-pagination ></flux-pagination>
</vue-flux>
<button @click="$refs.slider.show('next')">NEXT</button></div>

</template>
<style scoped>
</style>