<template>
  <div>
    <!-- 订单详情 -->
    <el-dialog title="订 单 详 情" :visible.sync="DialogVisible" width="70%" height="60%" center>
      <el-descriptions :title="'订单编号:' + orderNumber" :column="2">
        <el-descriptions-item label="创建时间">{{ createTime }}</el-descriptions-item>
        <el-descriptions-item label="完成时间">{{ finishTime }}</el-descriptions-item>
        <el-descriptions-item label="支付价格" :contentStyle="{'color': 'red'}">{{ orderPrice+'元' }}</el-descriptions-item>
        <el-descriptions-item label="课程名称">{{ className }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <!-- 订单列表 -->
    <div class="table-a">
    <el-table :data="orderData" style="width: 100%" height="530" :header-cell-style="{ background: '#f8fdfe' }">
      <el-table-column label="订单编号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.out_trade_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付价格" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.total_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.gmt_create }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.gmt_payment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-more" circle
                     @click="moreDetail(scope.$index, scope.row)"/>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle
                     @click="deleteOrder(scope.$index, scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'orderManagement',
  data () {
    return {
      orderData: [],
      DialogVisible: false,
      orderNumber: '',
      orderPrice: '',
      createTime: '',
      finishTime: '',
      className: []
    }
  },
  mounted () {
    // 查询订单表
    const queryList = {
      tableName: 'orderlist',
      id: [],
      tableKey: 'buyer_id'
    }
    queryList.id.push('\'' + window.sessionStorage.getItem('uuid') + '\'')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      const orderList = []
      for (let i = 0; i < response[0].length; i++) {
        orderList.push(response[0][i])
        const classList = {
          tableName: 'course',
          id: [],
          tableKey: 'c_id'
        }
        classList.id.push('\'' + response[0][i].subject + '\'')
        this.$http('post', '/api/QueryData', classList).then((res) => {
          orderList[i].className = res[0][0].c_name
        })
      }
      this.orderData = orderList
    })
  },
  methods: {
    moreDetail (index, row) {
      this.DialogVisible = true
      this.orderNumber = row.out_trade_no
      this.orderPrice = row.total_amount
      this.createTime = row.gmt_create
      this.finishTime = row.gmt_payment
      this.className = row.className
    },
    deleteOrder (index, row) {
      this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.orderData.splice(index, 1)
        const orderList = {
          tableName: 'orderlist',
          id: '\'' + row.out_trade_no + '\'',
          tableKey: 'out_trade_no'
        }
        this.$http('post', '/api/DeleteData', orderList).then((response) => {
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
  .table-a /deep/  .el-table,
  .el-table__expanded-cell {
    background-color: transparent !important;
  }

  /deep/ .el-table tr {
    background-color: #f8fdfe;
  }
</style>
