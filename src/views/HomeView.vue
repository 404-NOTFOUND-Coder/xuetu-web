<template>
  <div>
    <Carousels/>
    <Module/>
  </div>
</template>

<script>
import Carousels from '../components/base-carousels'
import Module from '../components/base-module'

export default {
  name: 'homeView',
  components: {
    Carousels,
    Module
  }
}
</script>

<style scoped>

</style>
