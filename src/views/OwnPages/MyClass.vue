<template>
  <div class="table-a">
  <el-table
    :data="classTable"
    style="width: 100%"
    height="530"
    :header-cell-style="{ background: '#f8fdfe' }">
    <el-table-column
      label="课程封面"
      width="250">
      <template slot-scope="scope">
        <img :src="scope.row.c_img" alt="" width="120" height="80">
      </template>
    </el-table-column>
    <el-table-column
      label="课程名称"
      width="200">
      <template slot-scope="scope">
        <span>{{ scope.row.c_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="开课时间"
      width="200">
      <template slot-scope="scope">
        <span>{{ scope.row.c_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="课程描述"
      width="250">
      <template slot-scope="scope">
        <span>{{ scope.row.c_describle }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="iconfont icon-tuichu" circle @click="classDelete(scope.$index, scope.row)"/>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
  name: 'myClass',
  data () {
    return {
      classTable: []
    }
  },
  mounted () {
    // 查询我的课程
    const classList = {
      tableName: 'student_course',
      id: [],
      tableKey: 'p_id'
    }
    classList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'')
    this.$http('post', '/api/QueryData', classList).then((response) => {
      for (let i = 0; i < response[0].length; i++) {
        const classList = {
          tableName: 'course',
          id: [],
          tableKey: 'c_id'
        }
        classList.id.push('\'' + response[0][i].stu_class_id + '\'')
        this.$http('post', '/api/QueryData', classList).then((res) => {
          this.classTable.push(res[0][0])
        })
      }
    })
  },
  methods: {
    // 退出课程
    classDelete (index, row) {
      this.$confirm('此操作将退出该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.classTable.splice(index, 1)
        const deleteList = {
          tableName: 'student_course',
          id: '\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND stu_class_id = ' + '\'' + row.c_id + '\'',
          tableKey: 'p_id'
        }
        this.$http('post', '/api/DeleteData', deleteList).then((response) => {
          if (response === 200) {
            this.$message({
              showClose: true,
              message: '退出成功!',
              type: 'success',
              center: true,
              duration: 600
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
    }
  }
}
</script>

<style scoped>
  .table-a /deep/  .el-table,
  .el-table__expanded-cell {
    background-color: transparent !important;
  }

  /deep/ .el-table tr {
    background-color: #f8fdfe;
  }
</style>
