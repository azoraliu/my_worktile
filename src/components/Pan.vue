<template>
	<div class="routetwo">
		<div class="midnav-route">
			<span class="routetwotitle">网盘</span>
			<div class="search">
				<i class="iconfont icon-sousuo1"></i>
				<input type="text" class="search-text" placeholder="搜索成员、消息">
			</div>
			<ul class="clklist">
				<li class="ulclk" v-for="(item,index1) in worklist"> 
					<router-link tag="div" :to="item.routeto" class="ulclktop" @click.native="showul(item)" :class="{liactive:item.active}">
						<i class="iconfont icon-triangle-right" :class="{icon_rotate:item.ulshow,icon_no:item.nochild}"></i>
						<span class="ulclktop-span">{{item.name}}</span>
					</router-link>
					<ul class="itemul" :class="{ulshow:item.ulshow}">
						<router-link tag="li" :to="work.routeto" class="itemlist" v-for="(work,index) in item.child" :key="index" @click.native="makelistactive(item,index)" :class="{liactive:work.active}">
							{{work.name}}
						</router-link>
					</ul>
				</li>
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
				worklist:[
				{"name":'企业网盘',"routeto":'',"ulshow":false,"child":[{"name":'公司制度',"routeto":'Companyrule',"active":false},
				{"name":'公司照片',"routeto":'Companypic',"active":false},
				{"name":'资料共享',"routeto":'Companyshare',"active":false}]},
				{"name":'个人网盘',"routeto":'Personalpan',"active":false},
				{"name":'成员',"routeto":'',"ulshow":false,"child":[]},
				{"name":'标签',"routeto":'',"ulshow":false,"child":[]},
				{"name":'与我共享',"routeto":'Share',"nochild":true,"active":false},
				{"name":'回收站',"routeto":'Reuse',"nochild":true,"active":false}
				],
				
			}
		},
		methods:{
			makelistactive:function(item,index){
				this.worklist.forEach(function(obj){
					obj.active=false;
					if(obj.child){
						obj.child.forEach(function(obj1){
						obj1.active=false;
					    })
					}
				})
				if(item.child!=undefined){
					item.child[index].active = true;
				}
				else{
					item.active=true;
				}
			},
			showul:function(n){
				if(n.ulshow!=undefined){
					n.ulshow=!n.ulshow;
				}else{
					n.active=true;
					this.makelistactive(n,0);
				}
			}
		}
	}
</script>

