<template>
    <el-main>
      <el-tabs tab-position="left">
        <el-tab-pane v-for="i in sectorList" :key="i.id" :label="i.label">
          <div v-show="isType" class="table-a">
            <CourseTable v-bind:sector="i.label"/>
          </div>
          <div v-show="isStudent">
            <courseTemplate v-bind:sector="i.label"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
</template>
<script>
import courseTemplate from '../../components/course-template'
import CourseTable from '../../components/course-table'
export default {
  name: 'homeworkManage',
  components: {
    CourseTable,
    courseTemplate
  },
  data () {
    return {
      sectorList: [
        { label: '第一章' },
        { label: '第二章' },
        { label: '第三章' },
        { label: '第四章' },
        { label: '第五章' }
      ],
      isStudent: false,
      isType: false,
      status: 0
    }
  },
  mounted () {
    const userType = window.sessionStorage.getItem('type')
    this.isType = userType === '1'
    this.isStudent = userType === '2'
  },
  methods: {}
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
