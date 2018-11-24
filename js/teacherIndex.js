$(document).ready(function(){
    getUser(getCookie(userNamec), function(user){
        getTeacherCourses(user["_id"], function(data){
            for(var rows = 0; rows < data.length; rows++)
                $("#Courses").append("<tr id='"+ data[rows]["_id"] +"' class=\"clickable-row\" data-href=\"../html/teacherCourse.html\"><th scope=\"row\">" + (rows + 1) + "</th><td>"+ data[rows]["Name"]+"</td><td>"+ data[rows]["Level"]+"</td></tr>");
            $(".clickable-row").click(function() {
                setCookie(courseIDc, $(this).attr("id"), 90);
                window.location = teacherCourseHtml;
            });
        })
    })
})

