<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="tuichu">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 左侧栏 -->
      <el-aside :width="iscollapse ? '64px' :'200px'">
		  <div class="toggle-button" @click="toggleButton">|||</div>
        <!-- 左侧菜单内容区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened :collapse="iscollapse" :collapse-transition="false" router
				:default-active="activePath">
          <!-- 一级菜单区域 -->
          <el-submenu :index="item.id+''" v-for="item in menuslist" :key="item.id">
            <!-- 一级菜单模版区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconobj[item.id]"></i>
              <!-- 内容 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单区域 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveState('/'+subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 内容 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边主要内容 -->
      <el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
		menuslist:[],
		iconobj:{
			'125':'iconfont icon-user-group',
			'103':'iconfont icon-quanxian',
			'101':'iconfont icon-shangpinguanli1',
			'102':'iconfont icon-dingdan',
			'145':'iconfont icon-baobiao'
		},
		// 菜单是否折叠
		iscollapse:false,
		//被激活的链接地址
		activePath:''
	}
  },
  created(){
	  this.getMeaus();
		this.activePath=window.sessionStorage.getItem('activePath')
  },
  methods: {
    tuichu() {
      window.sessionStorage.clear();
      this.$router.push("/login");
	},
	async getMeaus(){
		const {data:res}=await this.$http.get('menus')
		if(res.meta.status!==200) return this.$message.error(res.meta.msg)
		this.menuslist=res.data
		// console.log(res)
	},
	toggleButton(){
		this.iscollapse=!this.iscollapse
	},
	saveState(activePath){
		window.sessionStorage.setItem('activePath',activePath)
		this.activePath=activePath
	}
  }
};
</script>

<style lang="less" scoped="scoped">
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu{
	  border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}
.iconfont{margin-right: 10px;
font-size: 18px;}
.toggle-button{
	background-color: #4a5064;
	color :#fff;
	line-height: 24px;
	text-align: center;
	letter-spacing: 0.2em;
    font-size: 10px;
}
</style>
