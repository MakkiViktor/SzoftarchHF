$(document).ready(function(){
    getCourse(getCookie(courseIDc), function(data){
        $("#CourseName").val(data["Name"]);
        $("#CourseLevel").val(data["Level"]);
        getCourseUsers(getCookie(courseIDc), function(data){
            
        });
    });
})