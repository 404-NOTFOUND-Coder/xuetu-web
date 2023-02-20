<template>
  <div class="footer-related">
    <div class="top">
      <span>网站试运行中，推荐使用Chrome等浏览器</span>
    </div>
    <ul>
      <li>地址：重庆邮电大学综合实验楼</li>
      <li>820-820-8820</li>
      <li>重庆邮电大学学了么团队版权所有</li>
      <li>重庆南岸</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'footerPage'
}
</script>
<style scoped>
.footer-related{
  color: #fff;
}
.footer-related :hover{
  color:#ffd04b;
  cursor:default
}
.top {
  margin-top: 30px;
}

.top span {
  font-size: 18px;
}

ul {
  text-align: center;
  margin-top: 45px;
}

li {
  list-style: none;
  display: inline;
  font-size: 14px;
  margin-left: 30px;
}
</style>
