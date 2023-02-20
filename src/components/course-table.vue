<template>
  <el-table :data="homeworkTable" height="430" :header-cell-style="{background:'#f8fdfe'}">
    <el-table-column prop="name" label="用户名称"/>
    <el-table-column prop="page_id" label="作业章节"/>
    <el-table-column prop="createTime" label="完成时间"/>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag type="danger" v-show="scope.row.status === '0'">未完成</el-tag>
        <el-tag type="success" v-show="scope.row.status === '1'">已完成</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'courseTable',
  props: ['sector'],
  data () {
    return {
      homeworkTable: [],
      stuList: []
    }
  },
  mounted () {
    // 查询本课程所有学生名单
    const classList = {
      tableName: 'student_course',
      id: [],
      tableKey: 'stu_class_id'
    }
    classList.id.push('\'' + window.sessionStorage.getItem('c_id') + '\'')
    this.$http('post', '/api/QueryData', classList).then((response) => {
      for (let i = 0; i < response[0].length; i++) {
        this.stuList.push({ createTime: null, name: response[0][i].username, page_id: this.sector, status: '0' })
      }
    })
    // 查询已经完成作业的名单
    const HomeworkList = {
      tableName: 'course_homework',
      id: [],
      tableKey: 'c_id'
    }
    HomeworkList.id.push('\'' + window.sessionStorage.getItem('c_id') + '\'' + 'AND page_id = ' + '\'' + this.sector + '\'')
    this.$http('post', '/api/QueryData', HomeworkList).then((response) => {
      this.stuList = this.stuList.concat(response[0])
      this.homeworkTable = this.stuList
      const map = {}; const dest = []
      for (let i = 0; i < this.stuList.length; i++) {
        const ai = this.stuList[i]
        if (!map[ai.name]) {
          dest.push({ createTime: ai.createTime, name: ai.name, page_id: this.sector, status: ai.status })
          map[ai.name] = ai
        } else {
          for (let j = 0; j < dest.length; j++) {
            const dj = dest[j]
            if (dj.name === ai.name) {
              dj.status = '1'
              dj.createTime = ai.createTime
              break
            }
          }
        }
      }
      this.homeworkTable = dest
    })
  }
}
</script>

<style scoped>

</style>
