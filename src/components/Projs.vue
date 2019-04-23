<template>
	<div class="routetwo">
		<div class="midnav-route">
			<span class="routetwotitle">项目</span>
			<i class="iconfont icon-tianjia" @click="createproject()"></i>
			<div class="createproject" v-show="project.show">
				<span class="closeadd" @click="createproject()">关闭</span>
				<h2>创建新项目</h2>
				<div class="line"></div>
				<form>
					<div class="form-group">
						<label for="exampleInputName1">项目编号</label>
						<input type="email" class="form-control" id="exampleInputEmail1" v-model="project.projectid">
					</div>
					<div class="form-group">
						<label for="exampleInputName1">项目名称</label>
						<input type="email" class="form-control" id="exampleInputEmail1" v-model="project.projectname" placeholder="projectname">
					</div>
					<div class="form-group">
						<label for="exampleInputName1">项目介绍</label>
						<textarea class="form-control" rows="3" v-model="project.describe"></textarea>
					</div>
					<div class="form-group">
						<label for="exampleInputName1">开始时间</label>
						<myDatepicker :date="startTime" :option="multiOption" :limit="limit"></myDatepicker>
						<label for="exampleInputName1">结束时间</label>
						<myDatepicker :date="endtime" :option="timeoption" :limit="limit"></myDatepicker>

					</div>
					<div class="form-group">
						<label for="exampleInputName1">项目类型</label>
						<select class="form-control" v-model="project.protype" >
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</div>
					<div class="form-group">
						<label for="exampleInputName1">项目成员</label>
						<i class="iconfont icon-tongxunlu" @click="choosepeople()"></i>
					</div>
					<button type="submit" class="btn btn-default" @click="addproject()">Submit</button>
				</form>
				<div class="showpeople" v-show="project.showpeople">
					<div class="checkbox"  v-for="(people,indexpeo) in allpeople" :key="indexpeo">
						<label>
							<input type="radio" v-model="project.people" :value="people.name">{{people.name}}
						</label>
					</div>
					<div>
						{{this.project.people}}
					</div>
					<button type="submit" class="btn btn-default" @click="choosepeople()">Submit</button>
			    </div>
			</div>
			<div class="search">
				<i class="iconfont icon-sousuo1"></i>
				<input type="text" class="search-text" placeholder="搜索成员、消息">
			</div>
			<ul class="clklist">
				<li class="ulclk" v-for="item in worklist"> 
					<router-link  tag="div" :to="item.routeto" class="ulclktop" @click.native="showul(item)" :class="{liactive:item.active}">
						<i class="iconfont icon-triangle-right" :class="{icon_rotate:item.ulshow,icon_no:item.nochild}"></i>
						<span class="ulclktop-span">{{item.name}}</span>
					</router-link>
					<ul class="itemul" :class="{ulshow:item.ulshow}">
						<router-link tag="li" :to="{path:work.routeto,name:work.routeto,query:{'id':work.routename}}" class="itemlist" v-for="(work,index) in item.child" :key="index" @click.native="makelistactive(item,index)" :class="{liactive:work.active}">
							{{work.name}}
						</router-link >
					</ul>
				</li>
			</ul>
		</div>
		<div class="midnav-content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script>
	import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'
	export default {
		data(){
			return{
				// isRouterAlive:true,
				allpeople:[],
				allprojects:[],
				project:{
					show:false,
					showpeople:false,
					projectid:'',
					projectname:'',
					describe:'',
					begintime:'',
					endtime:'',
					protype:'',
					people:''
				},
				worklist:[
				{"name":'工作',"routeto":'',"ulshow":false,"child":[{"name":'我的工作',"routeto":'Mywork',"active":false},
				{"name":'工时视图',"routeto":'Workview',"active":false},
				{"name":'统计报表',"routeto":'Reportform',"active":false},
				{"name":'时间视图',"routeto":'Timeview',"active":false},
				{"name":'人员视图',"routeto":'Peopleview',"active":false},
				{"name":'日历视图',"routeto":'Calenderview',"active":false}]},
				{"name":'项目',"routeto":'',"ulshow":false,"child":[]},
				{"name":'配置中心',"routeto":'Mywork',"nochild":true,"active":false},
				{"name":'回收站',"routeto":'Mywork',"nochild":true,"active":false}
				],
				startTime: {  // 相当于变量
					time: ''
				},
                endtime: {    // 相当于变量
        	        time: ''
                },
                timeoption: {
		            type: 'min',  // day , multi-day
		            week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		            month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		            format: 'YYYY-M-D HH:mm', // YYYY-MM-DD 日期
		            inputStyle: {               // input 样式
		            	'display': 'inline-block',
		            	'padding': '6px',
		            	'line-height': '22px',
		            	'width':'160px',
		            	'font-size': '16px',
		            	'border': '2px solid #fff',
		            	'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
		            	'border-radius': '2px',
		            	'color': '#5F5F5F',
		            	'margin':'0'
		            },
		            color: {                // 字体颜色
		              header: '#35acff',    // 头部
		              headerText: '#fff',   // 头部文案 
		            },
		            buttons: {              // button 文案
		            	ok: '确定',
		            	cancel: '取消'
		            },
		            overlayOpacity: 0.5,    // 遮罩透明度
		            placeholder: '请选时间',  // 提示日期
		            dismissible: true  // 默认true  待定
	            },

	            multiOption: {
		        	type: 'min',
		        	week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		        	month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		        	format:"YYYY-M-D HH:mm",
		        	inputStyle: {
		        		'display': 'inline-block',
		        		'padding': '6px',
		        		'line-height': '22px',
		        		'width':'160px',
		        		'font-size': '16px',
		        		'border': '2px solid #fff',
		        		'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
		        		'border-radius': '2px',
		        		'color': '#5F5F5F',
		        		'margin':'0'
		        	},
		            color: {                // 字体颜色
		              header: '#35acff',    // 头部
		              headerText: '#fff',   // 头部文案 
		            },
		            buttons: {              // button 文案
		            	ok: '确定',
		            	cancel: '取消'
		            },
		            placeholder: '请选时间',
		            dismissible: true
		        },
		        limit: [{
		        	type: 'weekday',
		        	available: [1, 2, 3, 4, 5,6,0]
		        },
		        {
		        	type: 'fromto',
		        	from: '2016-02-01',
		        	to: '2050-02-20'
		        }]
            }
        },
		components:{
			myDatepicker
		},
		mounted:function(){
			this.$axios.get('/api/user/getAllUser')
			.then((res)=>{
				/*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
				if(res.data == 0){
					this.allpeople=[];
				}else{
					this.allpeople=res.data;
				}
			})
			this.$axios.get('/api/user/getAllProject')
			.then((res)=>{
				/*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
				if(res.data == 0){
					console.log("no project")
				}else{
					this.allprojects=res.data;
					console.log(this.allprojects)
					for(let i=0;i<res.data.length;i++){
						this.worklist[1].child.push({"name":res.data[i].projectname,"routeto":'projectshow','routename':i,"active":false});
					}
				}
			})
		},
		methods:{
			// reload() {
			// 	this.isRouterAlive = false;
			// 	this.isRouterAlive = true;
			// },
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
					if(item.name=='项目'){
						// this.$options.methods.reload();
						// this.$router.go(0);
					}
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
			},
			createproject:function(){
				this.project.show=!this.project.show;
			},
			choosepeople:function(){
				this.project.showpeople=!this.project.showpeople;
			},
			addproject:function(){
				this.$axios.post('/api/user/addproject', { projectid: this.project.projectid,projectname: this.project.projectname,describe:this.project.describe,begintime:this.startTime.time,endtime:this.endtime.time,
					protype:this.project.protype,people:this.project.people},{})
                .then((res)=>{
                console.log(res);
                if(res.status== "200"){
                  this.project.projectid = ''
                  this.project.projectname = ''
                  this.project.describe = ''
                  this.startTime.time= ''
                  this.endtime.time= ''
                  this.project.protype= ''
                  this.project.people=[]
                  this.project.show = false
                  alert("项目创建成功"+this.startTime.time+this.endtime.time);
                }
              })
			}
		}
	}
</script>
<style scoped>
.icon-tianjia{
	float: right;
	margin-right: 10px;
	color: #ccc;
	font-size: 20px;
}
.icon-tianjia:hover{
	color: MediumAquamarine;
}
.icon-tongxunlu{
	display: block;
	margin-left: 20px;
	color: #ddd;
}
.icon-tongxunlu:hover{
	color: MediumAquamarine;
}
</style>
