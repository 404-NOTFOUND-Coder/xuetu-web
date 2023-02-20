<template>
  <ul class="list">
    <li v-for="(item,i) in list" :key="item.id" class="list-item">
      <!--主要内容区-->
      <div class="all">
        <!--per 里面放置头像和用户名和日期-->
        <div class="pers">
          <div class="pic">
            <el-avatar slot="reference" :src="item.avatarurl"/>
          </div>
          <div class="name">
              <span>{{ item.name }}</span>
              <span>{{ item.createTime }}</span>
          </div>
        </div>
        <!--talk 里面放置链接标题-->
        <div class="talk">
          <div>
            <a @click="detail(item.id,item.name,item.p_id,'Detail')" class="bigTitle">{{item.title }}</a>
          </div>
          <div class="tag">
            <el-tag v-for="(value,index) in item.tips[i]" :key="value.id">{{item.tips[i][index]}}</el-tag>
          </div>
        </div>
        <!--rev 放置点赞评论收藏-->
        <div class="rev">
          <ul @click="detail(item.id,item.name,item.p_id,'Detail')">
            <li>
              <i class="iconfont icon-dianzan1"></i>
              <span>&nbsp;{{ item.liked }}&nbsp;点赞</span>
            </li>
            <li>
              <i class="el-icon-chat-line-square"></i>
              <span>&nbsp;{{ item.comment }}&nbsp;评论</span>
            </li>
            <li>
              <i class="el-icon-view"></i>
              <span>&nbsp;{{ item.watch }}&nbsp;浏览</span>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'problemSolve',
  data () {
    return {
      loading: false,
      list: [],
      tags: []
    }
  },
  mounted () {
    // 查询帖子列表内容
    const queryList = {
      tableName: 'guest,user',
      id: [],
      tableKey: 'user.id'
    }
    queryList.id.push('guest.p_id AND guest.type =' + '\'' + 'ynjd' + '\'')
    this.$http('post', '/api/QueryData', queryList).then((response) => {
      for (let i = 0; i < response[0].length; i++) {
        this.list.push({
          id: response[0][i].G_id,
          name: response[0][i].name,
          createTime: response[0][i].createtime,
          title: response[0][i].title,
          liked: response[0][i].liked,
          comment: response[0][i].comment,
          watch: response[0][i].watch,
          p_id: response[0][i].p_id,
          tips: response[0][i].tip,
          avatarurl: response[0][i].avatarurl
        })
      }
      // 对话题标签切割后放入tags数组中
      for (let i = 0; i < this.list.length; i++) {
        this.tags.push(this.list[i].tips.split(','))
        this.list[i].tips = this.tags
      }
      return this.list
    })
  },
  methods: {
    // 点击跳转到评论详情界面 在sessionStorage中存储发帖人姓名id帖子id
    detail (id, name, pid, routerPath) {
      window.sessionStorage.setItem('g_id', id)
      window.sessionStorage.setItem('postname', name)
      window.sessionStorage.setItem('p_id', pid)
      // 浏览量+1
      const watchList = {
        tableName: 'guest',
        id: [],
        tableKey: 'G_id'
      }
      watchList.id.push('\'' + window.sessionStorage.getItem('g_id') + '\'')
      this.$http('post', '/api/QueryData', watchList).then((response) => {
        let watchNum = 0
        if (response[0][0].watch === '' || response[0][0].watch === undefined) {
          watchNum = (watchNum + 1).toString()
        } else {
          watchNum = (parseInt(response[0][0].watch) + 1).toString()
        }
        const list = {
          header: [{
            tableName: 'guest',
            id: window.sessionStorage.getItem('g_id'),
            tableKey: 'G_id'
          }],
          content: [{
            G_id: window.sessionStorage.getItem('g_id'),
            watch: watchNum
          }]
        }
        this.$http('post', '/api/UpdateData', list)
      })
      this.$router.push({ path: routerPath })
    }
  }
}
</script>
<style scoped>
.el-main {
  background-color: rgb(253, 253, 254);
  color: #333;
  text-align: center;
  height: 1000px;
}

.all {
  height: auto;
  width: 90%;
  margin-left: 50px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  margin-top: 25px
}

.all .pers {
  display: flex;
  margin-left: 50px;
  height: 50px
}

.all .pers .name, .all .pers .pic {
  width: 120px;
  margin-top: 23px;
}

.all .pers .pic {
  height: 20px;
  margin-left: -30px;
}

.all .pers .name span {
  height: inherit;
  display: block;
  font-size: 12px;
  text-align: left;
}

.all .pers .name span:nth-child(1) {
  font-size: 24px;
  margin-top: 3px;
}

.talk div {
  font-size: 50px;
  display: flex;
  margin-top: 50px;
  margin-left: 50px;
}

.talk div a:hover, .name a:hover {
  cursor: pointer;
  text-decoration: none;
  color: #3967FF;
}

.talk .tag {
  margin-top: 40px;
  margin-left: 30px;
}

.talk .tag .el-tag {
  margin-left: 20px;
  font-size: 16px;
}

.el-tag:nth-child(1) {
  margin-left: 0px;
}

.all .rev {
  height: 58px;
  display: flex;
}

.all .rev ul {
  display: flex;
  margin-top: 19px;
  margin-left: 30px;
}

.rev{
  cursor: pointer;
}

.rev ul li {
  list-style: none;
  width: 100px;
}

.rev .el-button {
  margin-left: auto;
  margin-right: 20px;
  margin-top: 11px;
  height: 40px;
}

.iconfont, .el-icon-chat-line-square, .el-icon-view {
  cursor: pointer;
  color: #a71d5d;
}

.list .list-item .all {
  background-color: white;
}

.talk div {
  margin-top: 40px;
}

.tag .el-tag:hover {
  cursor: pointer;
}

  .bigTitle{
    line-height:68px;
    text-align: left;
    white-space: pre-wrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 30px;
  }
</style>
