<template>
    <el-container class="home-container">
      <el-header>
          <div>
              <img src="../assets/sxdx.png" alt="">
              <span>CRM客户管理系统</span>
          </div>
          <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
          <!-- 侧边栏菜单区域 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 实现左边栏的折叠 -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
            <!-- 二级菜单按钮颜色 active-text-color="#409eff" -->
            <el-menu  background-color="#333744" text-color="#fff" active-text-color="#409eff" :unique-opened="true"
            :collapse="isCollapse" :collapse-transition="false" :router="true"
            :default-active="activePath">
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                <!-- 一级菜单模板区域 -->
                <template slot="title">
                    <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
                @click="saveNavState('/'+subItem.path)">
                    <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <!-- 文本 -->
                    <span>{{subItem.authName}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  // 表示在调用该函数声明周期初始阶段，就调用这个函数来发起后端请求
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 响应所有的请求
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // console.log(res.map)
      this.menulist = res.data
    },
    // 实现菜单折叠与扩展
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }

}
</script>

<style lang="less" scoped>

.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div{
        display: flex;
        align-items: center;
        margin-left: 15px;
    }
    img {
        width: 61px;
        height: 56px;
        border-radius: 50%;
        background-color: #fff;
        transform: translate(-25%)
    }
}

.el-aside {
    background-color: #333744;
    .el-menu {
      // 消除左侧栏的对不奇的问题
      border-right: none
    }
}

.el-main {
    background-color: #eaedf1;
}
// 图标样式
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  // 字符之间的间距
  letter-spacing: 0.2em;
  // 鼠标放上去可以变成一个小手
  cursor: pointer;
}
</style>
