<template>
	<div class="calender" id="calender">
		<div class="selmon">
			<input type="text" class="form-control"  v-model="year">
			<input type="text" class="form-control" v-model="month">
			<button class="btn btn-default" v-on:click="showschedule()">查看日程</button>
		</div>
		<div class="mar50" @dblclick="changecrshow()">
			<div class="table1">
				<table class="bgtable">
					<thead>
						<tr>
							<th v-for="(item,index) in dayarr">{{item}}</th>
						</tr>
					</thead>
					<tbody class="calenderbody">
						<tr v-for="n in makedate()">
							<td  v-for="m in n" v-bind:class="{'gray':m.prem||m.nextm}">
								{{m.day}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>	
			<div class="table2">
				<div v-for="row in domdata" class="row">
					<table class="scheduletable">
						<tr v-for="trindex in row">
							<td class="td" @click="delschedule(tdindex)" v-for="tdindex in trindex" v-bind:colspan="tdindex.colspannum">
								<p v-bind:class="{'daily':tdindex.type}" v-if="tdindex.title!=undefined">{{tdindex.title}}</p>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class="createproject" v-show="createdaily.show">
			<span class="closeadd" @click="changecrshow()">关闭</span>
			<h2>添加日程</h2>			
			<div class="line"></div>
			<form>
				<div class="form-group">
					<label for="exampleInputName1">日程名称</label>
					<input type="email" class="form-control" id="exampleInputEmail1" v-model="createdaily.title">
				</div>
				<div class="form-group">
					<label for="exampleInputName1">开始时间</label>
					<input type="email" class="form-control" id="exampleInputEmail1" v-model="createdaily.start" placeholder="格式：20190208">
					<label for="exampleInputName1">结束时间</label>
					<input type="email" class="form-control" id="exampleInputEmail1" v-model="createdaily.end" placeholder="格式：20190210">
				</div>
				<div class="form-group">
					<label for="exampleInputName1">日程类型</label>
					<select class="form-control" v-model="createdaily.type" >
						<option>work</option>
						<option>life</option>
					</select>
				</div>
				<button type="submit" class="btn btn-default" @click.prevent="" @click="adddaily()">确认添加</button>
			</form>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				createdaily:{
					show:false,
					title:'',
					start:'',
					end:'',
					type:''
				},
				dayarr:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				year:2019,
				month:3,
				daynum:[],
				domdata:[],
				schedules:[
				// {"title":"开会","start":"20190224","end":"20190227","type":"work"},
				// {"title":"开会","start":"20190225","end":"20190228","type":"work"},
				// {"title":"农药","start":"20190307","end":"20190312","type":"life"},
				// {"title":"编程","start":"20190317","end":"20190410","type":"work"},
				// {"title":"编程2","start":"20190317","end":"20190401","type":"work"},
				// // {"title":"吃饭","start":"20190307","end":"20190308","type":"life"},
				// {"title":"采购","start":"20190310","end":"20190313","type":"work"},
				],
			}
		},
		inject:["reload"],
		 mounted:function(){
		 	this.getdaily();
			var daynum=[];
        	//第一天星期几
	        	var firstday=(new Date(this.year,this.month-1,1)).getDay();
	        	//本月天数
	        	//下一个月
	        	let y=this.month==12?this.year+1:this.year;
	        	let m=this.month==12?1:this.month+1;
	        	//上一个月
	        	let y_=this.month==1?this.year-1:this.year;
	        	let m_=this.month==1?12:this.month-1;
	        	var monthday=(new Date(new Date(y,m-1,1)-1)).getDate();
	        	var nextmfirstday=(new Date(y,m-1,1)).getDay();
	        	var premonthday=(new Date(new Date(this.year,this.month-1,1)-1)).getDate();
	        	while(firstday--){
	        		// console.log(premonthday);
	        		daynum.unshift({"day":premonthday--,"year":y_,"month":m_,"prem":true,"baseline":0});

	        	}
	        	for(var i=1;i<=monthday;i++){
	        		// console.log(i);
	        		daynum.push({"day":i,"year":this.year,"month":this.month,"baseline":0});
	        	}
	        	for(var i=1;i<=7-nextmfirstday;i++){
	        		// console.log(i);
	        		daynum.push({"day":i,"year":y,"month":m,"nextm":true,"baseline":0});
	        	}
	        	this.daynum=daynum;
	        	setTimeout(function(){
                      this.calDomData(daynum);
                }.bind(this),1000)     	
	        },
	        methods:{
	        delschedule(tdindex){
	        	if(tdindex.title){
	        		this.$axios.post('/api/user/deldaily', {title: tdindex.title},{})
					.then((res)=>{
						console.log(res);
						if(res.status== "200"){
							alert("删除成功");
							 this.reload(); 
							// this.$options.methods.getdaily.bind(this)();                   	
						}
					})
	        	}
	        },
			changecrshow:function(){
				this.createdaily.show=!this.createdaily.show;
			},
			getdaily:function(){
				this.schedules=[];
				this.$axios.get('/api/user/getAllschedule')
				.then((res)=>{
					/*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
					if(res.data == 0){
						console.log("no schedule")
					}else{
						this.schedules=res.data;
					}
				})
			},
			adddaily:function(){

				if(this.createdaily.title==''||this.createdaily.start==''||this.createdaily.end==""||this.createdaily.type==''){
					alert("请填写完整信息!");

				}
				else{
					this.$axios.post('/api/user/adddaily', {title: this.createdaily.title,start:this.createdaily.start,end:this.createdaily.end,type:this.createdaily.type},{})
					.then((res)=>{
						console.log(res);
						if(res.status== "200"){
							alert("添加成功");
							this.reload(); 
							// this.$options.methods.getdaily.bind(this)();                     	
						}
					})
					this.createdaily.show=false;
					this.createdaily.title='';
					this.createdaily.start='';
					this.createdaily.end='';
					this.createdaily.type='';
				}
			},
			showschedule:function(){
				this.daynum=[];
				this.domdata=[];
				var daynum=[];
        	//第一天星期几
	        	var firstday=(new Date(this.year,this.month-1,1)).getDay();
	        	//本月天数
	        	//下一个月
	        	let y=this.month==12?parseInt(this.year)+1:this.year;
	        	let m=this.month==12?1:parseInt(this.month)+1;
	        	//上一个月
	        	let y_=this.month==1?parseInt(this.year)-1:this.year;
	        	let m_=this.month==1?12:parseInt(this.month)-1;
	        	var monthday=(new Date(new Date(y,m-1,1)-1)).getDate();
	        	var nextmfirstday=(new Date(y,m-1,1)).getDay();
	        	var premonthday=(new Date(new Date(this.year,this.month-1,1)-1)).getDate();
	        	// console.log(this.year+this.month);
	        	// console.log(y);
	        	// console.log("本月天数"+monthday+"上月最后一天"+premonthday+"下月第一天"+nextmfirstday);
	        	while(firstday--){
	        		// console.log(premonthday);
	        		daynum.unshift({"day":premonthday--,"year":y_,"month":m_,"prem":true,"baseline":0});
	        	}
	        	for(var i=1;i<=monthday;i++){
	        		// console.log(i);
	        		daynum.push({"day":i,"year":this.year,"month":this.month,"baseline":0});
	        	}
	        	for(var i=1;i<=7-nextmfirstday;i++){
	        		// console.log(i);
	        		daynum.push({"day":i,"year":y,"month":m,"nextm":true,"baseline":0});
	        	}
	        	this.daynum=daynum;
                this.$options.methods.calDomData.bind(this)(daynum);                    	
            },
        	calDomData:function(daynum){
        		var domdata=this.daynum.length==35?
        		[
        		 [[],[]],
           		 [[],[]],
            	 [[],[]],
            	 [[],[]],
            	 [[],[]]
            	 ]:
            	 [
        		 [[],[]],
           		 [[],[]],
            	 [[],[]],
            	 [[],[]],
            	 [[],[]],
            	 [[],[]]
            	 ];

        		domdata.forEach(function(row,index1){
        			row.forEach(function(eachtr,index2){
        				for(var i=0;i<7;i++){
        					let today=daynum[index1*7+i];
        					eachtr.push(
        						{"day":today.day,"month":today.month,"year":today.year,"hascontent":-1,"line":[0,0],
        						"colspannum":1});
        				}
        		   });
        		})
        		this.schedules.forEach(function(s,index){
        			var start=s.start;
        			var syear=start.substr(0,4);
        			var smonth=start.substr(4,2);
        			var sday=start.substr(6,2);
        			var end=s.end;
        			var eyear=end.substr(0,4);
        			var emonth=end.substr(4,2);
        			var eday=end.substr(6,2);
        			var sdate=new Date(syear,smonth-1,sday);
        			var firstdate=new Date(daynum[0].year,daynum[0].month-1,daynum[0].day);
        			// console.log(firstdate);
        			
        			// console.log(sdate);
        			// console.log(sdate)
        			var edate=new Date(eyear,emonth-1,eday);
        			if(sdate<firstdate&&edate>firstdate){sdate=new Date(daynum[0].year,daynum[0].month-1,daynum[0].day);}
        			var colspannum=(edate-sdate)/(1000*24*60*60)+1;
        			var colspannum1=edate-sdate;
        			var isvalid=0;
        			domdata.forEach(function(row,index1){
        				row.forEach(function(eachtr,index2){
        					nextindex:for(var i=0;i<eachtr.length;i++){
        						let td=eachtr[i];
        						var tddate=new Date(td.year,td.month-1,td.day);
        						if(tddate-sdate==0&&isvalid==0){
        							var issatisfy=1;
        							console.log(s.title+eachtr[i].day);
        							if(i+colspannum-1<eachtr.length){
        								for(var nn=0;nn<colspannum;nn++){
        									if(eachtr[i+nn].line[index2]!=0){
        										issatisfy=0;
        										break nextindex;
        									}
        								}
        								if(issatisfy==1){
        									isvalid=1;
        								    td.line[index2]++;
        									td.title=s.title;
        									td.type=s.type;
        									td.colspannum=colspannum;
        									eachtr.splice(i+1,colspannum-1);
        									// console.log(td.title+td.colspannum);
        								}
        							}
        							if(i+colspannum-1>=eachtr.length){
        								var maxrow=Math.floor((index1*7+i+colspannum-1)/7);
        								// console.log(s.title+colspannum+"maxrow"+maxrow);
        								var maxcol=(index1*7+i+colspannum)%7-1==-1?6:(index1*7+i+colspannum)%7-1;
        								console.log("before:"+i+" "+maxrow+" "+maxcol);
        								var maxrowindex=maxrow;

        								maxrow=maxrow<domdata.length?maxrow:domdata.length-1;
        								console.log("s:"+s.title+colspannum);
        								console.log("maxrow"+maxrow);
        								maxcol=maxrowindex<domdata.length?maxcol:6;
        								console.log("maxcol"+maxcol);
        								if(maxrow<domdata.length){
        									for(var nn=index1;nn<=maxrow;nn++){
        										// if(maxrow==domdata.length){
        										// 	issatisfy=1;
        										// 	break;
        										// }
        										if(nn==index1){
        											for(var x=i;x<domdata[nn][index2].length;x++){
        												if(domdata[nn][index2][x].line[index2]!=0){
        													issatisfy=0;
        													break nextindex;
        												}
        											}
        										}
        										else if(nn!=maxrow){
        											for(var x=0;x<domdata[nn][index2].length;x++){
        												if(domdata[nn][index2][x].line[index2]!=0){
        													issatisfy=0;
        													break nextindex;
        												}
        											}
        										}
        										else{
        											for(var x=0;x<domdata[nn][index2].length;x++){
        												if(domdata[nn][index2][x].line[index2]!=0){
        													issatisfy=0;
        													break nextindex;
        												}
        												if(x==maxcol){
        													// issatisfy=1;
        													break;
        												}
        											}
        										}
        									}
        								}
        								
        								if(issatisfy){
        									isvalid=1;
        									for(var nn=index1;nn<=maxrow&&nn<domdata.length;nn++){
        										if(nn==index1){
        								    		domdata[nn][index2][i].line[index2]++;
        											domdata[nn][index2][i].title=s.title;
        											domdata[nn][index2][i].type=s.type;
        											domdata[nn][index2][i].colspannum=domdata[nn][index2].length-i;
        											domdata[nn][index2].splice(i+1,domdata[nn][index2].length-i-1);
        										}
        										else if(nn==maxrow){
        											domdata[nn][index2][0].line[index2]++;
        											domdata[nn][index2][0].title=s.title;
        											domdata[nn][index2][0].type=s.type;
        											domdata[nn][index2][0].colspannum=maxcol+1;
        											domdata[nn][index2].splice(1,maxcol);
        										}
        										else{
        											domdata[nn][index2][0].line[index2]++;
        											domdata[nn][index2][0].title=s.title;
        											domdata[nn][index2][0].type=s.type;
        											domdata[nn][index2][0].colspannum=domdata[nn][index2].length;
        											domdata[nn][index2].splice(i+1,domdata[nn][index2].length-1);
        										}
        									}
        								}
        							}
        						}
        					}
        				})
        			})
        		});
        		this.domdata=domdata;
        	},
        	makedate:function(){
        		var dataarr=[];
        		var weekarr=[];
        		for(let i=0;i<this.daynum.length;i++){
        			weekarr.push(this.daynum[i]);
        			if((i+1)%7==0){
        				dataarr.push(weekarr);
        				weekarr=[];
        			}
        		}
        		return dataarr;
        	}
        }
	}
</script>
<style scoped>
.calender{
	margin-top: 30px;
	width: 100%;
	height: 100%;
	/*border:1px solid #ccc;*/
	overflow: hidden;
	margin: 0;
	padding:0;
	background-color: #fff;
}
.mar50{
	width: 90%;
	margin-top: 3px;
}
.selmon{
	text-align: center;
	height: 30px;
}
.btn-default{
	display: inline-block;
	width: 100px;
	height: 30px;
}
.form-control{
	display: inline-block;
	width: 200px;
	height: 30px;
}
table{
	border-collapse: collapse;
	width: 90%;
}
.table1{
	/*border: 1px solid yellow;*/
}
.bgtable{
	border: 1px solid #ccc;
}
.bgtable thead tr th{
	height: 30px;
	/*border: 1px solid red;*/
}
.bgtable tbody tr td{
	height: 90px;
	box-sizing:border-box;
	border:1px solid #ccc;
	text-align: right;
	vertical-align: top;
	/*border: 1px solid red;*/
}
.bgtable tbody tr td.gray{
	background-color: #eee;
}
.table2{
	width: 90%;
	/*height: 100%;*/
	box-sizing: border-box;
	padding-top: 30px;
	transform: translateY(-100%);
	/*border:1px solid green;*/
}
.table2 .row{
	height:90px;
	width: 100%;
	margin: 0;
	padding: 0;
	/*box-sizing: border-box;*/
	/*border:1px solid green;*/
}
.scheduletable{
	width: 100%;
	height: 100%;
	position: relative;
	table-layout:fixed;

	/*border:1px solid pink;*/
}
.table2 .row .scheduletable tr{
	width: 100%;
	height: 30px;
	/*border:1px solid green;*/
}
.table2 .row .scheduletable tr .td{
	/*width:14.286%;*/
	/*width: */
	padding-left: 10px;
	padding-right: 10px;
	box-sizing: border-box;
	/*word-wrap: break-word; word-break: break-all;*/
	/*border:1px solid green;*/
}
.table2 .row .scheduletable tr .daily{
	background-color: #FFB5C5;
	opacity: 0.5;
	line-height: 30px;
	border-radius: 20px;
}
.table2 .row .scheduletable tr .daily:overflow{
	background-color: #FFB5C5;
	opacity: 0.5;
	line-height: 30px;
	border-radius: 20px;
}
</style>