<template>
  <div class="background">
    <div class="up">
      <el-button type="primary" style="margin-bottom: 20px;margin-left: 42px;" plain @click="dialogFormVisible=true" v-show="isType">上传资源</el-button>
    </div>
    <el-dialog title="上 传 资 源" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="informRules">
        <el-form-item label="上传者:" prop="name">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="资源标题:" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上传文件:" prop="url">
          <template>
            <el-upload
              class="upload-demo"
              action="/api/savePic"
              accept=".pdf"
              :on-success="handleSuccess"
              :before-upload="(res)=>beforeUpload(res,1)"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary" ref="upload" v-model="form.file_url">选择文件</el-button>
            </el-upload>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFile">上 传</el-button>
      </div>
    </el-dialog>
    <el-card class="box-card" v-for="item in resourceList" :key="item.id">
      <div class="warppers">
        <div class="outer">
          <div class="left" style="width: 45%;line-height: 24px;">
            <div class="pic">
              <el-avatar :src="item.avatarurl" height="65px"/>
            </div>
            <div class="name">
              <span style="display: block">发布人:{{ item.uname }}</span>
              <span style="display: block">发布时间:{{ item.time }}</span>
            </div>
          </div>
          <div class="center" style="width: 62%">
            <h2>{{ item.Title }}</h2>
          </div>
          <div class="right" style="width: 28%;line-height: 67px;">
            <el-button type="primary" size="mini" plain round @click="watchFile(item)">查看</el-button>
            <el-button type="danger" size="mini" plain round @click="deleteNotice(item)" v-show="isType">删除</el-button>
            <!-- 点击查看-->
            <el-dialog :visible.sync="dialogVisible" width="90%">
              <VuePdf :pdfUrl="pdfUrl"/>
            </el-dialog>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Tools from '../../utils/Tools'
import VuePdf from '../../components/base-vue-pdf'

export default {
  name: 'studyRes',
  components: {
    VuePdf
  },
  data () {
    return {
      textarea: '',
      dialogFormVisible: false,
      dialogVisible: false,
      isType: false,
      fileList: [],
      resourceList: [],
      form: {
        title: '',
        name: '',
        file_url: '',
        p_id: ''
      },
      informRules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        url: [{
          requested: true,
          message: '请上传资源',
          trigger: 'blur'
        }]
      },
      pdfUrl: ''
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
    // 查询教学资源
    const queryList = {
      tableName: 'course_resource',
      id: [],
      tableKey: 'c_id'
    }
    queryList.id.push('\'' + window.sessionStorage.getItem('c_id') + '\'')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      for (let i = 0; i < response[0].length; i++) {
        this.resourceList.push({
          id: response[0][i].id,
          time: this.DateTools.getNowFormatDate(),
          avatarurl: response[0][i].avatarurl,
          uname: response[0][i].name,
          Title: response[0][i].title
        })
      }
    })
  },
  methods: {
    // 上传前回调
    beforeUpload (file, type) {
      // 可以获取上传的大小和类型
      if (file.size / (1024 * 1024) > 500) {
        // 限制文件大小
        this.$message.warning('当前限制文件大小不能大于500M')
        return false
      }
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      const whiteList = ['pdf']
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message({
          message: '上传文件只能是 pdf',
          type: 'warning'
        })
        return false
      }
    },
    handleSuccess (res, file) {
      this.url = URL.createObjectURL(file.raw)
      this.form.file_url = res.data
      this.$message({
        showClose: true,
        message: '上传成功!',
        type: 'success',
        center: true,
        duration: 600
      })
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 提交上传资源
    saveFile () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const list = {
            header: [
              {
                tableName: 'course_resource',
                id: Tools.getUUID(),
                tableKey: 'id'
              }],
            content: [{
              // 自动生成id
              id: Tools.getUUID(),
              p_id: window.sessionStorage.getItem('uuid'),
              name: this.form.name,
              title: this.form.title,
              file_url: this.form.file_url,
              avatarurl: window.sessionStorage.getItem('avatarurl'),
              createTime: this.DateTools.getNowFormatDate(),
              c_id: window.sessionStorage.getItem('c_id')
            }]
          }
          this.$http('post', '/api/UpdateData', list).then((response) => {
            if (response === 200) {
              this.$message({
                showClose: true,
                message: '上传成功!',
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
                message: '上传失败!',
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
    watchFile (item) {
      const queryList = {
        tableName: 'course_resource',
        id: [],
        tableKey: 'id'
      }
      queryList.id.push('\'' + item.id + '\'')
      this.$http('post', '/api/QueryData', queryList).then((response) => {
        this.pdfUrl = response[0][0].file_url
      })
      this.dialogVisible = true
    },
    deleteNotice (item) {
      this.$confirm('此操作将删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const deleteList = { tableName: 'course_resource', id: "'" + item.id + "'", tableKey: 'id' }
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
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 94%;
  margin-left: 42px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 42px;
}

img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

span {
  font-weight: bold;
}

.up {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.outer {
  display: flex;
}
.left {
  display: flex;
}
.pic {
  padding-top: 12px;
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
.center h2{
  line-height: 67px;
  text-align: left;
  font-size: 32px;
  color: royalblue;
}
</style>
