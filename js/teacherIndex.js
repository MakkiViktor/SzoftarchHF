$(document).ready(function(){
    getUser(getCookie(userNamec), function(user){
        getUserCourses(user["_id"], function(data){
            for(var rows = 0; rows < data.length; rows++)
            $("#Courses").append("<tr class='clickable-row' data-href='../html/teacherCourse.html'><th scope='row'>" + (rows + 1) + "</th><td>"+ data[rows]["Name"]+"</td><td>"+ data[rows]["Level"]+"</td></tr>");
        })
    })
})