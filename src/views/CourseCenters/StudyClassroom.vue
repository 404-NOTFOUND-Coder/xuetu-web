<template>
  <div>
    <div v-for="(u,index) in list" :key="index">
      <div  v-if="Url === u.id" >
      <video controls>
        <source :src="u.videoUrl" />
      </video>
      </div>
    </div>
    <div>
      <el-main style="padding-left: 2%;width: 24%">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          style="background-color: #f8fdfe">
          <el-menu-item :index="(index+1).toString()" v-for="(message,index) in list" :key="index">
            <i class="el-icon-video-play" @click="change($event)" :id="message.id"></i>
            <span slot="title" @click="change($event)" :id="message.id">视频{{index+1}}</span>
          </el-menu-item>
        </el-menu>
      </el-main>
      <div v-show="buttonHide">
        <el-button type="danger" style="margin-top: 33px" @click="outClass" v-show="this.tempActive === 0">退出课程</el-button>
        <el-button type="success" style="margin-top: 33px" @click="favoriteClass" v-show="this.tempActive === 0 && this.tempFavorite === 1">收藏课程</el-button>
        <el-button type="primary"  style="margin-top: 33px;width:15%" @click="inClass" v-show="this.tempActive === 1">加入课程</el-button>
      </div>
      <!-- 支付对话框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        title="课 程 订 单"
        width="50%"
        :before-close="handleClose">
        <el-descriptions :model="info" title="订单信息">
          <el-descriptions-item label="订单号" v-model="info.traceNo">{{info.traceNo}}</el-descriptions-item>
          <el-descriptions-item label="商品名称" v-model="info.subject">{{info.subject}}</el-descriptions-item>
          <el-descriptions-item label="支付价格" :contentStyle="{'color': 'red'}" v-model="info.totalAmount">{{info.totalAmount+'元'}}</el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="payOrder">支 付</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'studyClassroom',
  data () {
    return {
      Url: 'v1',
      ifMember: false,
      dialogVisible: false,
      tempActive: 1,
      tempFavorite: 0,
      buttonHide: false,
      list: [
        {
          id: 'v1',
          videoUrl: require('../../assets/video/springboot-c01-1.mp4')
        },
        {
          id: 'v2',
          videoUrl: require('../../assets/video/springboot-c01-2.mp4')
        },
        {
          id: 'v3',
          videoUrl: require('../../assets/video/springboot-c01-3.mp4')
        },
        {
          id: 'v4',
          videoUrl: require('../../assets/video/springboot-c01-4.mp4')
        },
        {
          id: 'v5',
          videoUrl: require('../../assets/video/springboot-c01-5.mp4')
        },
        {
          id: 'v6',
          videoUrl: require('../../assets/video/springboot-c01-6.mp4')
        },
        {
          id: 'v7',
          videoUrl: require('../../assets/video/springboot-c01-7.mp4')
        }
      ],
      // 订单信息
      info: {
        traceNo: '',
        subject: '',
        totalAmount: 0,
        uuid: ''
      }
    }
  },
  mounted () {
    // 权限判断
    this.buttonHide = window.sessionStorage.getItem('type') === '2'
    // 查询学生-课程表
    const queryList = {
      tableName: 'student_course',
      id: [],
      tableKey: 'p_id'
    }
    queryList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND stu_class_id =' + '\'' + window.sessionStorage.getItem('c_id') + '\'')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      if (response[0][0] === undefined) {
        window.sessionStorage.setItem('isJoin', '0')
      } else if (response[0][0].stu_class_id === window.sessionStorage.getItem('c_id')) {
        window.sessionStorage.setItem('isJoin', '1')
      } else {
        window.sessionStorage.setItem('isJoin', '0')
      }
      if (window.sessionStorage.getItem('isJoin') === '0') {
        this.tempActive = 1
      } else {
        this.tempActive = 0
      }
    })
    // 查询学生是否收藏课程
    const favoriteList = {
      tableName: 'course_option',
      id: [],
      tableKey: 'p_id'
    }
    favoriteList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND c_id =' + '\'' + window.sessionStorage.getItem('c_id') + '\'')
    this.$http('post', '/api/QueryData', favoriteList).then((response) => {
      if (response[0] === undefined) {
        window.sessionStorage.setItem('isFavorite', '0')
      } else if (response[0].c_id === window.sessionStorage.getItem('c_id') || response[0].length > 0) {
        window.sessionStorage.setItem('isFavorite', '1')
      } else {
        window.sessionStorage.setItem('isFavorite', '0')
      }
      if (window.sessionStorage.getItem('isFavorite') === '0') {
        this.tempFavorite = 1
      } else {
        this.tempFavorite = 0
      }
    })
  },
  methods: {
    // 加入课程
    inClass () {
      if (window.sessionStorage.getItem('uuid') == null) {
        this.$message({
          showClose: true,
          message: '请先登录!',
          type: 'error',
          center: true,
          duration: 600
        })
      } else {
        // 查询课程是否为付费课
        const queryList = {
          tableName: 'course',
          id: [],
          tableKey: 'c_id'
        }
        queryList.id.push('\'' + window.sessionStorage.getItem('c_id') + '\'')
        this.$http('post', '/api/QueryData', queryList).then((response) => {
          if (response[0][0].c_price === 0) {
            // 免费课程直接将数据添加进学生-课程关联表中
            const list = {
              header: [{
                tableName: 'student_course',
                id: this.Tools.getUUID(),
                tableKey: 'id'
              }],
              content: [{
                id: this.Tools.getUUID(),
                p_id: window.sessionStorage.getItem('uuid'),
                stu_class_id: window.sessionStorage.getItem('c_id'),
                username: window.sessionStorage.getItem('nickname'),
                studyTime: 0
              }]
            }
            this.$http('post', '/api/UpdateData', list).then((response) => {
              if (response === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜，您已成功加入课程!',
                  type: 'success',
                  center: true,
                  duration: 800
                })
                this.tempActive = 0
                this.tempFavorite = 1
                window.sessionStorage.removeItem('isJoin')
                window.sessionStorage.setItem('isJoin', '1')
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
                  message: '操作失败!',
                  type: 'warning',
                  center: true,
                  duration: 600
                })
              }
            })
          } else {
            this.$confirm('本课程为付费课程是否要进行购买?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 付费课程等支付宝支付成功才能添加到学生-课程表中
              this.info.traceNo = this.Tools.getOrder()
              this.info.subject = response[0][0].c_name
              this.info.totalAmount = response[0][0].c_price
              this.info.uuid = window.sessionStorage.getItem('uuid')
              this.dialogVisible = true
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消购买'
              })
            })
          }
        })
      }
    },
    // 支付订单
    payOrder () {
      axios.post('/alipay/pay', this.info, { headers: { 'content-type': 'multipart/form-data' } }).then((response) => {
        this.dialogVisible = false
        // 将数据添加进学生-课程关联表中
        const list = {
          header: [{
            tableName: 'student_course',
            id: this.Tools.getUUID(),
            tableKey: 'id'
          }],
          content: [{
            id: this.Tools.getUUID(),
            p_id: window.sessionStorage.getItem('uuid'),
            stu_class_id: window.sessionStorage.getItem('c_id'),
            username: window.sessionStorage.getItem('nickname'),
            studyTime: 0
          }]
        }
        this.$http('post', '/api/UpdateData', list).then((response) => {
          if (response === 200) {
            this.$message({
              showClose: true,
              message: '恭喜，您已成功加入课程!',
              type: 'success',
              center: true,
              duration: 800
            })
            this.tempActive = 0
            window.sessionStorage.removeItem('isJoin')
            window.sessionStorage.setItem('isJoin', '1')
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
              message: '操作失败!',
              type: 'warning',
              center: true,
              duration: 600
            })
          }
        })
        // 打开支付界面
        const divForm = document.getElementsByTagName('div')
        if (divForm.length) {
          document.body.removeChild(divForm[0])
        }
        const div = document.createElement('div')
        // data就是接口返回的form 表单字符串
        div.innerHTML = response.data
        document.body.appendChild(div)
        // 新开窗口跳转
        document.forms[0].setAttribute('target', '_blank')
        document.forms[0].submit()
      })
    },
    // 收藏课程
    favoriteClass () {
      // 查询课程信息
      const queryList = {
        tableName: 'course',
        id: [],
        tableKey: 'c_id'
      }
      queryList.id.push('\'' + window.sessionStorage.getItem('c_id') + '\'')
      this.$http('post', '/api/QueryData', queryList).then((response) => {
        const list = {
          header: [{
            tableName: 'course_option',
            id: this.Tools.getUUID(),
            tableKey: 'id'
          }],
          content: [{
            id: this.Tools.getUUID(),
            p_id: window.sessionStorage.getItem('uuid'),
            c_id: window.sessionStorage.getItem('c_id'),
            c_img: response[0][0].c_img,
            c_name: response[0][0].c_name
          }]
        }
        // 将收藏课程的数据存入课程收藏表中
        this.$http('post', '/api/UpdateData', list).then((response) => {
          if (response === 200) {
            this.$message({
              showClose: true,
              message: '已收藏',
              type: 'success',
              center: true,
              duration: 800
            })
            this.tempFavorite = 0
            window.sessionStorage.removeItem('isFavorite')
            window.sessionStorage.setItem('isFavorite', '1')
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
              message: '操作失败!',
              type: 'warning',
              center: true,
              duration: 600
            })
          }
        })
      })
    },
    // 退出课程
    outClass () {
      this.$confirm('是否要退出该门课程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const deleteList = {
          tableName: 'student_course',
          id: '\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND stu_class_id = ' + '\'' + window.sessionStorage.getItem('c_id') + '\'',
          tableKey: 'p_id'
        }
        this.$http('post', '/api/DeleteData', deleteList).then((response) => {
          if (response === 200) {
            this.$message({
              showClose: true,
              message: '您已成功退出课程!',
              type: 'success',
              center: true,
              duration: 800
            })
            this.tempActive = 1
            window.sessionStorage.removeItem('isJoin')
            window.sessionStorage.setItem('isJoin', '0')
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
              message: '操作失败!',
              type: 'warning',
              center: true,
              duration: 600
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 未加入课程只能看第一个视频
    change (e) {
      const id = e.target.id
      if (window.sessionStorage.getItem('isJoin') === '1' || window.sessionStorage.getItem('type') === '1') {
        this.Url = id
      } else {
        this.Url = 'v1'
        this.$message.error('您未加入该课程，只能试看第一个视频，请加入课程观看全部视频')
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
video {
  float: left;
  width: 76%;
}

.el-menu {
  border: 0 !important;
}
</style>
