
$(document).ready(function(){
    getUsersCourse(getCookie(userIDc), function(userCourses){
        userCourses.forEach(element => {
            getUser(element["_Teacher"], function(teacher){
                $("#StudentCourses").append("<tr id = '" + element["_id"] +"' class=\"clickable-row\" data-href=\"../html/studentCourse.html\"><th scope=\"row\">"+ ($("#StudentCourses tr").length + 1)+"</th><td>"+ element["Name"] +"</td><td>"+ element["Level"]+"</td><td>"+ teacher["LastName"] + " " + teacher["FirstName"] +"</td></tr>");
                $("#StudentCourses .clickable-row").click(function() {
                    setCookie(courseIDc, $(this).attr("id"), 90);
                    window.location = studentCourseHtml;
                });
            });
        });
    });

    getCourses(function(courses){
        courses.forEach(element => {
            getUser(element["_Teacher"], function(teacher){
                $("#AllCourses").append("<tr id = '" + element["_id"] +"' class=\"clickable-row\" data-href=\"../html/studentCourse.html\"><th scope=\"row\">"+ ($("#AllCourses tr").length + 1)+"</th><td>"+ element["Name"] +"</td><td>"+ element["Level"]+"</td><td>"+ teacher["LastName"] + " " + teacher["FirstName"] +"</td></tr>");
                $("#AllCourses .clickable-row").click(function() {
                    setCookie(courseIDc, $(this).attr("id"), 90);
                    window.location = studentCourseHtml;
                });
            });
        });
    });
});