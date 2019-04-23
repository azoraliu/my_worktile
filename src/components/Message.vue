<template>
	<div class="routetwo">
		<div class="midnav-route">
			<span class="routetwotitle">消息</span>
			<i class="iconfont icon-tianjia"></i>
			<div class="search">
				<i class="iconfont icon-sousuo1"></i>
				<input type="text" class="search-text" placeholder="搜索成员、消息">
			</div>
			<ul>
				<router-link tag="li" :to="message.routeto" class="itemlist" v-for="(message,index1) in messagelist" :key="index1" @click.native="makelistactive(message)" :class="{liactive:message.active}">{{message.name}}</router-link>
			</ul>
		</div>
		<div class="midnav-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				messagelist:[
				{"name":'项目助手',"routeto":'projectassistant',"active":false},
				{"name":'企业公告',"routeto":'BusinessAnnouncement',"active":false},
				{"name":'小特机器人',"routeto":'Robot',"active":false},
				{"name":'简报助手',"routeto":'Paperassistant',"active":false},
				{"name":'网盘助手',"routeto":'Panassistant',"active":false},
				{"name":'日程助手',"routeto":'Dailyassistant',"active":false}
				]
			}
		},
		methods:{
			makelistactive:function(n){
				this.messagelist.forEach(function(obj){
					obj.active = false;
				});
				n.active = true;
			}
		}
	}
</script>

<style scoped>
ul{
	margin-top: 20px;
}
.itemlist{
	width: 100%;
	height: 50px;
	line-height: 50px;
	padding-left: 30px;
}
.itemlist:hover{
	box-shadow:0px 0px 1px 1px #ccc;
}
.icon-tianjia{
	float: right;
	margin-right: 10px;
	color: #ccc;
}
.icon-tianjia:hover{
	color: MediumAquamarine;
}
</style>