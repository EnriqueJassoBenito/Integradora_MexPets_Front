<template>
    <div>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" v-for="variant in variants"
            :variant="variant" :key="variant">
        </b-spinner>
    </div>
</template>


<script>
  export default {
    name: 'Spinner',

    data() {
      return {
        variants: ['warning']
      }
    }
  }
</script>