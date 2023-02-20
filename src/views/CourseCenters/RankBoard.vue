<template>
  <el-table :data="tableData" :row-class-name="tableRowClassName"
            style="width: 57%;border-radius: 18px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-left: 288px">
    <el-table-column prop="username" label="用户名" width="180"/>
    <el-table-column prop="studyTime" label="学习时长" width="180"/>
    <el-table-column prop="rank" label="学习排名" width="120"/>
    <el-table-column prop="reward" label=""/>
  </el-table>
</template>
<style>
.el-table .top-row {
  background: #eb16169e;
}

.el-table .second-row {
  background: rgba(157, 229, 241, 0.99);
}

.el-table .third-row {
  background: rgba(229, 213, 133, 0.88);
}
</style>
<script>
export default {
  studyTime: 'rankBoard',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    // 查询学生-课程表
    const queryList = {
      tableName: 'student_course',
      id: [],
      tableKey: 'stu_class_id'
    }
    queryList.id.push('\'' + window.sessionStorage.getItem('c_id') + '\'' + 'ORDER BY studyTime desc')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      const rankList = []
      for (let i = 0; i < response[0].length; i++) {
        rankList.push({
          username: response[0][i].username,
          studyTime: response[0][i].studyTime + '学时',
          rank: 'No.' + (i + 1)
        })
      }
      this.tableData = rankList
    })
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      console.log(rowIndex)
      if (rowIndex === 0) {
        row.reward = '🥇'
        return 'top-row'
      } else if (rowIndex === 1) {
        row.reward = '🥈'
        return 'second-row'
      } else if (rowIndex === 2) {
        row.reward = '🥉'
        return 'third-row'
      }
      return ''
    }
  }
}
</script>

<style scoped>
/deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border-right: none;
  text-align: center;
}

tbody tr:nth-child(1) {
  background-color: rgba(246, 125, 125, 0.99);
}

tbody tr:nth-child(2) {

}

tbody tr:nth-child(3) {

}

</style>
