<template>
  <div style="margin-top: 10px;">
    <el-button type="text" style="margin-right:15px" @click="dialogVisible = true" v-show="showLogin" class="buttonEvent">登录</el-button>
    <el-button type="text" @click="dialogTableVisible = true" v-show="showRegister" class="buttonEvent">注册</el-button>
    <div class ="avatar">
        <el-avatar size="small" :src="avatarurl" v-show="showAvatar"/>
        <el-button type="text" @click="exit" v-show="showExit" style="margin-left:50px" class="buttonEvent">退出</el-button>
     </div>
    <!-- 登录表单 -->
    <el-dialog title="登 录" :visible.sync="dialogVisible" center width="400px">
      <el-form status-icon :model="LoginForm" :rules="LoginRules" ref="LoginForm">
        <el-form-item prop="username">
          <el-input class="LoginInput" placeholder="请输入手机号" v-model="LoginForm.username" autocomplete="off"
                    prefix-icon="el-icon-user" clearable/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="LoginInput" placeholder="请输入密码" type="password" v-model="LoginForm.password"
                    prefix-icon="el-icon-lock"
                    autocomplete="off" clearable show-password/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="LoginButton" icon="el-icon-position" @click="submitForm">立即登录</el-button>
        <br/>
        <el-link style="margin-top: 20px" icon="el-icon-question" type="primary" href="#/ForgetPassword" target="_blank">忘记密码</el-link>
      </div>
    </el-dialog>
    <!-- 注册表单 -->
    <el-dialog title="注 册" :visible.sync="dialogTableVisible" center width="450px">
      <el-form ref="RegisterForm" :model="RegisterForm" :rules="RegisterRules">
        <el-form-item prop="phone">
          <el-input class="RegisterInput" placeholder="请输入手机号" v-model="RegisterForm.phone" size="small"
                    prefix-icon="el-icon-mobile-phone" clearable/>
        </el-form-item>
        <el-form-item prop="password">
          <el-popover
            placement="left"
            width="200"
            trigger="hover"
            content="最少八位，包含一个大写字母，一个小写字母，一个数字，一个字符">
            <el-input class="RegisterInput" placeholder="请输入密码" v-model="RegisterForm.password" size="small"
                      prefix-icon="el-icon-lock" slot="reference" clearable show-password/>
          </el-popover>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input class="RegisterInput" placeholder="请再次输入密码" v-model="RegisterForm.confirmPassword" size="small"
                    prefix-icon="el-icon-lock" clearable show-password/>
        </el-form-item>
        <el-form-item prop="email">
          <el-input class="EmailInput" placeholder="请输入邮箱地址" v-model="RegisterForm.email" size="small"
                    prefix-icon="el-icon-message" @change="getInputValue" clearable/>
          <el-button type="primary" size="small" plain @click="sendEmail" :disabled="isDisabled">点击验证</el-button>
        </el-form-item>
        <el-form-item prop="confirmCode">
          <el-input class="RegisterInput" placeholder="请输入邮箱验证码" v-model="RegisterForm.confirmCode" size="small"
                    prefix-icon="el-icon-finished" :disabled="codeInput" clearable/>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="RegisterForm.radio" label="1">知识分享者</el-radio>
          <el-radio v-model="RegisterForm.radio" label="2">学习者</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registerForm">立即注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import Rulestools from '../utils/Rulestools'

export default {
  name: 'loginPage',
  data () {
    // 两次密码输入是否一致
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.RegisterForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      avatarurl: '',
      codeInput: true,
      isDisabled: true,
      showLogin: true,
      showRegister: true,
      showAvatar: false,
      showExit: false,
      // 登录表单
      LoginForm: {
        username: '',
        password: ''
      },
      // 注册表单
      RegisterForm: {
        phone: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmCode: '',
        radio: '1'
      },
      LoginRules: {
        username: [{
          required: true,
          message: '请输入用户名/邮箱',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      RegisterRules: {
        phone: [{
          required: true,
          trigger: 'blur',
          validator: Rulestools.validatePhone
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: Rulestools.validatePass
        }],
        confirmPassword: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
        email: [{
          required: true,
          validator: Rulestools.validateEMail,
          trigger: 'blur'
        }],
        confirmCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, {
          min: 4,
          max: 4,
          message: '请输入正确的验证码',
          trigger: 'blur'
        }]
      }
    }
  },
  inject: [
    'reload'
  ],
  mounted () {
    // 刷新防止登录后数据丢失
    const token = window.sessionStorage.getItem('Authorization')
    if (token) {
      this.showLogin = false
      this.showRegister = false
      this.showExit = true
      this.showAvatar = true
      this.avatarurl = window.sessionStorage.getItem('avatarurl')
    } else {
      this.showLogin = true
      this.showRegister = true
      this.showExit = false
      this.showAvatar = false
    }
  },
  methods: {
    // 登录
    submitForm () {
      this.$refs.LoginForm.validate((valid) => {
        if (valid) {
          this.LoginForm.tableName = 'user'
          this.$http('post', '/api/login', this.LoginForm).then(response => {
            if (response !== 500 && response !== 400) {
              this.avatarurl = response.avatarurl
              window.sessionStorage.setItem('avatarurl', response.avatarurl)
              window.sessionStorage.setItem('Authorization', response.token)
              window.sessionStorage.setItem('uuid', response.id)
              window.sessionStorage.setItem('nickname', response.nickname)
              window.sessionStorage.setItem('type', response.type)
              this.$message({
                showClose: true,
                message: '登录成功!',
                type: 'success',
                center: true,
                duration: 600
              })
              this.dialogVisible = false
              this.showLogin = false
              this.showRegister = false
              this.showExit = true
              this.showAvatar = true
              this.reload()
            } else if (response === 400) {
              this.$message({
                showClose: true,
                message: '用户名或密码错误!',
                type: 'error',
                center: true,
                duration: 600
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
          this.$refs.LoginForm.resetFields()
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
    },
    // 注册
    registerForm () {
      this.$refs.RegisterForm.validate((valid) => {
        if (valid) {
          this.RegisterForm.tableName = 'user'
          this.RegisterForm.avatarurl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          this.RegisterForm.time = this.DateTools.getNowFormatDate()
          this.$http('post', '/api/register', this.RegisterForm).then(response => {
            if (response === 401) {
              this.$message({
                showClose: true,
                message: '验证码输入不正确!',
                type: 'warning',
                center: true,
                duration: 600
              })
              this.isDisabled = true
              this.codeInput = true
            } else if (response === 400) {
              this.$message({
                showClose: true,
                message: '用户已注册!',
                type: 'warning',
                center: true,
                duration: 600
              })
              this.isDisabled = true
              this.codeInput = true
            } else if (response === 500) {
              this.$message({
                showClose: true,
                message: '服务器错误!',
                type: 'error',
                center: true,
                duration: 600
              })
              this.isDisabled = true
              this.codeInput = true
            } else {
              this.$message({
                showClose: true,
                message: '注册成功!',
                type: 'success',
                center: true,
                duration: 600
              })
              window.sessionStorage.setItem('Authorization', response.token)
              window.sessionStorage.setItem('uuid', response.id)
              window.sessionStorage.setItem('nickname', response.nickname)
              window.sessionStorage.setItem('type', response.type)
              this.isDisabled = true
              this.codeInput = true
              this.dialogTableVisible = false
              this.showLogin = false
              this.showRegister = false
              this.showExit = true
              this.showAvatar = true
              this.reload()
            }
          })
          this.$refs.RegisterForm.resetFields()
        } else {
          this.$message({
            showClose: true,
            message: '输入信息无效或不能为空!',
            type: 'error',
            center: true,
            duration: 600
          })
        }
      })
    },
    // 发送验证码到邮箱
    sendEmail () {
      this.$http('post', '/api/sendCode', this.RegisterForm.email).then(response => {
        if (response === 200) {
          this.$message({
            showClose: true,
            message: '发送验证码成功!',
            type: 'success',
            center: true,
            duration: 600
          })
          this.codeInput = false
          this.isDisabled = true
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
            message: '发送验证码失败!',
            type: 'error',
            center: true,
            duration: 600
          })
        }
      })
    },
    // 邮箱input输入值后改变button状态
    getInputValue () {
      this.$refs.RegisterForm.validateField(['email'], (valid) => {
        // 如果符合验证规则
        this.isDisabled = !!valid
      })
    },
    // 退出登录
    exit () {
      this.$confirm('是否要退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        this.$message({
          showClose: true,
          message: '已退出',
          type: 'warning',
          center: true,
          duration: 600
        })
        this.showLogin = true
        this.showRegister = true
        this.showExit = false
        this.showAvatar = false
        this.reload()
      })
    }
  }
}
</script>
<style scoped>
/deep/ .el-dialog {
  border-radius: 13px;
}

/deep/ .el-dialog--center .el-dialog__body {
  padding: 25px 25px 0
}

/deep/ .el-dialog__footer {
  padding: 0 20px 20px
}
.avatar{
  position:relative;
  top:0;
}

.buttonEvent {
  font-size: 16px;
  color: #333;
  position:relative;
  bottom:10px;
  right:20px;
}

.buttonEvent :hover {
  color: #409EFF;
  text-decoration: underline #409EFF;
}

.LoginButton {
  width: 200px;
}

.LoginInput {
  border-radius: 13px;
  width: 350px;
}

.RegisterInput {
  width: 400px;
  border-radius: 13px;
}

.EmailInput {
  width: 320px;
}
</style>
