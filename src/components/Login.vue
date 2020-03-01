<template>
	<div class="login_container">
		<div class="login_box">
			<!-- 头像区域 -->
			<div class="logo">
				<img src="../assets/logo.png" />
			</div>
			<!-- 登录表单区域 -->
			<el-form  label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules" ref="resetFormRef">
				<!-- 用户名 -->
				<el-form-item prop="username">
					<el-input prefix-icon="iconfont icon-xingmingyonghumingnicheng" v-model="loginForm.username"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input prefix-icon="iconfont icon-ziyuanxhdpi" v-model="loginForm.password" type="password"></el-input>
				</el-form-item>
				<!-- 按钮 -->
				<el-form-item class="btns">
					 <el-button type="primary" @click="login">登录</el-button>
					 <el-button type="info" @click="resetForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
			data(){
			return {
				// 表单的数据绑定对象
				loginForm:{
					username:'admin',
					password:'123456'
				},
				// 表单的验证规则对象
				loginFormRules:{
					username:[
						 { required: true, message: "请输入用户名", trigger: "blur" },
                         { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger:"blur"}
					],
					password:[
						 { required: true, message: "请输入密码", trigger: "blur" },
						 { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: "blur"}
					]
				}
			};
		},
		methods:{
			//点击重置按钮，重置登录表单
			resetForm(){
				// console.log(this);
				this.$refs.resetFormRef.resetFields()
			},
			login(){
				this.$refs.resetFormRef.validate(async valid=>{
					// console.log(valid)
					if(!valid)  return;
					const { data:res } = await this.$http.post('login',this.loginForm)
					// console.log(res)
				if (res.meta.status !== 200) return this.$message.error('登录失败！')
				this.$message.success('登录成功')
				// 1.将登陆成功之后的token，保存到客户端的sessionStorage中
				  // 1.1项目中出了登陆之外的其他API接口,必须在登陆之后才能访问
				  // 1.2token只应该在当前网站打开有效,所以将token保存到sessionStorage中
				  window.sessionStorage.setItem('token',res.data.token)
				// 2.通过编程式导航跳转到后台主页,路由/home 
				 this.$router.push("/home")
			})
		}
	}
	}
</script>

<style lang="less" scoped="scoped">
	.login_container {
		background-color: #333;
		height: 100%;
	}

	.login_box {
		width: 450px;
		height: 300px;
		background-color: white;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
			.logo {
			width: 130px;
			height: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #FFFFFF;
		
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #EEEEEE;
			}
		}
	}
	.btns{
		display:flex;
		justify-content:flex-end;
	}
	.login_form{
		position:absolute;
		bottom:0;
		width:100%;
		padding:0 20px;
		box-sizing:border-box;
	}
</style>
