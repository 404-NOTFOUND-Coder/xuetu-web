<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px" style="border-radius: 30px;height:auto;position: fixed">
      <div class="control">
        <div class="left">
          <div class="subNav">
            <div class="part1 part">
              <router-link to="/ProblemSolve">
                <i class="el-icon-question"/>
                <a href="#part1">疑难解答</a>
              </router-link>
            </div>
            <div class="part2 part">
              <router-link to="/LifeConnect">
                <i class="el-icon-video-camera-solid"/>
                <a href="#part2">生活交流</a>
              </router-link>
            </div>
            <div class="part3 part">
              <router-link to="/TechTalk">
                <i class="el-icon-info"/>
                <a href="#part3">技术交流</a>
              </router-link>
            </div>
            <div class="part4 part">
              <router-link to="/CourseDiscussion">
                <i class="el-icon-s-help"/>
                <a href="#part4">课程讨论</a>
              </router-link>
            </div>
          </div>
          <nav class="hot">
            <h4 style="font-size: 18px">
              <i class="el-icon-search"/>
              <span>热门词条</span>
            </h4>
            <ul class="hotList">
              <li>
                <router-link to="/WebPage">
                  <a href="#part5">#前端开发#</a>
                </router-link>
              </li>
              <li>
                <router-link to="/InterviewShare">
                  <a href="#part8">#面试技巧#</a>
                </router-link>
              </li>
              <li>
                <router-link to="/TeacherView">
                  <a href="#part8">#教资面试#</a>
                </router-link>
              </li>
              <li>
                <router-link to="/Electric">
                  <a href="#part8">#电商#</a>
                </router-link>
              </li>
              <li>
                <router-link to="/CourtDoc">
                  <a href="#part8">#法医#</a>
                </router-link>
              </li>
              <li>
                <router-link to="/Semantic">
                  <a href="#part8">#语义#</a>
                </router-link>
              </li>
              <li>
                <router-link to="/Tea">
                  <a href="#part8">#茶道#</a>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </el-aside>
    <!-- 中间部分 -->
    <el-container>
      <el-aside style="width: 60%;margin-left: 210px;border-radius: 30px">
        <el-header style="width: 100%;display: flex;flex-direction: row-reverse;">
          <el-button type="text" @click="submitTips"><i class="el-icon-plus"></i></el-button>
          <el-dialog title="发 布 帖 子" :visible.sync="dialogFormVisible" width="90%" style="font-weight: bolder">
            <el-form :model="form" :rules="formRules" ref="form">
              <el-form-item prop="title" label="发帖标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" placeholder="请输入1-30字内标题" autocomplete="off"></el-input>
              </el-form-item>
              <edit @message="parentEvent"></edit>
              <el-form-item prop="region" label="社区专栏" :label-width="formLabelWidth" style="margin-top: 10px;">
                <el-select v-model="form.region" placeholder="请选择社区" style="float: left">
                  <el-option label="疑难解答" value="ynjd"></el-option>
                  <el-option label="生活交流" value="shjl"></el-option>
                  <el-option label="技术交流" value="jsjl"></el-option>
                  <el-option label="课程讨论" value="kctl"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="dynamicTags" label="话题词条" :label-width="formLabelWidth">
                <el-tag
                  :key="tag"
                  v-for="tag in form.dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{ tag }}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false" :plain="true">取 消</el-button>
              <el-button type="primary" @click="submit">发 布</el-button>
            </div>
          </el-dialog>
        </el-header>
        <el-main style="background-color: #f9f9f9; width: 100%; height: 1382px">
          <router-view/>
        </el-main>
      </el-aside>
      <!-- 右侧标签栏 -->
      <div class="rightTitle">
        <img src="../assets/img/title.png" width="100%">
        <div class="titleStyle">
          <div>#网站推荐</div>
          <ul class="href1">
            <li v-for="item in list1" v-bind:key="item.index">
              <img :src="item.img" height="30px">
              <a :href="item.url">{{item.text}}</a>
            </li>
          </ul>
        </div>
        <div class="titleStyle">
          <div>#课程实践</div>
          <ul class="href2">
            <li v-for="item in list2" v-bind:key="item.index">
              <i :class="item.class" :style="item.style"></i>
              <a :href="item.url">{{item.text}}</a>
            </li>
          </ul>
        </div>
        <div class="titleStyle">
          <div>#分享发现</div>
          <ul class="href3">
            <li v-for="item in list3" v-bind:key="item.index">
              <i :class="item.class" :style="item.style"></i>
              <a :href="item.url">{{item.text}}</a>
            </li>
          </ul>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import Edit from '../components/base-edit'
import DateTools from '../utils/Datetools'
import Tools from '../utils/Tools'

export default {
  name: 'talkCenter',
  components: {
    Edit
  },
  inject: [
    'reload'
  ],
  data () {
    return {
      dialogFormVisible: false,
      form: {
        title: '',
        region: '',
        dynamicTags: [],
        content: ''
      },
      formLabelWidth: '120px',
      inputVisible: false,
      inputValue: '',
      formRules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }],
        region: [{
          required: true,
          message: '请选择社区专栏',
          trigger: 'change'
        }],
        dynamicTags: [{
          required: true,
          message: '请选择社区专栏',
          trigger: 'change'
        }]
      },
      list1: [
        {
          img: require('../assets/img/media.png'),
          url: 'https://gzt.guangzhitui.com/news.html?source=baidu&plan=xwqgjhPM&unit=hxcpt&keyword=meitiwangzhan&e_keywordid=188659856206&e_keywordid2=188659856206&bd_vid=7969845455013171934',
          text: '网络营销'
        },
        {
          img: require('../assets/img/dev.png'),
          url: 'https://gitee.com/zhang_banglong/vue-devtools',
          text: 'dev交流学习'
        },
        {
          img: require('../assets/img/ui.png'),
          url: 'https://gitee.com/zhang_banglong/vue-devtools',
          text: 'element ui组件库'
        },
        {
          img: require('../assets/img/dances.png'),
          url: 'http://v.chinadance.cn/',
          text: '舞蹈网站'
        },
        {
          img: require('../assets/img/cooks.png'),
          url: 'https://www.575727.com/',
          text: '烹饪课'
        }
      ],
      list2: [
        {
          class: 'iconfont icon-a-17-zaixianxuexi',
          style: 'color:#0014ff91;font-size: 25px',
          url: 'https://www.w3school.com.cn/',
          text: 'W3School技术教程'
        },
        {
          class: 'iconfont icon-a-18-wodeziliao',
          style: 'color:#e41aa085;font-size: 25px',
          url: 'https://ke.qq.com/course/4268861?quicklink=1#term_id=104430970',
          text: '营养烹饪'
        },
        {
          class: 'el-icon-lollipop',
          style: 'color:rgb(36 212 236);font-size: 25px',
          url: 'https://www.bilibili.com/video/BV1SJ411G7vu?spm_id_from=333.337.search-card.all.click',
          text: '爵士基本功'
        },
        {
          class: 'el-icon-s-flag',
          style: 'color:rgb(237 68 68);font-size: 25px',
          url: 'https://www.icourse163.org/',
          text: '中国大学 MOOC'
        },
        {
          class: 'el-icon-grape',
          style: 'color:rgb(94 36 236);font-size: 25px',
          url: 'https://www.zhihuishu.com/',
          text: '智慧树'
        }
      ],
      list3: [
        {
          class: 'el-icon-paperclip',
          style: 'font-size: 28px;color: #14ff3cb0',
          url: 'https://baijiahao.baidu.com/s?id=1735864315773780621&wfr=spider&for=pc',
          text: '2022高考数学'
        },
        {
          class: 'el-icon-paperclip',
          style: 'font-size: 28px;color: #14ff3cb0',
          url: 'https://toscode.gitee.com/bright-boy/bright-comment',
          text: 'bright-comment'
        },
        {
          class: 'el-icon-paperclip',
          style: 'font-size: 28px;color: #14ff3cb0',
          url: 'https://baijiahao.baidu.com/s?id=1674265559794998659&wfr=spider&for=pc',
          text: '美妆分享'
        },
        {
          class: 'el-icon-paperclip',
          style: 'font-size: 28px;color: #14ff3cb0',
          url: 'https://baike.baidu.com/item/%E5%B7%A5%E7%A8%8B%E9%80%A0%E4%BB%B7/24495959?fr=aladdin',
          text: '工程造价是什么'
        },
        {
          class: 'el-icon-paperclip',
          style: 'font-size: 28px;color: #14ff3cb0',
          url: 'https://baijiahao.baidu.com/s?id=1732530529529253848&wfr=spider&for=pc',
          text: '共青团成立100周年'
        },
        {
          class: 'el-icon-paperclip',
          style: 'font-size: 28px;color: #14ff3cb0',
          url: 'https://baijiahao.baidu.com/s?id=1704942341021321571&wfr=spider&for=pc',
          text: '学历可以决定什么'
        }
      ]
    }
  },
  methods: {
    parentEvent (data) {
      this.form.content = data.replace(/<[^>]+>/g, '')
    },
    handleClose (tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.form.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 点击发帖按钮判断用户是否登录
    submitTips () {
      if (window.sessionStorage.getItem('uuid') == null) {
        this.$message({
          showClose: true,
          message: '请先登录!',
          type: 'error',
          center: true,
          duration: 600
        })
      } else {
        this.dialogFormVisible = true
      }
    },
    // 发帖
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const list = {
            header: [{
              tableName: 'guest',
              id: Tools.getUUID(),
              tableKey: 'G_id'
            }],
            content: [{
              G_id: Tools.getUUID(),
              title: this.form.title,
              type: this.form.region,
              G_context: this.form.content,
              tip: this.form.dynamicTags.toString(),
              liked: '0',
              comment: '0',
              watch: '0',
              createtime: DateTools.getDate(),
              p_id: window.sessionStorage.getItem('uuid'),
              avatarurl: window.sessionStorage.getItem('avatarurl'),
              p_url: 'http://rdrqjc56z.hn-bkt.clouddn.com/5.jpg'
            }]
          }
          this.$http('post', '/api/UpdateData', list).then(response => {
            if (response === 200) {
              this.$message({
                showClose: true,
                message: '发帖成功!',
                type: 'success',
                center: true,
                duration: 600
              })
              this.$refs.form.resetFields()
              this.dialogFormVisible = false
              this.reload()
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
                message: '发帖失败!',
                type: 'warning',
                center: true,
                duration: 600
              })
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '请输入内容!',
            type: 'error',
            center: true,
            duration: 600
          })
        }
      })
    }
  }
}

</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.el-form-item__label {
  text-align: left
}

/deep/ .el-form-item__content {
  display: flex;
  margin-left: 111px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.button-new-tag[data-v-313af55b] {
  margin-left: 0px;
}

.el-header {
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-icon-plus {
  font-weight: bolder;
  font-size: 30px;
  line-height: 60px;
  color: #63a35c;
}

.el-icon-plus:hover {
  cursor: pointer;
}

.title {
  display: flex;
}

.title li {
  list-style: none;
  width: 100px;
}

.title li a {
  font-size: 20px;
}

.title li a:hover {
  text-decoration: none;
  font-weight: bolder;
  cursor: pointer;
  color: rgb(59, 73, 222);
}

* {
  padding: 0;
  margin: 0;
}

body {
  background: #eeeeee;
}

.control {
  height: auto;
  margin: 0 auto;
}

.left {
  width: 200px;
  display: inline-block;
  vertical-align: top;
}

.subNav, .hotList {
  height: auto;
  background-color: rgba(238, 238, 238, .5);
  padding: 10px;
  width: 180px;
}

h4 {
  display: flex;
  font-weight: bolder;
  background-color: rgba(238, 238, 238, .5)
}

h4 i {
  margin-left: 10px;
  margin-top: 5px;
  color: #63cece;
}

h4 span {
  margin-left: 8px;
}

.part, .hotList li {
  text-align: left;
  line-height: 40px;
  border-radius: 5px;
  color: #424242;
}

a {
  text-decoration: none;
  color: black;
}

.part a {
  margin-left: 10px;
}

.href1, .href2, .href3 {
  margin-top: 10px;
}

.href1 li, .href2 li, .href3 li {
  margin-top: 20px;
  margin-left: 57px;
  display: flex;
}

.href1 li:nth-child(1), .href2 li:nth-child(1), .href3 li:nth-child(1) {
  margin-top: 0px;
}

.href1 li a, .href2 li a, .href3 li a {
  margin-left: 6px;
  font-style: oblique;
  font-family: cursive -webkit-body;
}

.part a:hover, .hotList li a:hover, .titleStyle li a:hover {
  text-decoration: underline;
  color: rgb(59, 73, 222);
}

.part:hover, .hotList li:hover {
  background: rgba(163, 160, 246, .2);
  cursor: pointer;
  text-decoration: none;
}

.part4 {
  border: none;
}

.el-main {
  background-color: rgb(253, 253, 254);
  color: #333;
  text-align: center;
  height: 1000px;
}

.hotList li a {
  margin-left: 13px;
}

.search {
  height: 39px;
  margin-top: 12px;
  width: 109px;
  background-color: #80eaed87;
  border-radius: 20px;
  border: 0px;
  font-size: 20px;
}

.search:hover {
  cursor: pointer;
}

/* 设置右侧标签的样式*/
.rightTitle {
  height: 100%;
  margin-left: 18px;
  width: 100%
}

.rightTitle div {
  margin-top: 20px;
}

.rightTitle div:nth-child(1) {
  margin-top: 0px;
}

.titleStyle {
  border-radius: 30px;
  height: auto;
  background-color: #f9f9f9;
}

.titleStyle > div {
  font-weight: bold;
  font-size: 20px
}

.el-icon-question {
  color: #a71d5d;
  font-size: 18px
}

.el-icon-video-camera-solid {
  color: #0077aa;
  font-size: 18px
}

.el-icon-info {
  color: #09a62d;
  font-size: 18px
}

.el-icon-s-help {
  color: #e8e265;
  font-size: 18px
}
</style>
