<template>
  <div class="outer">
    <div class="left">
      <ul>
        <li>
          <i @click="goBack" class="el-icon-back"/>
        </li>
        <li>
          <i class="el-icon-star-off" :class="{red1}" @click="favorite"/>
        </li>
        <li>
          <i class="iconfont icon-aixin" :class="{red2}" @click="liked"/>
        </li>
      </ul>
    </div>
    <div class="center">
      <img ref="url" :src="p_url" width="100%" height="300px"/>
      <div class="content">
        <div class="pers">
          <div class="pic">
            <el-avatar :src="avatarurl"/>
          </div>
          <div class="name">
            <a style="text-decoration: none;">{{ name }}</a>
            <span style="display: block">{{ createTime }}</span>
          </div>
        </div>
        <div class="contents">
          <div class="detail">
            {{ content }}
          </div>
          <div style="width: 100%;height: auto">
            <comment @doSend="doSend($event)" :avatar="userAvatarurl" :commentList="commentList" :commentNum="commentNum"></comment>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- 右边用户描述-->
      <div class="decribe">
        <div class="pers">
          <el-avatar style="margin-top: 5px;" :src="avatarurl"/>
          <a style="text-decoration: none;margin-top: 10px;margin-left: 6px">{{ name }}</a>
        </div>
        <div class="intro">
          <h1 style="font-weight: 800">个人简介</h1>
          <span>{{ introduce }}</span>
          <h1 style="font-weight: 800">加入时间</h1>
          <span>{{ joinTime }}</span>
        </div>
      </div>
      <div>
      </div>
      <!-- 推荐-->
      <div class="put">
        <div class="show">
          <h1>话题讨论度</h1>
          <i class="iconfont icon-huo" style="color: #ef0909"></i>
        </div>
        <div class="progress">
          <label>创业、设计:</label>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="100" status="exception"></el-progress>
          <label>IT、互联网:</label>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="95" status="success"></el-progress>
          <label>职业、考证:</label>
          <el-progress :text-inside="true" :stroke-width="22" :percentage="90" status="warning"></el-progress>
          <label>电商、营销:</label>
          <el-progress :text-inside="true" :stroke-width="20" :percentage="85"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from 'bright-comment'
import Tools from '../../utils/Tools'
import DateTools from '../../utils/Datetools'

export default {
  name: 'detailItem',
  components: {
    comment
  },
  inject: [
    'reload'
  ],
  data () {
    return {
      red1: false,
      red2: false,
      p_url: '',
      content: '',
      name: '',
      createTime: '',
      joinTime: '',
      introduce: '',
      like: '',
      watch: '',
      commentList: [],
      commentNum: 0,
      avatarurl: '',
      userAvatarurl: ''
    }
  },
  mounted () {
    this.userAvatarurl = window.sessionStorage.getItem('avatarurl')
    // 获取帖子详情
    const queryList = {
      tableName: 'guest',
      id: [],
      tableKey: 'G_id'
    }
    queryList.id.push('\'' + window.sessionStorage.getItem('g_id') + '\'')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      this.content = response[0][0].G_context
      this.createTime = response[0][0].createtime
      this.name = window.sessionStorage.getItem('postname')
      this.like = response[0][0].liked
      this.watch = response[0][0].watch
      this.comment = response[0][0].comment
      this.avatarurl = response[0][0].avatarurl
      this.p_url = response[0][0].p_url
    })
    // 获取评论详情
    const commentList = {
      tableName: 'reply',
      id: [],
      tableKey: 'G_id'
    }
    commentList.id.push('\'' + window.sessionStorage.getItem('g_id') + '\'')
    this.$http('post', '/api/QueryData', commentList).then((response) => {
      this.commentNum = response[0].length
      for (let i = 0; i < response[0].length; i++) {
        this.commentList.push({
          id: i,
          content: response[0][i].R_context,
          createDate: response[0][i].createtime
        })
        this.commentList[i].commentUser = ({
          id: response[0][i].p_id,
          nickName: response[0][i].nickname,
          avatar: response[0][i].avatar
        })
      }
      return this.commentList
    })
    // 获取发帖人详情
    const userList = {
      tableName: 'user',
      id: [],
      tableKey: 'id'
    }
    userList.id.push('\'' + window.sessionStorage.getItem('p_id') + '\'')
    this.$http('post', '/api/QueryData', userList).then((response) => {
      this.joinTime = response[0][0].createTime
      this.introduce = response[0][0].introduction
    })
  },
  beforeCreate () {
    // 获取用户对当前帖子是否点赞和收藏
    const optionList = {
      tableName: 'guest_option',
      id: [],
      tableKey: 'p_id'
    }
    optionList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND g_id =' + '\'' + window.sessionStorage.getItem('g_id') + '\'')
    this.$http('post', '/api/QueryData', optionList).then((response) => {
      if (response[0][0] === undefined) {
        this.red1 = this.red2 = false
      } else if (response[0][0].o_favorite === '1' && response[0][1] === undefined) {
        this.red1 = true
      } else if (response[0][0].o_liked === '1' && response[0][1] === undefined) {
        this.red2 = true
      } else {
        this.red1 = this.red2 = true
      }
    })
  },
  methods: {
    // 收藏
    favorite () {
      const tokenStr = window.sessionStorage.getItem('Authorization')
      if (!tokenStr) {
        this.$message({
          message: '请先登录！',
          type: 'error',
          center: true,
          duration: 800
        })
      } else {
        if (this.red1) {
          const favoriteList = {
            tableName: 'guest_option',
            id: '\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND g_id = ' + '\'' + window.sessionStorage.getItem('g_id') + '\'' + 'AND o_favorite =' + '\'' + '1' + '\'',
            tableKey: 'p_id'
          }
          this.$http('post', '/api/DeleteData', favoriteList).then((response) => {
            if (response === 200) {
              this.$message({
                message: '取消收藏',
                type: 'warning',
                center: true,
                duration: 800
              })
              this.red1 = false
            } else {
              this.$message({
                message: '服务器错误！',
                type: 'error',
                center: true,
                duration: 800
              })
            }
          })
        } else {
          // 添加用户收藏帖子信息
          const list = {
            header: [{
              tableName: 'guest_option',
              id: Tools.getUUID(),
              tableKey: 'id'
            }],
            content: [{
              id: Tools.getUUID(),
              p_id: window.sessionStorage.getItem('uuid'),
              g_id: window.sessionStorage.getItem('g_id'),
              o_liked: '0',
              o_favorite: '1'
            }]
          }
          this.$http('post', '/api/UpdateData', list).then((response) => {
            if (response === 200) {
              this.$message({
                message: '已收藏',
                type: 'success',
                center: true,
                duration: 800
              })
              this.red1 = !this.red1
            } else {
              this.$message({
                message: '服务器错误！',
                type: 'error',
                center: true,
                duration: 800
              })
            }
          })
        }
      }
    },
    // 点赞
    liked () {
      const tokenStr = window.sessionStorage.getItem('Authorization')
      if (!tokenStr) {
        this.$message({
          message: '请先登录！',
          type: 'error',
          center: true,
          duration: 800
        })
      } else {
        if (this.red2) {
          const likeList = {
            tableName: 'guest_option',
            id: '\'' + window.sessionStorage.getItem('p_id') + '\'' + 'AND g_id = ' + '\'' + window.sessionStorage.getItem('g_id') + '\'' + 'AND o_liked =' + '\'' + '1' + '\'',
            tableKey: 'p_id'
          }
          this.$http('post', '/api/DeleteData', likeList).then((response) => {
            if (response === 200) {
              // 获取帖子点赞数
              const optionList = {
                tableName: 'guest',
                id: [],
                tableKey: 'G_id'
              }
              optionList.id.push('\'' + window.sessionStorage.getItem('g_id') + '\'')
              this.$http('post', '/api/QueryData', optionList).then((response) => {
                const likedNum = response[0][0].liked
                const likedList = {
                  header: [{
                    tableName: 'guest',
                    id: window.sessionStorage.getItem('g_id'),
                    tableKey: 'G_id'
                  }],
                  content: [{
                    G_id: window.sessionStorage.getItem('g_id'),
                    liked: (parseInt(likedNum) - 1).toString()
                  }]
                }
                this.$http('post', '/api/UpdateData', likedList).then((response) => {
                  if (response === 200) {
                    this.$message({
                      message: '取消点赞',
                      type: 'warning',
                      center: true,
                      duration: 800
                    })
                    this.red2 = false
                  } else {
                    this.$message({
                      message: '服务器错误！',
                      type: 'error',
                      center: true,
                      duration: 800
                    })
                  }
                })
              })
            } else {
              this.$message({
                message: '服务器错误！',
                type: 'error',
                center: true,
                duration: 800
              })
            }
          })
        } else {
          // 添加用户点赞帖子信息
          const list = {
            header: [{
              tableName: 'guest_option',
              id: Tools.getUUID(),
              tableKey: 'id'
            }],
            content: [{
              id: Tools.getUUID(),
              p_id: window.sessionStorage.getItem('uuid'),
              g_id: window.sessionStorage.getItem('g_id'),
              o_liked: '1',
              o_favorite: '0'
            }]
          }
          this.$http('post', '/api/UpdateData', list).then((response) => {
            if (response === 200) {
              // 修改帖子点赞数量
              const likedList = {
                header: [{
                  tableName: 'guest',
                  id: window.sessionStorage.getItem('g_id'),
                  tableKey: 'G_id'
                }],
                content: [{
                  G_id: window.sessionStorage.getItem('g_id'),
                  liked: (parseInt(this.like) + 1).toString()
                }]
              }
              this.$http('post', '/api/UpdateData', likedList).then((response) => {
                if (response === 200) {
                  this.$message({
                    showClose: true,
                    message: '已点赞!',
                    type: 'success',
                    center: true,
                    duration: 600
                  })
                  this.red2 = true
                } else if (response === 500) {
                  this.$message({
                    showClose: true,
                    message: '服务器错误!',
                    type: 'error',
                    center: true,
                    duration: 600
                  })
                } else {
                  this.$message({
                    showClose: true,
                    message: '点赞失败!',
                    type: 'warning',
                    center: true,
                    duration: 600
                  })
                }
              })
            } else {
              this.$message({
                showClose: true,
                message: '服务器错误!',
                type: 'error',
                center: true,
                duration: 600
              })
            }
          })
        }
      }
    },
    // 返回
    goBack () {
      window.sessionStorage.removeItem('g_id')
      window.sessionStorage.removeItem('postname')
      window.sessionStorage.removeItem('p_id')
      this.$router.back()
    },
    // 评论
    doSend (content) {
      const tokenStr = window.sessionStorage.getItem('Authorization')
      if (!tokenStr) {
        this.$message({
          message: '请先登录！',
          type: 'error',
          center: true,
          duration: 800
        })
      } else {
        const toList = {
          header: [{
            tableName: 'reply',
            id: Tools.getUUID(),
            tableKey: 'R_id'
          }],
          content: [{
            R_id: Tools.getUUID(),
            G_id: window.sessionStorage.getItem('g_id'),
            p_id: window.sessionStorage.getItem('uuid'),
            nickname: window.sessionStorage.getItem('nickname'),
            createtime: DateTools.getNowFormatDate(),
            R_context: content,
            avatar: window.sessionStorage.getItem('avatarurl')
          }]
        }
        this.$http('post', '/api/UpdateData', toList).then((response) => {
          if (response === 200) {
            const queryList = {
              tableName: 'guest',
              id: [],
              tableKey: 'G_id'
            }
            queryList.id.push('\'' + window.sessionStorage.getItem('g_id') + '\'')
            this.$http('post', '/api/QueryData', queryList).then((response) => {
              const commentNum = response[0][0].comment
              const commentList = {
                header: [{
                  tableName: 'guest',
                  id: window.sessionStorage.getItem('g_id'),
                  tableKey: 'G_id'
                }],
                content: [{
                  G_id: window.sessionStorage.getItem('g_id'),
                  comment: (parseInt(commentNum) + 1).toString()
                }]
              }
              this.$http('post', '/api/UpdateData', commentList).then(() => {
                this.$message({
                  showClose: true,
                  message: '评论成功',
                  type: 'success',
                  center: true,
                  duration: 600
                })
                this.reload()
              })
            })
          } else if (response === 500) {
            this.$message({
              showClose: true,
              message: '服务器错误!',
              type: 'error',
              center: true,
              duration: 600
            })
          } else {
            this.$message({
              showClose: true,
              message: '发布失败',
              type: 'warning',
              center: true,
              duration: 600
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
/* 外层 */
.outer {
  display: flex;
}

/* 左边 */
.left {
  width: 10%;
  height: 200px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}
.progress{
  width: 88%;
  margin-top: 19px;
  margin-left: 10px;
}
.progress label{
  display: flex;
  margin-left: 20px;
}
.progress .el-progress{
  height: 100%;
  margin-left: 30px;
}
.red1 {
  color: red;
}

.red2 {
  color: red;
}

.left li {
  margin-top: 15px;
}

i {
  font-size: 30px;
}

i:hover {
  cursor: pointer;
}
.detail{
  width: 100%;
  height: auto;
  word-break: break-all;
  width: 515px;
  /* word-wrap: break-word; */
  margin-top: 39px;
  margin-left: 104px;
  text-align: left;
}

.el-page-header__title {
  font-size: 21px;
  font-weight: 500;
}

.el-page-header__left::after {
  display: none;
}

/* 右边 */
.el-page-header {
  justify-content: center;
  font-size: 20px;
}

.right {
  width: 28%;
  height: 100%;
  margin-left: 15px;
}

.decribe, .put {
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}

.put {
  margin-top: 6px;
  height: 320px;
}

.intro {
  text-align: left;
  margin-left: 20px
}

.pers {
  height: 50px;
  display: flex;
  margin-left: 20px;
}

.pic {
  height: 20px
}

.name {
  height: 30px
}

/* 中间 */
/deep/ .reply-fa[data-v-133ed8df] {
  margin-top: 5px;
  display: none;
}

.center {
  width: 60%;
  height: 100%;
  margin-left: 15px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}

img {
  border-radius: 20px;
}

li:nth-child(1) {
  margin-top: 30px;
}

.content h1 {
  font-size: 50px;
}

.show {
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
}

.show h1 {
  font-weight: bolder;
  font-size: 20px;
  margin-left: 30px;
  margin-top: 10px;
}
.show i{
  margin-top: 10px;
  margin-right: 24px;
}
</style>
