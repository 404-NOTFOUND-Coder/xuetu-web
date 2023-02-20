<template>
  <el-container>
    <el-header>
      <el-steps :active="active" finish-status="success">
        <el-step title="验证邮箱"></el-step>
        <el-step title="修改密码"></el-step>
        <el-step title="返回登录"></el-step>
      </el-steps>
    </el-header>
    <el-main>
      <!-- 邮箱验证 -->
      <div class="emailConfirm" v-show="active === 0">
        <el-form ref="emailForm" :model="emailForm" :rules="emailRules">
          <el-form-item prop="email">
            <el-input class="EmailInput" placeholder="请输入邮箱地址" v-model="emailForm.email" size="small"
                      prefix-icon="el-icon-message" @change="getInputValue()" clearable/>
            <el-button type="primary" size="small" plain @click="sendEmail()" :disabled="isDisabled">点击验证</el-button>
          </el-form-item>
          <el-form-item prop="confirmCode">
            <el-input class="codeInput" placeholder="请输入邮箱验证码" v-model="emailForm.code" size="small"
                      prefix-icon="el-icon-finished" :disabled="codeInput" clearable/>
          </el-form-item>
        </el-form>
        <el-button class="stepButton" type="primary" @click="emailConfirm" v-show="active === 0">下一步</el-button>
      </div>
      <!-- 新密码提交 -->
      <div class="passwordConfirm" v-show="active === 1">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules">
          <el-form-item prop="password">
            <el-popover
              placement="left"
              width="200"
              trigger="hover"
              content="最少八位，包含一个大写字母，一个小写字母，一个数字，一个字符">
              <el-input class="PasswordInput" placeholder="请输入密码" v-model="passwordForm.password" size="small"
                        prefix-icon="el-icon-lock" slot="reference" clearable show-password/>
            </el-popover>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input class="PasswordInput" placeholder="请再次输入密码" v-model="passwordForm.confirmPassword" size="small"
                      prefix-icon="el-icon-lock" clearable show-password/>
          </el-form-item>
        </el-form>
        <el-button class="stepButton" type="primary" @click="passwordConfirm" v-show="active === 1">下一步</el-button>
      </div>
      <el-result icon="success" title="密码重置成功" subTitle="请点击下方按钮返回首页" v-show="active === 3">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="returnHome">返回首页</el-button>
        </template>
      </el-result>
    </el-main>
  </el-container>
</template>

<script>
import Rulestools from '../utils/Rulestools'
import DateTools from '../utils/Datetools'

export default {
  name: 'forgetPassword',
  data () {
    // 两次密码输入是否一致
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码!'))
      } else if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      isDisabled: true,
      codeInput: true,
      // 邮箱提交表单
      emailForm: {
        email: '',
        code: ''
      },
      // 新密码提交表单
      passwordForm: {
        password: '',
        confirmPassword: ''
      },
      emailRules: {
        email: [{
          required: true,
          validator: Rulestools.validateEMail,
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, {
          min: 4,
          max: 4,
          message: '请输入正确的验证码',
          trigger: 'blur'
        }]
      },
      passwordRules: {
        password: [{
          required: true,
          validator: Rulestools.validatePass,
          trigger: 'blur'
        }],
        confirmPassword: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    getInputValue () {
      this.$refs.emailForm.validateField(['email'], (valid) => {
        // 如果符合验证规则
        this.isDisabled = !!valid
      })
    },
    // 发送验证码到邮箱
    sendEmail () {
      this.$http('post', 'api/sendCode', this.emailForm.email).then(response => {
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
    // 邮箱验证
    emailConfirm () {
      if (this.emailForm.email === '' || this.emailForm.code === '') {
        this.$message({
          showClose: true,
          message: '请输入信息!',
          type: 'error',
          center: true,
          duration: 600
        })
      } else {
        this.$http('post', '/api/verifyEmail', this.emailForm).then(response => {
          if (response === 400) {
            this.$message({
              showClose: true,
              message: '验证码输入不正确!',
              type: 'warning',
              center: true,
              duration: 600
            })
            this.emailForm.code = ''
          } else if (response === 500) {
            this.$message({
              showClose: true,
              message: '服务器错误!',
              type: 'error',
              center: true,
              duration: 600
            })
            this.emailForm.code = ''
          } else if (response === 401) {
            this.$message({
              showClose: true,
              message: '邮箱未注册!',
              type: 'error',
              center: true,
              duration: 600
            })
            this.emailForm.code = ''
          } else {
            window.sessionStorage.setItem('userId', response.id)
            this.$message({
              showClose: true,
              message: '验证成功!',
              type: 'success',
              center: true,
              duration: 600
            })
            this.$refs.emailForm.resetFields()
            this.active++
          }
        })
      }
    },
    // 密码更新
    passwordConfirm () {
      if (this.passwordForm.password === '' || this.passwordForm.confirmPassword === '') {
        this.$message({
          showClose: true,
          message: '请输入信息!',
          type: 'error',
          center: true,
          duration: 600
        })
      } else {
        const list = {
          header: [{
            tableName: 'user',
            id: window.sessionStorage.getItem('userId'),
            tableKey: 'id'
          }],
          content: [{
            id: window.sessionStorage.getItem('userId'),
            password: this.passwordForm.password,
            editTime: DateTools.getNowFormatDate()
          }]
        }
        this.$http('post', '/api/UpdateData', list).then(response => {
          if (response === 200) {
            this.$message({
              showClose: true,
              message: '修改成功!',
              type: 'success',
              center: true,
              duration: 600
            })
            this.$refs.passwordForm.resetFields()
            this.active = this.active + 2
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
      }
    },
    // 返回首页
    returnHome () {
      this.$router.push({ path: '/HomeView' })
    }
  }
}
</script>

<style scoped>
.EmailInput {
  width: 320px
}

.codeInput {
  width: 400px
}

.PasswordInput {
  width: 400px
}

.el-main {
  margin: 0 auto
}

.el-header {
  margin-top: 10px
}

.stepButton {
  margin: 0 40%
}
</style>
