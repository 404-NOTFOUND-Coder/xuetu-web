<template>
  <el-container>
    <el-header v-show="isLogin" style="height:150px">
      <!-- 头像 -->
      <div class="avatar">
        <el-avatar :size="130" :src="circleUrl"/>
      </div>
      <div class="introduction">
        <div class="nickName">
          <h1 v-if="message=(time<9?'早上好': time<12?'上午好':time<15?'中午好':time<19?'下午好':'晚上好')">
            {{ nickname }},{{ message }}</h1>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-menu
        router
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal">
        <el-menu-item @click="goBack"><i class="el-icon-back"></i><span>返回</span></el-menu-item>
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
      <div class="container">
        <router-view/>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'coursePage',
  data () {
    return {
      isLogin: false,
      circleUrl: '',
      nickname: '',
      message: '',
      time: new Date().getHours(),
      navList: [
        {
          name: '教学课堂',
          path: '/StudyClassroom',
          icon: 'el-icon-reading'
        },
        {
          name: '教学资源',
          path: '/studyResource',
          icon: 'el-icon-coin'
        },
        {
          name: '作业管理',
          path: '/HomeworkManage',
          icon: 'el-icon-receiving'
        },
        {
          name: '通知公告',
          path: '/NoticeBar',
          icon: 'el-icon-chat-round'
        },
        {
          name: '排行榜',
          path: '/RankBoard',
          icon: 'el-icon-trophy'
        }
      ]
    }
  },
  mounted () {
    const tokenStr = window.sessionStorage.getItem('Authorization')
    if (!tokenStr) {
      this.$message({
        message: '未登录！',
        type: 'warning',
        center: true,
        duration: 800
      })
    } else {
      this.isLogin = true
      this.circleUrl = window.sessionStorage.getItem('avatarurl')
      this.nickname = window.sessionStorage.getItem('nickname')
    }
  },
  methods: {
    goBack () {
      const token = window.sessionStorage.getItem('Authorization')
      if (token && window.sessionStorage.getItem('type') === '2') {
        // 查询学生-课程表
        const queryList = {
          tableName: 'student_course',
          id: [],
          tableKey: 'p_id'
        }
        queryList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND stu_class_id =' + '\'' + window.sessionStorage.getItem('c_id') + '\'')
        this.$http('post', '/api/QueryData', queryList).then((response) => {
          const id = response[0][0].id
          this.$http('post', '/api/getTime', {
            uuid: window.sessionStorage.getItem('uuid'),
            type: 'endDate',
            id: id
          })
        })
      }
      window.sessionStorage.removeItem('c_id')
      window.sessionStorage.removeItem('isJoin')
      window.sessionStorage.removeItem('isFavorite')
      this.$router.push({ path: '/CourseCenter' })
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
  margin-top: 10px;
}

.introduction {
  height: 130px;
  float: left;
}

.nickName {
  margin-top: 40px;
  margin-left: 40px;
  font: 50px Extra large;
  height: 80%;
}

.container {
  margin-top: 25px;
}

</style>
