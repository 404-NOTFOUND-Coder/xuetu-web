<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="收藏课程" name="1">
      <div class="table-a">
      <el-table
        :data="favoriteTable"
        style="width: 100%"
        height="300"
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
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="favoriteDelete(scope.$index, scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-collapse-item>
    <el-collapse-item title="收藏帖子" name="2">
      <template>
        <div class="table-a">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#f8fdfe' }"
          height="300">
          <el-table-column
            label="发贴时间"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
            width="400">
            <template slot-scope="scope">
                <el-tag style="margin-left: 15px" size="medium" v-for="(item,index) in scope.row.tip" :key="item.id">{{ scope.row.tip[index] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </template>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: 'favoriteContent',
  data () {
    return {
      activeName: '1',
      tableData: [],
      favoriteTable: [],
      tags: []
    }
  },
  mounted () {
    // 查询收藏课程
    const optionList = {
      tableName: 'course_option',
      id: [],
      tableKey: 'p_id'
    }
    optionList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'')
    this.$http('post', '/api/QueryData', optionList).then((response) => {
      for (let i = 0; i < response[0].length; i++) {
        const classList = {
          tableName: 'course',
          id: [],
          tableKey: 'c_id'
        }
        classList.id.push('\'' + response[0][i].c_id + '\'')
        this.$http('post', '/api/QueryData', classList).then((res) => {
          this.favoriteTable.push(res[0][0])
        })
      }
    })
    // 查询收藏帖子
    const queryList = {
      tableName: 'guest,guest_option',
      id: [],
      tableKey: 'guest_option.o_favorite'
    }
    queryList.id.push('\'' + '1' + '\'' + 'AND guest.G_id = guest_option.g_id')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      // 对话题标签切割后放入tags数组中
      for (let i = 0; i < response[0].length; i++) {
        this.tags[i] = response[0][i].tip.split(',')
        response[0][i].tip = this.tags[i]
      }
      this.tableData = response[0]
    })
    this.messageDialogVisible = true
  },
  methods: {
    // 删除收藏课程
    favoriteDelete (index, row) {
      this.$confirm('此操作将永久删除该收藏内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.favoriteTable.splice(index, 1)
        const favoriteList = {
          tableName: 'course_option',
          id: '\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND c_id = ' + '\'' + row.c_id + '\'',
          tableKey: 'p_id'
        }
        this.$http('post', '/api/DeleteData', favoriteList).then((response) => {
          if (response === 200) {
            this.$message({
              showClose: true,
              message: '删除成功!',
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
              message: '删除失败!',
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
    },
    // 删除收藏帖子
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该收藏内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        const favoriteList = {
          tableName: 'guest_option',
          id: '\'' + window.sessionStorage.getItem('uuid') + '\'' + 'AND id = ' + '\'' + row.id + '\'' + 'AND o_favorite =' + '\'' + '1' + '\'',
          tableKey: 'p_id'
        }
        this.$http('post', '/api/DeleteData', favoriteList).then((response) => {
          if (response === 200) {
            this.$message({
              showClose: true,
              message: '删除成功!',
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
              message: '删除失败!',
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
.table-a /deep/  .el-table, .el-collapse, .el-collapse-item,
.el-table__expanded-cell {
  background-color: transparent !important;
}
/deep/ .el-collapse-item__header {
  background-color: #f8fdfe;
}
/deep/ .el-table__body-wrapper {
  background-color: #f8fdfe;
}
/deep/ .el-collapse-item__content {
  background-color: #f8fdfe;
}
/deep/ .el-table tr {
  background-color: #f8fdfe;
}
</style>
