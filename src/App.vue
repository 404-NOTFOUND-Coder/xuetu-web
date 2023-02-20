<template>
  <div id="app" style="width: 100%">
    <router-view v-if="isShow"/>
  </div>
</template>
<script>
const zoom = () => {
  const domBody = document.getElementsByTagName('div')[0]
  domBody.style.zoom = document.body.clientWidth / 19.2 + '%'
}
zoom()
// 窗口大小变化时，需要重算
window.addEventListener('resize', zoom, false)

export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    reload () {
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    }
  }
}
</script>
<style scoped>
*{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
