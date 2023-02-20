<template>
  <el-container>
    <el-header height="200px">
      <el-button class="butn" type="primary" @click="showClass" round style="border-radius: 14px;">
        <i class="el-icon-s-promotion" style="color: #fbf8f8;font-size: 17px;"></i>
        一键定制学习计划
      </el-button>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="outer grid-content bg-purple">
            <div class="toper">
              <i class="iconfont icon-tubiao-zhuzhuangtu"
                 style="color: rgba(57,103,255,0.71);font-size: 51px;line-height: 78px"></i>
              <h1 style="font-weight: bold;">月度计划</h1>
            </div>
            <div class="mainer">
              <p style="font-size: 12px;width: 123px;margin: 0 auto;color: #80808075;line-height: 17px;">
                根据个人情况，定制一个月的初体验学习计划</p>
            </div>
            <div class="foot" style="border-top: 1px solid #7092ff;">
              <el-row :gutter="20" style="margin: 5px auto;width: 90%;display: flex;justify-content: space-around;">
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-21-tongzhigonggao"
                       style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">定时提醒</p>
                  </div>
                </el-col>
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-35-wodericheng" style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">课程排表</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="width: 90%;margin: 0px auto;display: flex;justify-content: space-around;">
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-huangguan" style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">尊贵身份</p>
                  </div>
                </el-col>
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-28-yinhuanzhenggaitixing"
                       style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">课程推荐</p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-button class="btn" type="primary" @click="showClass" round>立即定制</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="outer grid-content bg-purple">
            <div class="toper">
              <i class="iconfont icon-tubiao-zhuzhuangtu"
                 style="color: rgba(133, 91, 251, 0.65);font-size: 51px;line-height: 78px"></i>
              <h1 style="font-weight: bold;">季度计划</h1>
            </div>
            <div class="mainer">
              <p style="font-size: 12px;width: 123px;margin: 0 auto;color: #80808075;line-height: 17px;">
                根据个人情况，定制一个季度的短期学习计划</p>
            </div>
            <div class="foot" style="border-top: 1px solid rgba(133, 91, 251, 0.65)">
              <el-row :gutter="20" style="margin: 5px auto;;width: 90%;display: flex;justify-content: space-around;">
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-21-tongzhigonggao"
                       style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">定时提醒</p>
                  </div>
                </el-col>
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-35-wodericheng" style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">课程排表</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="width: 90%;margin: 0px auto;display: flex;justify-content: space-around;">
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-huangguan" style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">尊贵身份</p>
                  </div>
                </el-col>
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-28-yinhuanzhenggaitixing"
                       style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">课程推荐</p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-button class="btn" type="success" @click="showClass" round>立即定制</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="outer grid-content bg-purple">
            <div class="toper">
              <i class="iconfont icon-tubiao-zhuzhuangtu"
                 style="color: rgba(248, 15, 15, 0.64);font-size: 51px;line-height: 78px"></i>
              <h1 style="font-weight: bold;">年度计划</h1>
            </div>
            <div class="mainer">
              <p style="font-size: 12px;width: 123px;margin: 0 auto;color: #80808075;line-height: 17px;">
                根据个人情况，定制一年的长期学习计划</p>
            </div>
            <div class="foot" style="border-top:1px solid rgba(248, 15, 15, 0.64)">
              <el-row :gutter="20" style="width: 90%;margin: 5px auto;display: flex;justify-content: space-around;">
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-21-tongzhigonggao"
                       style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">定时提醒</p>
                  </div>
                </el-col>
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-35-wodericheng" style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">课程排表</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="width: 90%;margin: 0px auto;display: flex;justify-content: space-around;">
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-huangguan" style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">尊贵身份</p>
                  </div>
                </el-col>
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-28-yinhuanzhenggaitixing"
                       style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">课程推荐</p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-button class="btn" type="danger" @click="showClass" round>立即定制</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="outer grid-content bg-purple">
            <div class="toper">
              <i class="iconfont icon-tubiao-zhuzhuangtu"
                 style="color: rgba(238, 226, 45, 0.84);font-size: 51px;line-height: 78px"></i>
              <h1 style="font-weight: bold;">终身计划</h1>
            </div>
            <div class="mainer">
              <p style="font-size: 12px;width: 123px;margin: 0 auto;color: #80808075;line-height: 17px;">
                根据个人情况，定制一人一份的终身学习计划</p>
            </div>
            <div class="foot" style="border-top:1px solid rgba(238, 226, 45, 0.84)">
              <el-row :gutter="20" style="margin: 5px auto;width: 90%;display: flex;justify-content: space-around;">
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-21-tongzhigonggao"
                       style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">定时提醒</p>
                  </div>
                </el-col>
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-35-wodericheng" style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">课程排表</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="width: 90%;margin: 0px auto;display: flex;justify-content: space-around;">
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-huangguan" style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">尊贵身份</p>
                  </div>
                </el-col>
                <el-col :span="6" style="width: 49%;line-height: 36px;">
                  <div class="grid-content bg-purple">
                    <i class="iconfont icon-a-28-yinhuanzhenggaitixing"
                       style="float: left;color: rgba(235, 155, 12, 0.48)"></i>
                    <p style="font-size: 12px">课程推荐</p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-button class="btn" type="warning" @click="showClass" round>立即定制</el-button>
            <el-dialog title="学 习 课 程 推 荐" :visible.sync="dialogTableVisible">
              <el-table :data="gridData">
                <el-table-column property="c_img" label="课程封面" width="200">
                  <template slot-scope="scope">
                    <img :src="scope.row.c_img" alt="" width="150" height="100">
                  </template>
                </el-table-column>
                <el-table-column property="c_name" label="课程名称" width="300"></el-table-column>
                <el-table-column property="c_describle" label="课程描述"></el-table-column>
              </el-table>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'liveCourse',
  data () {
    return {
      dialogTableVisible: false,
      gridData: []
    }
  },
  methods: {
    showClass () {
      const token = window.sessionStorage.getItem('uuid')
      const type = window.sessionStorage.getItem('type')
      if (type === '2' && token != null) {
        this.$http('post', '/api/recommend', { id: window.sessionStorage.getItem('uuid') }).then((response) => {
          const list = []
          for (let i = 0; i < response.length; i++) {
            // 查询用户点赞评论数量
            const queryList = {
              tableName: 'course',
              id: [],
              tableKey: 'c_id'
            }
            queryList.id.push('\'' + response[i].itemID + '\'')
            this.$http('post', '/api/QueryData', queryList).then((response) => {
              list.push(response[0][0])
            })
          }
          this.gridData = list
          this.dialogTableVisible = true
        })
      } else if (type === '1') {
        this.$message({
          message: '权限不足!',
          type: 'error',
          center: true,
          duration: 600
        })
      } else {
        this.$message({
          message: '用户未登录!',
          type: 'error',
          center: true,
          duration: 600
        })
      }
    }
  }
}

</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  background-image: url('../assets/img/sun.jpeg');
  background-size: cover;
  width: 97%;
  height: 200px;
  margin-left: 17px;
  border-radius: 10px;
  line-height: 313px;
}

.el-main {
  color: #333;
  text-align: center;
  height: auto;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.outer {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.row-bg {
  padding: 10px 0;
}

.foot {
  width: 77%;
  margin: 23px auto;
}

.toper {
  height: 118px;
}

.btn {
  margin-bottom: 11px;
  line-height: 9px;
  width: 117px;
}

.butn {
  background-color: #00d1ff;
  border: none;
}
</style>
