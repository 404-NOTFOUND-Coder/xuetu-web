<template>
  <div class="wrapper">
    <nav>
      <input
        type="radio"
        name="tab"
        v-for="(item, index) in navbarItem"
        :key="index"
        :id="item"
        :checked="currentIndex === index"
      />
      <!-- 注释："for" 属性可把 label 绑定到另外一个元素。请把 "for"
           属性的值设置为相关元素的 id 属性的值。 -->
      <label for="HomeView" class="HomeView" @click="routerTo('HomeView')">
        <a>
          <i class="el-icon-s-home" aria-hidden="true"></i>
          <span>
          首页
            </span>
        </a>
      </label>
      <label
        for="CourseCenter"
        class="CourseCenter"
        @click="routerTo('CourseCenter')">
        <a>
          <i class="el-icon-s-management" aria-hidden="true"></i>
          <span>
          课程中心
            </span>
        </a>
      </label>
      <label
        for="SolveProblem"
        class="SolveProblem"
        @click="routerTo('TalkCenter')">
        <a>
          <i class="el-icon-s-comment" aria-hidden="true"></i>
          <span>
          交流问答
            </span>
        </a>
      </label>
      <label for="OwnPage" class="OwnPage" @click="routerTo('OwnPage')">
        <a>
          <i class="el-icon-s-custom" aria-hidden="true"></i>
          <span>
          个人主页
            </span>
        </a>
      </label>
      <div class="tab"></div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'navBar',
  methods: {
    routerTo (routerPath) {
      this.$router.push({ path: routerPath })
    }
  },
  data () {
    return {
      currentIndex: 0,
      navbarItem: [
        'HomeView',
        'CourseCenter',
        'LiveCourse',
        'SolveProblem',
        'OwnPage'
      ]
    }
  },
  mounted () {
    // 首页动画跳转
    const path = this.$route.path
    switch (path) {
      case '/HomeView':
        this.currentIndex = 0
        break
      case '/CourseCenter':
        this.currentIndex = 1
        break
      case '/beginStudy':
        this.currentIndex = 1
        break
      case '/Finished':
        this.currentIndex = 1
        break
      case '/UnFinished':
        this.currentIndex = 1
        break
      case '/SubmitIng':
        this.currentIndex = 1
        break
      case '/Overdue':
        this.currentIndex = 1
        break
      case '/waiting':
        this.currentIndex = 1
        break
      case '/LiveCourse':
        this.currentIndex = 2
        break
      case '/SolveProblem':
        this.currentIndex = 3
        break
      case '/LiveCom':
        this.currentIndex = 3
        break
      case '/SkillCom':
        this.currentIndex = 3
        break
      case '/ClassDis':
        this.currentIndex = 3
        break
      case '/Front':
        this.currentIndex = 3
        break
      case '/After':
        this.currentIndex = 3
        break
      case '/WordsShare':
        this.currentIndex = 3
        break
      case '/Interview':
        this.currentIndex = 3
        break
      case '/OwnPage':
        this.currentIndex = 4
        break
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  /* 为元素设定的宽度和高度决定了元素的边框盒。
 就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
 通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。 */
  box-sizing: border-box;
}

body {
  /* 设置body高度为100%窗口高度 */
  height: 100vh;
  /* 弹性盒子布局,水平垂直居中,文字居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 属性规定元素中的文本的水平对齐方式。 */
  text-align: center;
  background: linear-gradient(200deg, #a8edea, #fed6e3);
}

.wrapper {
  /* 设置宽度为60%窗口高度 */
  width: 60vw;
  height: 60px;
  /* 设置以百分比计的行高： */
  line-height: 60px;
  background-color: #fff;
  margin-left: -80px;
  margin-top: 6px;
}

.wrapper nav {
  display: flex;
  /* 生成相对定位的元素，相对于其正常位置进行定位。
  因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。 */
  position: relative;
  width: 68%;
}

.wrapper nav label {
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 1;
  /* 鼠标放上变小手 */
  cursor: pointer;
  text-align: center;
  margin-bottom: -10px;
}
@media screen and (min-width: 2000px) {
  .wrapper nav[data-v-4d1d4ae8] {
    display: flex;
    position: relative;
    width: 54rem;
  }
}
@media screen and (max-width: 1226px) {
  a span{
    display: none;
  }
}

.wrapper nav label a {
  position: relative;
  z-index: -1;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  /* 没有文本装饰 */
  text-decoration: none;
}

.wrapper nav label a i {
  margin: 0px 0px;
}

.wrapper nav input {
  display: none;
}

.wrapper nav .tab {
  position: absolute;
  height: 80%;
  width: 20%;
  left: 3%;
  bottom: 0;
  /* 渐变背景 ,自左到右 */
  background: linear-gradient(to right, #a2efd8, #92e0ee);
  border-radius: 30px;
  /* 添加动画过渡.贝塞尔曲线 */
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper nav #HomeView:checked ~ label.HomeView a,
.wrapper nav #CourseCenter:checked ~ label.CourseCenter a,
.wrapper nav #LiveCourse:checked ~ label.LiveCourse a,
.wrapper nav #SolveProblem:checked ~ label.SolveProblem a,
.wrapper nav #OwnPage:checked ~ label.OwnPage a {
  color: #fff;
  /* 这里字体颜色改变需要加个动画过渡 */
  transition: 0.2s;
}

.wrapper nav #CourseCenter:checked ~ .tab {
  left: 28%;
}

.wrapper nav #LiveCourse:checked ~ .tab {
  left: 40%;
}

.wrapper nav #SolveProblem:checked ~ .tab {
  left: 53%;
}

.wrapper nav #OwnPage:checked ~ .tab {
  left: 78%;
}

.el-icon-s-home {
  color: #f39161
}

.el-icon-s-management {
  color: #0e55b9
}

.el-icon-s-order {
  color: #f47484
}

.el-icon-s-comment {
  color: #41b07d
}

.el-icon-s-custom {
  color: #2f475d
}
</style>
