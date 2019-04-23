var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id, name, password) values (0, ?, ?)',
        search: 'select * from user where name= ? and password= ? ',
        alluser:'select name from user',
        addproject:'insert into projects(proid, projectname,projectintro, begindate, enddate, projecttype, projectmember) values (?,?,?,?,?,?,?)',
        allproject:'select * from projects',
        allschedule:'select * from schedule',
        addschedule:'insert into schedule(title, start, end,type) values (? , ?, ?, ?)',
        delschedule:'delete from schedule where title=?',
    }
}
 
module.exports = sqlMap;