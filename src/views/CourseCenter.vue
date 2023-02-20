<template>
  <el-container>
    <el-header v-show="isLogin" style="height:150px">
      <!-- 头像 -->
      <div class="avatar">
        <el-avatar :size="130" :src="circleUrl"/>
      </div>
      <div class="introduction">
        <div class="nickName">
          <h1 v-if="message=(time<9?'早上好': time<12?'上午好':time<15?'中午好':time<19?'下午好':'晚上好')">{{nickname}},{{message}}</h1>
        </div>
      </div>
    </el-header>
    <el-main style="height: auto;margin-top: 2%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="免费课程" name="myClass">
          <FreeClass/>
        </el-tab-pane>
        <el-tab-pane label="付费课程" name="favourites">
          <PaymentClass/>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import FreeClass from './PriceClassify/FreeClass'
import PaymentClass from './PriceClassify/PaymentClass'
export default {
  name: 'courseCenter',
  components: { PaymentClass, FreeClass },
  data () {
    return {
      isLogin: false,
      circleUrl: '',
      nickname: '',
      message: '',
      time: new Date().getHours(),
      currentPage: 1,
      pageSize: 8,
      currentPage4: 1,
      tableData: [],
      activeName: 'myClass'
    }
  },
  mounted () {
    const tokenStr = window.sessionStorage.getItem('Authorization')
    if (!tokenStr) {
      this.$message({
        message: '未登录！',
        type: 'warning',
        center: true,
        duration: 700
      })
    } else {
      this.isLogin = true
      this.circleUrl = window.sessionStorage.getItem('avatarurl')
      this.nickname = window.sessionStorage.getItem('nickname')
    }
  }
}
</script>
<style scoped>
.el-main {
  /* 盒子阴影 */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

.el-header {
  /* 盒子阴影 */
  margin-top: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

.avatar {
  float: left;
  margin-top:10px;
}

.introduction {
  height: 130px;
  float: left;
}

.nickName {
  margin-top: 40px;
  margin-left: 40px;
  font-size: 30px;
  height: 80%;
}
</style>
