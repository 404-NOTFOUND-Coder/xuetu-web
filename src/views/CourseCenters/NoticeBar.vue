<template>
  <div>
    <div class="up">
      <el-button type="primary" plain @click="dialogFormVisible=true" v-show="isType">发布公告</el-button>
      <el-dialog title="发 布 公 告" width="70%" height="60%" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="noticeRules">
          <el-form-item label="发布人:">
            <el-input v-model="form.name" disabled/>
          </el-form-item>
          <el-form-item label="通知/公告标题:" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" clearable/>
          </el-form-item>
          <el-form-item label="通知/公告内容:" prop="content">
            <el-input type="textarea" :rows="10" placeholder="请输入通知/公告内容" prefix-icon="el-icon-edit"
                      v-model="form.content"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitNotice">发 布</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="infinite-list-wrapper" style="overflow:auto;margin-top: 20px">
      <ul class="list">
        <li v-for="item in noticeList" :key="item.id" class="list-item">
          <div class="warppers">
            <div class="outer">
              <div class="left" style="width: 30%">
                <div class="pic">
                  <el-avatar :src="item.avatarurl" height="65px"/>
                </div>
                <div class="name">
                  <span style="display: block">发布人:{{ item.uname }}</span>
                  <span style="display: block">发布时间:{{ item.time }}</span>
                </div>
              </div>
              <div class="center" style="width: 68%">
                <h2>{{ item.text }}</h2>
              </div>
              <div class="right" style="width: 30%">
                <el-button type="primary" size="mini" plain round @click="seeNotice(item)">查看</el-button>
                <el-button type="warning" size="mini" plain round @click="editNotice(item)" v-show="isType">修改</el-button>
                <el-button type="danger" size="mini" plain round @click="deleteNotice(item)" v-show="isType">删除</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 查看公告 -->
      <el-dialog title="公 告 信 息" :visible.sync="centerDialogVisible" width="70%" height="60%" center>
        <el-descriptions :title="noticeTitle" :column="2">
          <el-descriptions-item label="发布人">{{ postName }}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{ postTime }}</el-descriptions-item>
          <el-descriptions-item label="发布内容">{{ contentText }}</el-descriptions-item>
        </el-descriptions>
      </el-dialog>
      <!-- 修改公告 -->
      <el-dialog title="公 告 信 息" :visible.sync="editDialogVisible" width="70%" height="60%" center>
        <el-form :model="editForm" ref="editForm" :rules="editFormRules">
          <el-form-item label="发布人:">
            <el-input v-model="editForm.name" disabled/>
          </el-form-item>
          <el-form-item label="通知/公告标题:" prop="title">
            <el-input v-model="editForm.title" placeholder="请输入标题" clearable/>
          </el-form-item>
          <el-form-item label="通知/公告内容:" prop="content">
            <el-input type="textarea" :rows="10" placeholder="请输入通知/公告内容" prefix-icon="el-icon-edit"
                      v-model="editForm.content"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Tools from '../../utils/Tools'

export default {
  name: 'questionTest',
  data () {
    return {
      dialogFormVisible: false,
      centerDialogVisible: false,
      editDialogVisible: false,
      loading: false,
      isType: false,
      noticeList: [],
      noticeTitle: '',
      postName: '',
      postTime: '',
      contentText: '',
      form: {
        p_id: '',
        name: '',
        title: '',
        content: ''
      },
      editForm: {
        p_id: '',
        name: '',
        title: '',
        content: ''
      },
      noticeRules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }]
      },
      editFormRules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }]
      }
    }
  },
  inject: [
    'reload'
  ],
  mounted () {
    const userType = window.sessionStorage.getItem('type')
    this.isType = userType === '1'
    this.form.name = window.sessionStorage.getItem('nickname')
    this.form.p_id = window.sessionStorage.getItem('uuid')
    // 查询通知公告栏信息
    const queryList = {
      tableName: 'course_notice',
      id: [],
      tableKey: 'c_id'
    }
    queryList.id.push('\'' + window.sessionStorage.getItem('c_id') + '\'')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      for (let i = 0; i < response[0].length; i++) {
        this.noticeList.push({
          id: response[0][i].id,
          avatarurl: response[0][i].avatarurl,
          uname: response[0][i].name,
          time: response[0][i].createTime,
          text: response[0][i].content
        })
      }
    })
  },
  methods: {
    // 发布公告
    submitNotice () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const list = {
            header: [{
              tableName: 'course_notice',
              id: Tools.getUUID(),
              tableKey: 'id'
            }],
            content: [{
              id: Tools.getUUID(),
              p_id: window.sessionStorage.getItem('uuid'),
              name: this.form.name,
              c_id: window.sessionStorage.getItem('c_id'),
              createTime: this.DateTools.getNowFormatDate(),
              title: this.form.title,
              content: this.form.content,
              avatarurl: window.sessionStorage.getItem('avatarurl')
            }]
          }
          this.$http('post', '/api/UpdateData', list).then((response) => {
            if (response === 200) {
              this.$message({
                showClose: true,
                message: '发布成功!',
                type: 'success',
                center: true,
                duration: 600
              })
              this.$refs.form.resetFields()
              this.dialogFormVisible = false
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
                message: '发布失败!',
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
    },
    // 查看公告
    seeNotice (item) {
      const queryList = {
        tableName: 'course_notice',
        id: [],
        tableKey: 'id'
      }
      queryList.id.push('\'' + item.id + '\'')
      this.$http('post', '/api/QueryData', queryList).then((response) => {
        this.noticeTitle = response[0][0].title
        this.postName = response[0][0].name
        this.postTime = response[0][0].createTime
        this.contentText = response[0][0].content
      })
      this.centerDialogVisible = true
    },
    // 修改前查询公告信息
    editNotice (item) {
      const queryList = {
        tableName: 'course_notice',
        id: [],
        tableKey: 'id'
      }
      queryList.id.push('\'' + item.id + '\'')
      this.$http('post', '/api/QueryData', queryList).then((response) => {
        this.editForm = {
          id: item.id,
          name: response[0][0].name,
          title: response[0][0].title,
          content: response[0][0].content
        }
      })
      this.editDialogVisible = true
    },
    // 提交修改结果
    submitEdit () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const list = {
            header: [{
              tableName: 'course_notice',
              id: this.editForm.id,
              tableKey: 'id'
            }],
            content: [{
              id: this.editForm.id,
              p_id: window.sessionStorage.getItem('uuid'),
              name: this.editForm.name,
              editTime: this.DateTools.getNowFormatDate(),
              title: this.editForm.title,
              content: this.editForm.content
            }]
          }
          this.$http('post', '/api/UpdateData', list).then((response) => {
            if (response === 200) {
              this.$message({
                showClose: true,
                message: '发布成功!',
                type: 'success',
                center: true,
                duration: 600
              })
              this.editDialogVisible = false
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
                message: '发布失败!',
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
    },
    // 删除公告
    deleteNotice (item) {
      this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const deleteList = { tableName: 'course_notice', id: "'" + item.id + "'", tableKey: 'id' }
        this.$http('post', '/api/DeleteData', deleteList).then((response) => {
          if (response === 200) {
            this.$message({
              showClose: true,
              message: '删除成功!',
              type: 'success',
              center: true,
              duration: 600
            })
            this.editDialogVisible = false
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
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.outer {
  display: flex;
}

.left {
  display: flex;
}

.pic {
  padding-top: 15px;
  padding-left: 15px;
}

.name span {
  font-size: 14px;
  text-align: left;
  margin-left: 15px;
}

.name span:nth-child(1) {
  margin-top: 10px;
}

h2 {
  line-height: 73px;
  font-weight: bold;
  display: inline;
  float: left;
}

h2:hover {
  cursor: pointer;
}

.right button {
  margin-top: 22px;
}

.list-item {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  border-radius: 30px
}

.list-item:hover {
  background-color: #EBEEF5;
}

el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #FFF;
  border-radius: 6px;
  box-sizing: border-box;
  width: 50%;
}

.up {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
