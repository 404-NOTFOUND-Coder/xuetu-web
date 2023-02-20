<template>
  <!-- 1是填写信息页面 2是提交成功页面 -->
  <section class="invest-wrap" v-show="isType === 0">
    <h1 style="text-align:center;font-weight:bold;font-size:20px" v-if="active===1 || active===2">{{sector}}测试题</h1>
    <el-steps :active="active" simple style="margin:25px 0" v-if="active===1 || active===2">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-finished"></el-step>
    </el-steps>
    <div class="form-wrap">
      <!-- 填写信息页面 -->
      <div v-if="active === 1">
        <el-container>
          <!-- 问卷主题内容 -->
          <el-main>
            <el-form :model="userForm" ref="userForm" :rules="formRules">
              <!-- 输入框 -->
              <div class="question-content">
                <div class="question-title">
                  Q1:在 css 选择器当中，优先级排序正确的是？
                </div>
                <div class="question-option">
                  <el-form-item prop="radio1">
                    <el-radio-group v-model="userForm.radio1">
                      <el-radio :label="1">A.id选择器>标签选择器>类选择器</el-radio>
                      <el-radio :label="2">B.标签选择器>类选择器>id选择器</el-radio>
                      <el-radio :label="3">C.类选择器>标签选择器>id选择器</el-radio>
                      <el-radio :label="4">D.id选择器>类选择器>标签选择器</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <!-- 选择下拉框 -->
              <div class="question-content">
                <div class="question-title">
                  Q2:下列定义的 css 中，哪个权重是最低的？
                </div>
                <div class="question-option">
                  <el-form-item prop="radio2">
                    <el-radio-group v-model="userForm.radio2">
                      <el-radio :label="1">A.#game .name</el-radio>
                      <el-radio :label="2">B.#game .name span</el-radio>
                      <el-radio :label="3">C.#game div</el-radio>
                      <el-radio :label="4">D.#game div.name</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <!-- 条件触发式选择下拉框 -->
              <div class="question-content">
                <div class="question-title">
                  Q3:CSS 样式，下面哪一个元素能够达到最大宽度，且前后各有一个换行？
                </div>
                <div class="question-option">
                  <el-form-item prop="radio3">
                    <el-radio-group v-model="userForm.radio3">
                      <el-radio :label="1">A.Block Element</el-radio>
                      <el-radio :label="2">B.Square Element</el-radio>
                      <el-radio :label="3">C.Side Element</el-radio>
                      <el-radio :label="4">D.Box Element</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <div class="question-content">
                <div class="question-title">
                  Q4:不属于vue的props验证类型的是哪一项
                </div>
                <div class="question-option">
                  <el-form-item prop="radio4">
                    <el-radio-group v-model="userForm.radio4">
                      <el-radio :label="1">A.Function</el-radio>
                      <el-radio :label="2">B.Object</el-radio>
                      <el-radio :label="3">C.Map</el-radio>
                      <el-radio :label="4">D.Boolean</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <!-- 单选框 -->
              <div class="question-content">
                <div class="question-title">
                  Q5:放在HTML里的哪一部分JavaScripts会在页面加载的时候被执行？
                </div>
                <div class="question-option">
                  <el-form-item prop="radio5">
                    <el-radio-group v-model="userForm.radio5">
                      <el-radio :label="1">A.文件头部位置</el-radio>
                      <el-radio :label="2">B.文件尾</el-radio>
                      <el-radio :label="3">C.head标签部分</el-radio>
                      <el-radio :label="4">D.body标签部分</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <!-- 文字输入框 -->
              <div class="question-content">
                <div class="question-title">
                  Q6:为什么要语义化？
                </div>
                <div class="question-option">
                  <el-form-item prop="textContent">
                    <el-input v-model="userForm.textContent" type="textarea" :rows="2" placeholder="请输入内容">
                    </el-input>
                  </el-form-item>
                </div>
              </div>
              <!-- 星星评级 -->
              <div class="question-content">
                <div class="question-title">
                  Q7:请评价本次课掌握情况
                </div>
                <div class="question-option">
                  <el-form-item prop="rate">
                    <el-rate v-model="userForm.rate" show-text></el-rate>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div style="text-align:center;margin-top:30px">
              <el-button size="mini" type="primary" @click="upload">提交</el-button>
            </div>
          </el-main>
        </el-container>
      </div>
      <!-- 提交成功页面 -->
      <div style="margin: 50px auto auto;width:60%;text-align:center" v-if="active === 2">
        <img src="../assets/img/success1.png" style="width: 210px"/>
        <h2 style="text-align: center;margin-top: 10px;font-weight: bold;font-size: 20px;">提交成功</h2>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'courseTemplate',
  props: ['sector'],
  data () {
    return {
      isType: 0, // 0:知识分享者 1:学习者
      active: 1,
      label: 3,
      value: '男',
      formRules: {
        radio1: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        radio2: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        radio3: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        radio4: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        radio5: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        textContent: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      userForm: {
        radio1: '',
        radio2: '',
        radio3: '',
        radio4: '',
        radio5: '',
        textContent: '',
        rate: 0
      }
    }
  },
  beforeCreate () {
    const userType = window.sessionStorage.getItem('type')
    if (userType === '1') {
      this.isType = 0
    } else {
      this.isType = 1
    }
  },
  mounted () {
    // 查询课程
    const queryList = {
      tableName: 'course_homework',
      id: [],
      tableKey: 'p_id'
    }
    queryList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND c_id =' + '\'' + window.sessionStorage.getItem('c_id') + '\'' + 'AND page_id =' + '\'' + this.sector + '\'')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      if (response[0][0] === undefined) {
        this.active = 1
      } else {
        this.active = 2
      }
    })
  },
  methods: {
    // 提交信息
    upload () {
      const list = {
        header: [{
          tableName: 'course_homework',
          id: this.Tools.getUUID(),
          tableKey: 'id'
        }],
        content: [{
          id: this.Tools.getUUID(),
          p_id: window.sessionStorage.getItem('uuid'),
          name: window.sessionStorage.getItem('nickname'),
          c_id: window.sessionStorage.getItem('c_id'),
          page_id: this.$props.sector,
          status: '1',
          createTime: this.DateTools.getNowFormatDate()
        }]
      }
      this.$http('post', '/api/UpdateData', list).then((response) => {
        if (response === 200) {
          this.$message({
            showClose: true,
            message: '提交成功!',
            type: 'success',
            center: true,
            duration: 600
          })
          this.active = 2
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
            message: '提交失败!',
            type: 'warning',
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
.invest-wrap {
  background-color: #f8fdfe;
}

.form-wrap {
  padding: 0 25px;
}

.el-main {
  color: #333;
  text-align: left;
}

.question-content {
  color: #AAAAAA;
}

.question-title {
  font-size: 16px;
  color: #484848;
}

.question-option {}

.el-button--primary {
  color: #fff;
  background-color: #2672ff;
  min-width: 88px;
  height: 30px;
  padding: 0 18px;
  font-size: 12px;
  line-height: 28px;
  border-radius: 2px;
  border: 1px solid #2672ff;
}
</style>
