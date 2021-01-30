<template>
  <div class="home">
    <div v-for="n in 9" :key="n">{{ n }} </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {

  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 320px));
  grid-template-rows: repeat(auto-fill, minmax(140px, 180px));
  gap: 20px;
  overflow-y: scroll;
}
.home div {
  background-color: aqua;
  border: 1px solid red;
  height: 180px;
}
</style>
