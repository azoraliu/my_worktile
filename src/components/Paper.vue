<template>
	<div class="routetwo">
		<div class="midnav-route">
			<span class="routetwotitle">简报</span>
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
				{"name":'提交简报',"routeto":'Papersubmit',"active":false,"nochild":true,},
				{"name":'我评审的',"routeto":'Papertosee',"active":false,"nochild":true,},
				{"name":'跟进的问题',"routeto":'Paperproblem',"active":false,"nochild":true,},
				{"name":'我的简报',"routeto":'',"ulshow":false,"child":[{"name":'我的日报',"routeto":'Mydaypaper',"active":false},
				{"name":'我的周报',"routeto":'Myweekpaper',"active":false},
				{"name":'我的月报',"routeto":'Mymonthpaper',"active":false}]},
				{"name":'成员简报',"routeto":'',"ulshow":false,"child":[{"name":'成员日报',"routeto":'Mydaypaper',"active":false},
				{"name":'成员周报',"routeto":'Mydaypaper',"active":false},
				{"name":'成员月报',"routeto":'Mydaypaper',"active":false}]},
				{"name":'简报统计',"routeto":'',"ulshow":false,"child":[{"name":'日报统计',"routeto":'Mydaypaper',"active":false},
				{"name":'周报统计',"routeto":'Mydaypaper',"active":false},
				{"name":'月报统计',"routeto":'Mydaypaper',"active":false}]}
				]
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

