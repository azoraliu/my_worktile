<template>
	<div class="page">
		<div class="mainnav">
			<div class="topimg">
				<div class="dropdown">
					<i class="iconfont icon-yingyongguanli"></i>
					<div class="dropdown-content">
						<ul class="dropul">
							<li class="dropli" @click="topimgliclk(n)" v-for="(n,index) in topimgli">
								<div class="line" v-if="index>4"></div>
								<a href="">{{n.name}}</a>	
							</li>
						</ul>
					</div>
				</div>
			</div>
			<ul class="midimg">
				<router-link tag="li" v-for="(n,nindex) in midroute" :key="nindex" :to="n.routeto" class="rou">
					<div class="idiv" @mouseover="showName(n)" @mouseout="hiddenName(n)">
						<i :class="n.icon" :style="{'margin-top':n.imargin}"></i>
						<p :style="{'margin-top':n.pmargin}">{{n.name}}</p>
					</div>
				</router-link>
			</ul>
			<div class="bottomimg">
				<div class="dropdown">
					<i class="iconfont icon-yingyongguanli"></i>
					<div class="dropdown-content">
						<ul class="dropul" >
							<li class="dropli" @click="topimgliclk(n)" v-for="n in bottomli"><a href="">{{n.name}}</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="midnav">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import {getCookie,delCookie} from './../assets/js/cookie.js';
export default {
   data(){
		return{
		midroute:[
		{"routeto":'Message',"icon":'iconfont icon-xiaoxi',"showname":true,"name":'消息',imargin:'50%',pmargin:'100%'},
		{"routeto":'Projs',"icon":'iconfont icon-xiangmu',"showname":true,"name":'项目',imargin:'50%',pmargin:'100%'},
		{"routeto":'Calender',"icon":'iconfont icon-rili',"showname":false,"name":'日历',imargin:'50%',pmargin:'100%'},
		{"routeto":'Pan',"icon":'iconfont icon-wangpan',"showname":false,"name":'网盘',imargin:'50%',pmargin:'100%'},
		{"routeto":'Paper',"icon":'iconfont icon-jianbao-copy',"showname":false,"name":'简报',imargin:'50%',pmargin:'100%'},
		{"routeto":'Contact',"icon":'iconfont icon-tongxunlu',"showname":false,"name":'通讯录',imargin:'50%',pmargin:'100%'}
		],
		topimgli:[{"name":'进入企业后台',"url":''},
		{"name":'管理企业成员',"url":''},
		{"name":'应用管理',"url":''},
		{"name":'配置服务集成',"url":''},
		{"name":'企业设置',"url":''},
		{"name":'升级为专业版',"url":'',"border-top":true},
		{"name":'登出当前用户',"url":'',"border-top":true}
		],
		bottomli:[{"name":'个人偏好设置',"url":''},
		{"name":'账号资料设置',"url":''},
		{"name":'在线支持',"url":''},
		{"name":'进入企业后台',"url":''},
		{"name":'登出当前用户',"url":''}],
	    }
	},
	methods:{
		showName:function(n){
			n.showname=true;
			n.imargin='30%';
			n.pmargin='0';
		},
		hiddenName:function(n){
			n.showname=false;
			n.imargin='50%';
			n.pmargin='100%';
		},
		topimgliclk(n){
			switch(n.name){
				case "登出当前用户":
			    delCookie('username');
			    this.$router.push('/login');
			}
			
		}
	}
}
</script>

<style>
.page{
	width: 100%;
	height: 100%;
	display: flex;
}
/*.head-nav{
	height: 100%;
	width: 70px;
}*/
.mainnav{
	background-color:MediumAquamarine;
	width: 70px;
 	height: 100%;
 	float: left;
 	box-sizing: border-box;
}
.midnav{
	background-color:#ccc;
	width: 100%;
 	height: 100%;
 	float: left;
}
/*mainnav*/
.mainnav a{
	text-decoration:none;
	width: 100%;
	color: #000;
	line-height: 40px;
}
.mainnav a:hover{
	text-decoration:none;
	color: #000;
}
/*topimg*/
.mainnav .topimg{
	box-sizing: border-box;
	margin:0;
	padding: 0;
	width: 100%;
 	height: 13%;
 	text-align: center;
}
.dropul{
	list-style-type: none;
	padding: 0;
}
.dropli{
	height: 40px;
	width: 100%;
	padding-left: 10%;
	text-align: left;
}
.dropli:hover{
	padding-left: 20%;
	background-color: #ccc;
}
.topimg .dropdown {
	width: 100%;
	height: 100%;
  position: relative;
  display: inline-block;
}
.topimg .dropdown-content {
  display:none;
  position: relative;
  background-color: #fff;
  min-width: 365%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 0;
  margin:-70% 0 0 100%;
}
.topimg .dropdown:hover .dropdown-content {
  display: block;
}
.topimg .icon-yingyongguanli:hover{
	color: #ccc;
}
/*midimg*/
.mainnav .midimg{
	box-sizing: border-box;
	margin:0;
	padding: 0;
	width: 100%;
 	height: 70%;
}
.idiv{
	box-sizing: border-box;
	height: 100%;
	overflow:hidden;
}
.midimg ul{
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	list-style-type: none;
}
.midimg li{
	height: 16.6%;
	text-align: center;
	width: 100%;
	margin: 0;
	flex-grow: 1;
	text-align: center;
}
.midimg li:hover{
	background-color: rgba(0,0,0,0.1);
}
.mainnav i{
	margin-top: 50%;
	display: inline-block;
	transform: translateY(-50%);
}
.midimg p{
	margin-top: 100%;
	color: #fff;
}
/*bottomimg*/
.mainnav .bottomimg{
	box-sizing: border-box;
	margin:0;
	padding: 0;
	width: 100%;
 	height: 17%;
 	text-align: center;
}
.bottomimg .dropdown {
	width: 100%;
	height: 100%;
  position: relative;
  display: inline-block;
}
.bottomimg .dropdown:hover .dropdown-content{
  display:block;
}
.bottomimg .dropdown-content {
  display: none;
  position: relative;
  background-color: #fff;
  min-width: 365%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 0;
  margin:-300% 0 0 100%;
}
</style>