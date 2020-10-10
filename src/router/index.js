import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/demo1/HelloWorld'
import Index from '@/components/Index'
import Demo2 from "@/components/demo2/Helloworld"
import Demo3 from "@/components/demo3/HelloworldPro"
import Demo4 from "@/components/demo4/Helloworld"
import Demo5 from "@/components/demo5/index.vue"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: "",
          name: "HelloWorld",
          component: HelloWorld
        },
        {
          path: "/demo2",
          name: "Demo2",
          component: Demo2
        }, {
          path: "/demo3",
          name: "Demo3",
          component: Demo3
        },
        {
          path: "/demo4",
          name: "Demo4",
          component: Demo4
        },
        {
          path: "/demo5",
          name: "Demo5",
          component: Demo5
        },
        {
          path:"/events",
          name:"Events",
          component:()=>import("@/components/events")
        }

      ]
    }
  ]
})
