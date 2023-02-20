<template>
    <el-container>
      <el-header style="height: 66px">
        <!-- 头部 -->
        <HeaderBar/>
      </el-header>
      <el-main>
        <!-- 中间主体 -->
        <AppMain/>
      </el-main>
      <el-footer width="100%" style="height:140px">
        <!-- 底部 -->
        <Footers></Footers>
      </el-footer>
      <!-- 回到顶部-->
      <el-backtop></el-backtop>
    </el-container>
</template>

<script>

import AppMain from '../components/app-main'
import Footers from '../components/base-footer'
import HeaderBar from '../components/base-header'

export default {
  name: 'homePage',
  components: {
    HeaderBar,
    Footers,
    AppMain
  }
}
</script>
<style scoped>
.el-footer {
  text-align: center;
  line-height: 16px;
  background-color: #545c64;
}

.el-main {
  text-align: center;
  line-height: 30px;
  background-color: #a7eaf814;
}

.el-header{
  /* 盒子阴影 */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}
</style>
