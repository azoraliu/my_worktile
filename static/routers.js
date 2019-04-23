import Header from '../src/components/Header';
import login from '../src/components/login';

import Message from'../src/components/Message'
import Calender from'../src/components/Calender'
import Projs from'../src/components/Projs'
import Pan from'../src/components/Pan'
import Paper from'../src/components/Paper'
import Contact from'../src/components/Contact'


import Companynotice from'../src/components/contacts/Companynotice'

import BusinessAnnouncement from'../src/components/messages/BusinessAnnouncement'
import projectassistant from'../src/components/messages/projectassistant'
import Robot from'../src/components/messages/Robot'
import Paperassistant from'../src/components/messages/Paperassistant'
import Panassistant  from'../src/components/messages/Panassistant'
import Dailyassistant from'../src/components/messages/Dailyassistant'

import Mywork from'../src/components/projects/Mywork'
import Workview from'../src/components/projects/Workview'
import Reportform from'../src/components/projects/Reportforms'
import Timeview from'../src/components/projects/Timeview'
import Peopleview from'../src/components/projects/Peopleview'
import Calenderview from'../src/components/projects/Calenderview'
import projectshow from'../src/components/projects/projectshow'

import Mydaily from'../src/components/calenders/Mydaily'
import Conference from'../src/components/calenders/Conference'

import Companyrule from'../src/components/pan/Companyrule'
import Companypic from'../src/components/pan/Companypic'
import Companyshare from'../src/components/pan/Companyshare'
import Personalpan from'../src/components/pan/Personalpan'
import Share from'../src/components/pan/Share'
import Reuse from'../src/components/pan/Reuse'

import Papersubmit from'../src/components/paper/Papersubmit'
import Papertosee from'../src/components/paper/Papertosee'
import Paperproblem from'../src/components/paper/Paperproblem'
import Mydaypaper from'../src/components/paper/Mydaypaper'
import Mymonthpaper from'../src/components/paper/Mymonthpaper'
import Myweekpaper from'../src/components/paper/Myweekpaper'
export const routes=[
    {path: '/login', component:login},
    {path: '/Header', component: Header,children:[
    {path:'/Calender',component:Calender,children:[
	{path: '/Mydaily', component: Mydaily},
	{path: '/Conference', component:Conference},
	{path: '/', component: Mydaily},]},

	{path:'/Message',component:Message,children:[
	{path: '/projectassistant', component: projectassistant},
	{path: '/BusinessAnnouncement', component: BusinessAnnouncement},
	{path: '/Robot', component:Robot},
	{path: '/Paperassistant', component: Paperassistant},
	{path: '/Panassistant', component: Panassistant},  
    {path: '/Dailyassistant', component:Dailyassistant},
	{path: '/', component: projectassistant}]},

	{path:'/Pan',component:Pan,children:[
	{path: '/Companyrule', component: Companyrule},
	{path: '/Companypic', component: Companypic},
	{path: '/Companyshare', component:Companyshare},
	{path: '/Personalpan', component: Personalpan},
	{path: '/Share', component: Share},  
    {path: '/Reuse', component:Reuse},
	{path: '/', component: Companyrule}]},

	{path:'/Projs',component:Projs,children:[
	{path: '/Mywork', name:'Mywork',component: Mywork},
	{path: '/Workview',name:'Workview', component:Workview},
	{path: '/Reportform',name:'Reportform',component:Reportform},
	{path: '/Timeview', name:'Timeview',component: Timeview},
	{path: '/Peopleview',name:'Peopleview',component:Peopleview},  
    {path: '/Calenderview',name:'Calenderview', component:Calenderview},
    {path: '/projectshow',name:'projectshow',component:projectshow},
	{path: '/',component: Mywork}]},

	{path:'/Paper',component:Paper,children:[
	{path: '/Papersubmit', component: Papersubmit},
	{path: '/Papertosee', component:Papertosee},
	{path: '/Paperproblem', component:Paperproblem},
	{path: '/Mydaypaper', component:Mydaypaper},
	{path: '/Mymonthpaper', component:Mymonthpaper},  
    {path: '/Myweekpaper', component:Myweekpaper},
	{path: '/', component: Papersubmit}]},

	{path:'/Contact',component:Contact,children: [ //这里就是二级路由的配置
    {path:'/Companynotice',component:Companynotice}]},

	{path:'*',direction:'Message'},
	{path:'/',component:Message}
    ]},
    {path: '/', component:login}
];