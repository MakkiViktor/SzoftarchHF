$(document).ready(function(){
    if(getCookie(userNamec) !== "")
        getUser(getCookie(userNamec), function(user){
            if(user[permissionc] === 1)
                window.location = teacherIndexHtml;
            else window.location = studentIndexHtml;
        });
	
})