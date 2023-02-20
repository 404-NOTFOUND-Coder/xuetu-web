<template>
  <div>
    <img src="../assets/img/404NotFound.png" v-if="!isLogin" alt="">
    <el-container v-show="isLogin">
      <el-main>
        <!-- 头像 -->
        <div class="avatar">
          <el-avatar :size="130" :src="circleUrl"/>
        </div>
        <div class="introduction">
          <div class="nickName">
            <h1>{{ this.username }}</h1>
          </div>
          <div class="edit">
            <i class="el-icon-edit" style="margin-right: 10px"></i>
            <el-button type="text" class="editButton" @click="dialogVisible = true">编辑个人资料</el-button>
          </div>
        </div>
        <div class="userInfoBox">
          <el-row :gutter="20">
            <el-col :span="3">
              <i class="el-icon-edit-outline"/>
            </el-col>
            <el-col :span="4">
              <span>{{ guestNumber }}</span>
            </el-col>
            <el-col :span="3">
              <i class="iconfont icon-dianzan1"/>
            </el-col>
            <el-col :span="4">
              <span>{{ likeNumber }}</span>
            </el-col>
            <el-col :span="3">
              <i class="el-icon-star-off"/>
            </el-col>
            <el-col :span="4">
              <span>{{ favoriteNumber }}</span>
            </el-col>
          </el-row>
        </div>
        <el-dialog title="编辑个人资料" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
          <el-form ref="form" :model="form" :rules="informRules" label-width="80px">
            <el-form-item label="昵称" prop="name">
              <el-input placeholder="请输入昵称" v-model="form.name" size="small" clearable/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input placeholder="请输入手机号" v-model="form.phone" size="small" clearable/>
            </el-form-item>
            <el-form-item label="认证邮箱" prop="email">
              <el-input placeholder="请输入邮箱地址" v-model="form.email" size="small" clearable/>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
              <el-input placeholder="介绍一下你自己" type="textarea" v-model="form.introduction"/>
            </el-form-item>
            <el-form-item>
              <el-upload
                class="avatar-uploader"
                action="/api/savePic"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveInform">保 存</el-button>
          </div>
        </el-dialog>
        <!-- 个人资料修改界面 -->
      </el-main>
      <el-header style="height: 600px">
        <el-tabs lazy v-model="activeName">
          <el-tab-pane label="我的课程" name="myClass">
            <my-class/>
          </el-tab-pane>
          <el-tab-pane label="收藏夹" name="favourites">
            <Favourites/>
          </el-tab-pane>
          <el-tab-pane label="学习记录" name="studyRecords">
            <le-records/>
          </el-tab-pane>
          <el-tab-pane label="订单管理" name="course">
            <OrderManagement/>
          </el-tab-pane>
        </el-tabs>
      </el-header>
    </el-container>
  </div>
</template>

<script>
import MyClass from '../views/OwnPages/MyClass'
import Favourites from './OwnPages/MyFavorite'
import LeRecords from './OwnPages/StudyHistory'
import OrderManagement from './OwnPages/OrderManagement'

export default {
  name: 'ownPage',
  components: {
    LeRecords,
    Favourites,
    MyClass,
    OrderManagement
  },
  inject: [
    'reload'
  ],
  data () {
    return {
      isLogin: false,
      activeName: 'myClass',
      circleUrl: '',
      dialogVisible: false,
      username: '',
      imageUrl: '',
      guestNumber: 0,
      likeNumber: 0,
      favoriteNumber: 0,
      form: {
        name: '',
        phone: '',
        email: '',
        introduction: '',
        avatarurl: ''
      },
      informRules: {
        name: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          min: 11,
          max: 11,
          message: '请输入正确的手机号码',
          trigger: 'blur'
        }, {
          pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          message: '请输入正确的手机号码'
        }],
        email: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        }, {
          pattern: /^\w+@\w+(\.\w+)+$/,
          message: '请输入正确的邮箱地址'
        }]
      }
    }
  },
  mounted () {
    const tokenStr = window.sessionStorage.getItem('Authorization')
    if (!tokenStr) {
      this.$message({
        message: '请先登录！',
        type: 'error',
        center: true,
        duration: 800
      })
    } else {
      this.isLogin = true
      // 查询用户基本信息
      const queryList = {
        tableName: 'user',
        id: [],
        tableKey: 'id'
      }
      queryList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'')
      this.$http('post', '/api/QueryData', queryList).then((response) => {
        window.sessionStorage.removeItem('nickname')
        window.sessionStorage.setItem('nickname', response[0][0].name)
        this.username = response[0][0].name
        this.form.name = response[0][0].name
        this.form.phone = response[0][0].phone
        this.form.email = response[0][0].email
        this.form.introduction = response[0][0].introduction
        this.form.avatarurl = this.imageUrl = this.circleUrl = response[0][0].avatarurl
        window.sessionStorage.setItem('avatarurl', this.circleUrl)
      })
      // 查询用户发帖数量
      const guestList = {
        tableName: 'guest',
        id: [],
        tableKey: 'p_id'
      }
      guestList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'')
      this.$http('post', '/api/QueryData', guestList).then((response) => {
        this.guestNumber = response[0].length
      })
      // 查询用户点赞评论数量
      const optionList = {
        tableName: 'guest_option',
        id: [],
        tableKey: 'p_id'
      }
      optionList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'')
      this.$http('post', '/api/QueryData', optionList).then((response) => {
        for (let i = 0; i < response[0].length; i++) {
          if (response[0][i].o_liked === '1' && response[0][i].o_favorite === '0') {
            this.likeNumber = this.likeNumber + 1
          } else if (response[0][i].o_liked === '0' && response[0][i].o_favorite === '1') {
            this.favoriteNumber = this.favoriteNumber + 1
          } else {
            return 0
          }
        }
      })
    }
  },
  methods: {
    // 头像上传
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.avatarurl = res.data
      this.$message({
        showClose: true,
        message: '上传成功!',
        type: 'success',
        center: true,
        duration: 600
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message({
          showClose: true,
          message: '上传头像图片只能是 JPG 格式!',
          type: 'error',
          center: true,
          duration: 600
        })
      }
      if (!isLt2M) {
        this.$message({
          showClose: true,
          message: '上传头像图片大小不能超过 2MB!',
          type: 'error',
          center: true,
          duration: 600
        })
      }
      return isJPG && isLt2M
    },
    // 确认是否关闭
    handleClose (done) {
      this.$confirm('表单信息未保存，是否确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    // 保存修改表单
    saveInform () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const list = {
            header: [{
              tableName: 'user',
              id: window.sessionStorage.getItem('uuid'),
              tableKey: 'id'
            }],
            content: [{
              id: window.sessionStorage.getItem('uuid'),
              name: this.form.name,
              phone: this.form.phone,
              email: this.form.email,
              introduction: this.form.introduction,
              avatarurl: this.form.avatarurl,
              editTime: this.DateTools.getNowFormatDate()
            }]
          }
          this.$http('post', '/api/UpdateData', list).then((response) => {
            if (response === 200) {
              this.$message({
                showClose: true,
                message: '修改成功!',
                type: 'success',
                center: true,
                duration: 600
              })
              this.$refs.form.resetFields()
              this.dialogVisible = false
              this.reload()
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
                message: '修改失败!',
                type: 'warning',
                center: true,
                duration: 600
              })
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '输入信息不能为空!',
            type: 'error',
            center: true,
            duration: 600
          })
        }
      })
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
}

.introduction {
  height: 130px;
  float: left;
}

.nickName {
  margin-top: 10px;
  margin-left: 40px;
  font: 50px Extra large;
  height: 80%;
}

.edit {
  height: 20%;
}

.userInfoBox {
  margin-top: 10%;
  float: right;
}

.editButton {
  color: #333333;
}

.editButton :hover {
  text-decoration: underline #409EFF;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
