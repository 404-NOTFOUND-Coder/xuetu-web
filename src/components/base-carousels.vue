<template>
  <el-carousel :interval="2000" type="card" height="400px" width="1000px">
    <!--轮播图的键 不能是item   必须是index  或者item.index-->
    <el-carousel-item v-for="(item,index) in carouseData" :key="index" height="30px">
      <img :src="item.url" alt="" @click="goTo(index)">
    </el-carousel-item>
  </el-carousel>
</template>
<script>

export default {
  name: 'carouselsItem',
  data () {
    return {
      carouseData: [
        { url: require('../assets/img/img15.webp') },
        { url: require('../assets/img/img9.webp') },
        { url: require('../assets/img/img13.webp') },
        { url: require('../assets/img/img3.webp') },
        { url: require('../assets/img/img5.webp') },
        { url: require('../assets/img/img7.webp') }
      ]
    }
  },
  methods: {
    goTo (index) {
      window.sessionStorage.setItem('c_id', index)
      this.$router.push({ path: '/beginStudy' })
    }
  }
}
</script>
<style>

.el-carousel__item {
  width: 200%;
}
.el-menu-item img{
  width: 100px;
  height: auto;
}
.el-carousel__item img {
  width: 100%;
  height: auto;
}
</style>
