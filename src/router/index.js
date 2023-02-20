import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
import HomePage from '../views/HomePage.vue'
import ForgetPassword from '../views/ForgetPassword'

// 二级路由
import HomeView from '../views/HomeView'
import CourseCenter from '../views/CourseCenter'
import LiveCourse from '../views/LiveCourse'
import TalkCenter from '../views/TalkCenter'
import OwnPage from '../views/OwnPage'
import beginStudy from '../views/CourseCenters/CoursePage'

// 三级路由
import ProblemSolve from '../views/TalkCenterRight/ProblemSolve'
import CourseDiscussion from '../views/TalkCenterRight/CourseDiscussion'
import TechTalk from '../views/TalkCenterRight/TechTalk'
import LifeConnect from '../views/TalkCenterRight/LifeConnect'
import Detail from '../views/TalkCenterRight/Detail'
import WebPage from '../views/TalkCenterRight/WebPage'
import InterviewShare from '../views/TalkCenterRight/InterviewShare'
import StudyClassroom from '@/views/CourseCenters/StudyClassroom'
import studyResource from '@/views/CourseCenters/StudyResource'
import HomeworkManage from '@/views/CourseCenters/HomeworkManage'
import NoticeBar from '@/views/CourseCenters/NoticeBar'
import RankBoard from '@/views/CourseCenters/RankBoard'
import TeacherView from '@/views/TalkCenterRight/TeacherView'
import CourtDoc from '@/views/TalkCenterRight/CourtDoc'
import Electric from '@/views/TalkCenterRight/Electric'
import Semantic from '@/views/TalkCenterRight/Semantic'
import Tea from '@/views/TalkCenterRight/Tea'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    redirect: '/HomeView',
    children: [
      {
        path: '/HomeView',
        name: 'HomeView',
        component: HomeView
      },
      {
        path: '/CourseCenter',
        name: 'CourseCenter',
        component: CourseCenter
      },
      {
        path: '/LiveCourse',
        name: 'LiveCourse',
        component: LiveCourse
      },
      {
        path: '/Detail',
        name: 'Detail',
        component: Detail
      },
      {
        path: '/beginStudy',
        name: 'beginStudy',
        component: beginStudy,
        redirect: '/StudyClassroom',
        children: [
          {
            path: '/StudyClassroom',
            name: 'StudyClassroom',
            component: StudyClassroom
          },
          {
            path: '/studyResource',
            name: 'studyResource',
            component: studyResource
          },
          {
            path: '/HomeworkManage',
            name: 'HomeworkManage',
            component: HomeworkManage
          },
          {
            path: '/NoticeBar',
            name: 'NoticeBar',
            component: NoticeBar
          },
          {
            path: '/RankBoard',
            name: 'RankBoard',
            component: RankBoard
          }
        ]
      },
      {
        path: '/TalkCenter',
        name: 'TalkCenter',
        redirect: '/ProblemSolve',
        component: TalkCenter,
        children: [
          {
            path: '/ProblemSolve',
            name: 'ProblemSolve',
            component: ProblemSolve
          },
          {
            path: '/CourseDiscussion',
            name: 'CourseDiscussion',
            component: CourseDiscussion
          },
          {
            path: '/TechTalk',
            name: 'TechTalk',
            component: TechTalk
          },
          {
            path: '/LifeConnect',
            name: 'LifeConnect',
            component: LifeConnect
          },
          {
            path: '/WebPage',
            name: 'WebPage',
            component: WebPage
          },
          {
            path: '/InterviewShare',
            name: 'InterviewShare',
            component: InterviewShare
          },
          {
            path: '/TeacherView',
            name: 'TeacherView',
            component: TeacherView
          },
          {
            path: '/Electric',
            name: 'Electric',
            component: Electric
          },
          {
            path: '/CourtDoc',
            name: 'CourtDoc',
            component: CourtDoc
          },
          {
            path: '/Semantic',
            name: 'Semantic',
            component: Semantic
          },
          {
            path: '/Tea',
            name: 'Tea',
            component: Tea
          }
        ]
      },
      {
        path: '/OwnPage',
        name: 'OwnPage',
        component: OwnPage
      }
    ]
  },
  {
    path: '/ForgetPassword',
    name: ForgetPassword,
    component: ForgetPassword
  }
]

const router = new VueRouter({
  routes
})
export default router
