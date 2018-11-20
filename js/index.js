$(document).ready(function(){
    if(getCookie(userNamec) !== "")
        window.location = "html/" + studentIndexHtml;
	//TODO: studentHtml vagy teacherHtml a permission alapján, most elég lesz a student.
})