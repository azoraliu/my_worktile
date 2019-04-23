<template>
	<div class="routetwo">
		<div class="midnav-route">
			<span class="routetwotitle">通讯录</span>
			<i class="iconfont icon-tianjia"></i>
			<div class="search">
				<i class="iconfont icon-sousuo1"></i>
				<input type="text" class="search-text" placeholder="搜索成员、消息">
			</div>
			<ul class="conlist">
				<li v-for="(item,index1) in twoboard" @click="changecolor(item)" class="ileft" 
				:style="{'border-bottom-color':item.color}">
				    <i :class="item.icon" :style="{'color':item.color}"></i>
			    </li>
		    </ul> 
		    <ul class="clklist"  v-if="twoboard[0].showlist">
		    	<li class="ulclk" v-for="(item,index2) in worklist"> 
		    		<router-link tag="div" class="ulclktop" :to="item.routeto" @click.native="showul(item)" :class="{liactive:item.active}">
		    			<i class="iconfont icon-triangle-right" :class="{icon_rotate:item.ulshow,icon_no:item.nochild}"></i>
		    			<span class="ulclktop-span">{{item.name}}</span>
		    		</router-link>
		    		<ul class="itemul" :class="{ulshow:item.ulshow}">
		    			<router-link tag="li" :to="work.routeto" class="itemlist" v-for="(work,index) in item.child":key="index" @click.native="makelistactive(item,index)" :class="{liactive:work.active}">
		    				{{work.name}}
		    			</router-link>
		    		</ul>
		    	</li>
		    </ul>  
		    <ul v-else>
		    	<router-link tag="li" :to="contact.routeto" class="itemlist" v-for="(contact,index3) in contactlist" :key="index3" @click.native="makeseclistactive(contact)" :class="{liactive:contact.active}">{{contact.name}}</router-link>
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
				twoboard:[{"icon":'iconfont icon-renyuanguanli',"color":'#ccc',"showlist":true},
				{"icon":'iconfont icon-shangchuan',"color":'#ccc',"showlist":false}
				],
				worklist:[
				{"name":'群组',"routeto":'',"ulshow":false,"child":[{"name":'企业公告',"routeto":'Companynotice',"active":false}]},
				{"name":'机器人',"routeto":'',"ulshow":false,"child":[{"name":'简报助手',"routeto":'',"active":false}]}
				],
				contactlist:[
				{"name":'ly',"routeto":'',"active":false}
				]
			}
		},
		methods:{
			changecolor:function(n){
				this.twoboard.forEach(function(obj){
					obj.color='#ccc';
					obj.showlist=false;
					// alert(obj.routeto+obj.color);
				});
				n.color='MediumAquamarine';
				n.showlist=true;
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
			makeseclistactive:function(n){
				this.contactlist.forEach(function(obj){
					obj.active = false;
				});
				n.active = true;
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

<style scoped>
.icon-tianjia{
	float: right;
	margin-right: 10px;
	color: #ccc;
}
.icon-tianjia:hover{
	color: MediumAquamarine;
}
.icon-renyuanguanli,.icon-shangchuan{
	color: #ccc;
	font-size: 20px;
}
.conlist{
	text-align: center;
	margin-top: 10px;
}
.ileft{
	display: inline-block;
	width: 40%;
	border-bottom: 1px solid #ccc;
}
.ileft:focused{
	border-bottom: 1px solid MediumAquamarine;
}
</style>