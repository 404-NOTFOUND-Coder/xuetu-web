<template>
  <div>
    <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      :show-header="false"
      style="width: 100%">
      <el-table-column>
        <template slot-scope="scope">
          <img :src="scope.row.c_img"/>
          <p>{{scope.row.c_name}}</p>
          <el-button @click="beginStudy(scope.row.c_id,'beginStudy')" type="primary" round>进入课程</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="8"
        layout="total, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentClass',
  data () {
    return {
      isLogin: false,
      circleUrl: '',
      nickname: '',
      message: '',
      time: new Date().getHours(),
      currentPage: 1,
      pageSize: 8,
      currentPage4: 1,
      tableData: []
    }
  },
  mounted () {
    const tokenStr = window.sessionStorage.getItem('Authorization')
    if (!tokenStr) {
      // this.$message({
      //   message: '未登录！',
      //   type: 'warning',
      //   center: true,
      //   duration: 700
      // })
    } else {
      this.isLogin = true
      this.circleUrl = window.sessionStorage.getItem('avatarurl')
      this.nickname = window.sessionStorage.getItem('nickname')
    }
    if (window.sessionStorage.getItem('type') === '1') {
      // 查询教授付费课程
      const queryList = {
        tableName: 'course',
        id: [],
        tableKey: 't_id'
      }
      queryList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND c_price != 0 ')
      this.$http('post', '/api/QueryData', queryList).then((response) => {
        this.tableData = response[0]
      })
    } else {
      // 查询所有付费课程
      const queryList = {
        tableName: 'course WHERE c_price != 0',
        id: [''],
        tableKey: ''
      }
      this.$http('post', '/api/QueryData', queryList).then((response) => {
        this.tableData = response[0]
      })
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$data.currentPage = val
    },
    beginStudy (row, routerPath) {
      const token = window.sessionStorage.getItem('Authorization')
      window.sessionStorage.setItem('c_id', row)
      this.$router.push({ path: routerPath })
      if (token) {
        const list = {
          header: [{
            tableName: 'course_history',
            id: window.sessionStorage.getItem('c_id'),
            tableKey: 'c_id'
          }],
          content: [{
            c_id: window.sessionStorage.getItem('c_id'),
            p_id: window.sessionStorage.getItem('uuid'),
            createTime: this.DateTools.getNowFormatDate()
          }]
        }
        this.$http('post', '/api/UpdateData', list)
      }
      if (token && window.sessionStorage.getItem('type') === '2') {
        this.$http('post', '/api/getTime', { uuid: window.sessionStorage.getItem('uuid'), c_id: window.sessionStorage.getItem('c_id'), type: 'beginDate' })
      }
    }
  }
}
</script>

<style scoped>
.el-button {
  margin-left: 31%;
}

p{
  text-align: center;
  margin-bottom: 13px;
  font-size: larger;
  font-weight: bold;
  margin-left: -5%;
  margin-top: -10%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

table img {
  width: 230px;
  height: 150px;
  padding: 40px;
}

/*表行*/
/deep/ .el-table tr {
  position: relative;
  display: inline-block;
}

/deep/ .cell{
  width: 310px;
}
</style>
