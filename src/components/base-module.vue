<template>
  <div class="outer" style="margin-top: 29px">
    <div class="titles" style="display: flex;justify-content: space-between;">
    <ul>
      <li style="font-weight:bold;font-size:larger"><h1>课程来源</h1></li>
      <li v-for="i in fromurl" :key="i.index">
        <a :href="i.url">
          <img :src="i.img">
        </a>
      </li>
    </ul>
    </div>
    <div class="first" style="margin-top: 40px">
      <div class="toper borders">
        <i class="el-icon-video-camera-solid" style="font-size: 23px;color: rgba(13,83,232,0.66)"></i>
        <span style="font-weight: bold;margin-left: 8px;">最近直播</span>
      </div>
      <el-row :gutter="20">
        <div class="mainer">
          <el-col :span="6" v-for="i in first" :key="i.index">
            <div class="grid-content bg-purple">
              <img @click="goTo(i.index)" :src="i.img" alt="">
            </div>
            <div class="intro">
              <a @click="goTo(i.index)">
                <p>{{i.text1}}</p>
                <p>{{i.text2}}</p>
              </a>
            </div>
            <div class="link">
              <a @click="goTo(i.index)">{{ i.tag }}</a>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="second" style="margin-top: 81px;">
      <div class="top">
        <i class="el-icon-upload" style="font-size: 23px;color: rgb(215,8,159)"></i>
        <span style="font-weight: bold;margin-left: 8px">IT 互联网</span>
      </div>
      <el-row :gutter="20">
        <div class="mainer">
          <el-col :span="6" v-for="i in second" :key="i.index">
            <div class="grid-content bg-purple">
              <img @click="goTo(i.index)" :src="i.img" alt="">
            </div>
            <div class="intro">
            <a @click="goTo(i.index)">
              <p>{{ i.text1 }}</p>
              <p>{{ i.text2 }}</p>
            </a>
            </div>
            <div class="link">
              <a @click="goTo(i.index)">{{ i.tag }}</a>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="third" style="margin-top: 18px">
      <div class="top">
        <i class="el-icon-s-opportunity" style="font-size: 23px;color: red"></i>
        <span style="font-weight: bold;margin-left: 8px">创业·设计</span>
      </div>
      <el-row :gutter="20">
        <div class="mainer">
          <el-col :span="6" v-for="i in third" :key="i.index">
            <div class="grid-content bg-purple">
              <img @click="goTo(i.index)" :src="i.img" alt="">
            </div>
            <div class="intro">
              <a  @click="goTo(i.index)">
                <p>{{i.text1}}</p>
                <p>{{i.text2}}</p>
              </a>
            </div>
            <div class="link">
              <a @click="goTo(i.index)">{{ i.tag }}</a>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="forth" style="margin-top: 18px">
      <div class="top">
        <i class="iconfont icon-a-21-tongzhigonggao" style="font-size: 23px;color: rgba(92,227,47,0.76)"></i>
        <span style="font-weight: bold;margin-left: 8px">电商·营销</span>
      </div>
      <el-row :gutter="20">
        <div class="mainer">
          <el-col :span="6" v-for="i in forth" :key="i.index">
            <div class="grid-content bg-purple">
              <img @click="goTo(i.index)" :src="i.img" alt="">
            </div>
            <div class="intro">
              <a  @click="goTo(i.index)">
                <p>{{i.text1}}</p>
                <p>{{i.text2}}</p>
              </a>
            </div>
            <div class="link">
              <a @click="goTo(i.index)">{{ i.tag }}</a>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="fifth" style="margin-top: 18px">
      <div class="top">
        <i class="iconfont icon-huo" style="font-size: 23px;color: rgb(243,133,9)"></i>
        <span style="font-weight: bold;margin-left: 8px">职业·考证</span>
      </div>
      <el-row :gutter="20">
        <div class="mainer">
          <el-col :span="6" v-for="i in fifth" :key="i.index">
            <div class="grid-content bg-purple">
              <img @click="goTo(i.index)" :src="i.img" alt="">
            </div>
            <div class="intro">
              <a  @click="goTo(i.index)">
                <p>{{i.text1}}</p>
                <p>{{i.text2}}</p>
              </a>
            </div>
            <div class="link">
              <a @click="goTo(i.index)">{{ i.tag }}</a>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModuleItem',
  data () {
    return {
      fromurl: [
        { url: 'https://www.bilibili.com/', img: require('../assets/img/ad1.png') },
        { url: 'https://le.ouchn.cn/home', img: require('../assets/img/ad2.png') },
        { url: 'https://study.163.com/', img: require('../assets/img/title1.png') },
        { url: 'http://www.ouchn.edu.cn/', img: require('../assets/img/ad3.png') },
        { url: 'https://rjt.softtone.cn/index', img: require('../assets/img/ad4.png') }
      ],
      first: [
        {
          img: require('../assets/img/img15.webp'),
          index: '100',
          text1: '【教资考试】',
          text2: '手把手勾重点，一个月背完不再话下',
          tag: '网易云平台'
        },
        {
          img: require('../assets/img/cook.jpeg'),
          index: '101',
          text1: '【烹饪课】',
          text2: '开课啦',
          tag: '网易云平台'
        },
        {
          img: require('../assets/img/dance.jpeg'),
          index: '102',
          text1: '【少儿爵士】',
          text2: '老师在线指导',
          tag: '得到'
        },
        {
          img: require('../assets/img/produce.jpeg'),
          index: '103',
          text1: '【直播教程】',
          text2: '老师在线指导',
          tag: '终身教育平台'
        }
      ],
      second: [
        {
          img: require('../assets/img/img2.webp'),
          text1: '【全套零基础软件测试开发教程】',
          text2: '小白入门到入职大厂！Python自动化测试全栈教程!',
          tag: '哔哩哔哩',
          index: '200'
        },
        {
          img: require('../assets/img/img3.webp'),
          text1: '【JavaScript基础语法】',
          text2: '黑马pink老师前端入门基础视频教程(500多集)持续',
          tag: '哔哩哔哩',
          index: '201'
        },
        {
          img: require('../assets/img/img4.webp'),
          text1: '【建议收藏】',
          text2: 'Java后端开发详细学习路线视频教程,按这个学，找工作没问题',
          tag: '哔哩哔哩',
          index: '202'
        },
        {
          img: require('../assets/img/img5.webp'),
          text1: '【千锋】网络安全',
          text2: '网络安全基础入门到精通,300集全套视频教程',
          tag: '哔哩哔哩',
          index: '203'
        }
      ],
      third: [
        {
          img: require('../assets/img/img10webp.webp'),
          index: '300',
          text1: '【i-top H5创新实践】',
          text2: '创新性项目，提前获取',
          tag: '哔哩哔哩'
        },
        {
          img: require('../assets/img/img11.webp'),
          index: '301',
          text1: '【大学开课啦】',
          text2: '创新创业课程等你来学',
          tag: '得到'
        },
        {
          img: require('../assets/img/img12.webp'),
          index: '302',
          text1: '【真格北大创业课】',
          text2: '国家发展研究院联合举办',
          tag: '得到'
        },
        {
          img: require('../assets/img/img13.webp'),
          index: '303',
          text1: '【斯坦福大学】',
          text2: 'YC创业课等你来战',
          tag: '得到'
        }
      ],
      forth: [
        {
          img: require('../assets/img/img6.webp'),
          index: '400',
          text1: '【直播电商入门手册】',
          text2: ' 直播营销全流程讲解,带你了解直播带货的秘密',
          tag: '网易云平台'
        },
        {
          img: require('../assets/img/img7.webp'),
          index: '401',
          text1: '【 直播带货】',
          text2: '让你分分钟卖出货品',
          tag: '网易云平台'
        },
        {
          img: require('../assets/img/img8.webp'),
          index: '402',
          text1: '【数字化时代】',
          text2: '教你玩转数字分析,成功运营产品',
          tag: '网易云平台'
        },
        {
          img: require('../assets/img/img9.webp'),
          index: '403',
          text1: '【国际企业】',
          text2: '遭遇流量低谷？教你一招反弹',
          tag: '网易云平台'
        }
      ],
      fifth: [
        {
          img: require('../assets/img/img14.webp'),
          index: '500',
          text1: '【2022会计学】',
          text2: '备考必选，精选讲课班等你来学',
          tag: '终身教育平台'
        },
        {
          img: require('../assets/img/img15.webp'),
          index: '501',
          text1: '【教资笔试】',
          text2: '手把手勾重点，一个月背完不再话下',
          tag: '网易云平台'
        },
        {
          img: require('../assets/img/img16.webp'),
          index: '502',
          text1: '【考公】',
          text2: '推理性试题，系统分析',
          tag: '终身教育平台'
        },
        {
          img: require('../assets/img/img17.webp'),
          index: '503',
          text1: '【考研高数】',
          text2: '0基础起教，跟着学，没有学不会的',
          tag: '终身教育平台'
        }
      ]
    }
  },
  methods: {
    goTo (index) {
      window.sessionStorage.setItem('c_id', index)
      this.$router.push({ path: '/beginStudy' })
    }
  }
}
</script>

<style scoped>

.outer .top{
  height: 32px;
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
  padding-left: 15px;
}
.outer .borders{
  text-align: left;
  margin-bottom: 12px;
  padding-left: 15px;
}
.top span:hover,.outer .borders span:hover{
  cursor: pointer;
}
.outer .borders span{
  line-height: 50px;
  margin-left: -5px;
  font-size: 20px;
}

.outer {
  height: 100%;
  width: 100%;
}

.outer > div {
  height: auto;
  width: 100%;
  bottom: 10px;
}
.outer .first{
  height: 300px;
}

.mainer{
  height: 300px;
  display: flex;
  justify-content: space-around;
}
.mainer .el-col[data-v-4efcbf08] {
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.12);
}
.el-Row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  height: auto;
}
.grid-content img{
  height: 150px;
  margin-top: 13px;
}
.el-col-6 {
  width: 23%;
}
.el-col-6:hover{
  border: 1.5px solid #62D8DC7E;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/*锚点设置*/
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
.third,.fifth{
  background-color: rgb(248,248,248);
}
img{
  cursor: pointer;
  border-radius: 5px;
  height: 38px;
}
.intro{
  height: 93px;
  border-bottom: 1px solid #958a8a45;
}
.intro a{
  text-decoration: none;
  color: black;
}
.intro a p:nth-child(2){
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.intro a:hover{
  color: rgba(132, 200, 231, 0.99);
  cursor: pointer;
}
.link a{
  text-decoration: none;
  display: flex;
  color: cornflowerblue;
  margin-left: 20px;
  font-size: 14px;
}
.outer ul{
  border: 1px solid #8e8ea36b;
  background-color: #fff;
  height: 63px;
  display: flex;
  align-items: center;
  width: 96%;
  border-radius: 7px;
  margin-left: 30px;
}
ul li{
  width: 27%;
}
ul li:nth-child(6),ul li:nth-child(7){
  margin-top: 0.6%;
}
ul li:nth-child(3),ul li:nth-child(4){
  margin-top: 1%;
}
ul li:nth-child(5) img {
  margin-top: 4%;
}
ul li:nth-child(2) img {
  margin-top: 4%;
}
</style>
