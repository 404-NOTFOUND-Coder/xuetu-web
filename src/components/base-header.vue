<template>
  <div>
    <el-row>
      <el-col :span="3">
        <img src="../assets/img/logo.png" style="margin-top:15px" width="65" height="40">
      </el-col>
      <el-col :span="10">
        <NavBar/>
      </el-col>
      <el-col :span="5">
        <el-input size="mini" placeholder="检索课程、直播、学习资料..." v-model="searchInput">-->
          <el-button slot="append" icon="el-icon-search"/>
        </el-input>
      </el-col>
      <el-col :span="2">
        <i class="el-icon-message" @click="showMessage"/>
        <el-button type="text" @click="showMessage" class="buttonEvent">消息</el-button>
      </el-col>
      <el-col :span="2">
        <Login/>
      </el-col>
      <el-col :span="2">
        <el-link href="https://gitee.com/shi-xun-project" target="_blank" class="connect">联系我们</el-link>
      </el-col>
    </el-row>
    <!-- 我的消息 -->
    <el-dialog title="我 的 消 息" :visible.sync="messageDialogVisible" width="50%" center>
      <el-table height="250" border :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="发布人" width="100"/>
        <el-table-column prop="createTime" label="发布时间" width="180"/>
        <el-table-column prop="title" label="通知标题"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import NavBar from './base-navBar'
import Login from './base-login'

export default {
  name: 'headerBar',
  data () {
    return {
      searchInput: '',
      messageDialogVisible: false,
      tableData: []
    }
  },
  components: {
    NavBar,
    Login
  },
  methods: {
    showMessage () {
      // 查询通知
      const queryList = {
        tableName: 'student_course',
        id: [],
        tableKey: 'p_id'
      }
      queryList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'')
      this.$http('post', '/api/QueryData', queryList).then((response) => {
        const list = []
        for (let i = 0; i < response[0].length; i++) {
          const queryList = {
            tableName: 'course_notice',
            id: [],
            tableKey: 'c_id'
          }
          queryList.id.push('\'' + response[0][i].stu_class_id + '\'')
          this.$http('post', '/api/QueryData', queryList).then((res) => {
            for (let m = 0; m < res[0].length; m++) {
              list.push(res[0][m])
            }
          })
        }
        this.tableData = list
      })
      this.messageDialogVisible = true
    }
  }
}
</script>

<style scoped>
/deep/ .el-link.el-link--default {
  margin-top: 13px;
  color: #333;
}
.el-col-2 {
  margin-top: 15px;
}

.el-input-group {
  margin-top: 20px;
}

.el-icon-message {
  cursor: pointer
}

.connect {
  font-size: 16px;
  text-decoration: none;
}

.connect :hover {
  color: #409EFF;
}

.buttonEvent {
  margin-left: 5px;
  font-size: 16px;
  color: #333
}

.buttonEvent :hover {
  text-decoration: underline #409EFF;
}

.el-icon-message{
  margin-left:20px
}
</style>
