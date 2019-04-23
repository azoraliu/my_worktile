<template>
	<div class="routetwo">
		<div class="midnav-route">
			<span class="routetwotitle">日历</span>
			<i class="iconfont icon-tianchongxing-"></i>
		<!-- <div class="topcal">
			<table class="bgtable">
				<thead>
					<tr>
						<th v-for="(item,index) in dataarr">{{item}}</th>
					</tr>
				</thead>
				<tbody class="calenderbody">
					<tr v-for="n in makedate()">
						<td  v-for="m in n" :class="{'gray':m.prem||m.nextm}">
							{{m.day}}
						</td>
					</tr>
				</tbody>
			</table>
		</div> -->
		<ul class="clklist">
			<li class="ulclk" v-for="item in worklist"> 
				<router-link tag="div" :to="item.routeto" class="ulclktop" @click.native="showul(item)" :class="{liactive:item.active}">
					<i class="iconfont icon-triangle-right" :class="{icon_rotate:item.ulshow,icon_no:item.nochild}"></i>
					<span class="ulclktop-span">{{item.name}}</span>
				</router-link >
				<ul class="itemul" :class="{ulshow:item.ulshow}">
					<router-link tag="li" :to="work.routeto" class="itemlist" v-for="(work,index) in item.child" :key="index" @click.native="makelistactive(item,index)" :class="{liactive:work.active}">
						{{work.name}}
					</router-link >
				</ul>
			</li>
		</ul>
	</div>
	<div class="midnav-content">
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</div>
</template>
<script>
	export default {
		data(){
			return{
			    isRouterAlive: true,
				worklist:[
				{"name":'我的日程',"routeto":'Mydaily',"nochild":true,"active":false},
				{"name":'团队日程',"routeto":'',"ulshow":false,"child":[{"name":'会议安排',"routeto":'Conference',"active":false}]},
				{"name":'成员日程',"routeto":'',"ulshow":false,"child":[]}
				],	
			}
		},
		provide() {
			return {
				reload: this.reload
			}
		},
		methods:{
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true;
				});
			},
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
<style>
.icon-tianchongxing-{
	float: right;
	margin-right: 10px;
	font-size: 20px;
	color: #ccc;
}
.icon-tianchongxing-:hover{
	color: MediumAquamarine;
}
</style>
