<template>
<div class="proshow">

	<!-- {{$route.params.nowproject}} -->
	<table class="table">
		<thead>
			<tr>
				<td>id</td>
				<td>name</td>
				<td>describe</td>
				<td>begindate</td>
				<td>enddate</td>
				<td>type</td>
				<td>projectmember</td>
			</tr>
		</thead>
		<tbody class="table-bordered">
			<tr>
				<td> {{allprojects[index].proid}}</td>
				<td> {{allprojects[index].projectname}}</td>
				<td> {{allprojects[index].projectintro}}</td>
				<td>{{allprojects[index].begindate}}</td>
				<td>{{allprojects[index].enddate}}</td>
				<td>{{allprojects[index].projecttype}}</td>
				<td>{{allprojects[index].projectmember}}</td>
			</tr>
		</tbody>
	</table>
</div>
</template>
<script>
	export default {
		data(){
			return{
				index:-1,
				allprojects:[],
			}
			// nowproject:$route.params.nowproject;
		},
		mounted:function(){
			this.$axios.get('/api/user/getAllProject')
			.then((res)=>{
				/*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
				if(res.data == 0){
					console.log("no project")
				}else{
					this.allprojects=res.data;
				}
			})
		},
		created(){
			this.getData();
		},
		methods:{
			getData() {
				console.log(this.$route.query.id);
				this.index=this.$route.query.id;
	        }
        },
        watch:{
  	       $route(to,from,params){this.getData();}
        }
    }
</script>
<style>
	.proshow{
		background-color: #fff;
		width: 100%;
		height: 100%;
	}
</style>