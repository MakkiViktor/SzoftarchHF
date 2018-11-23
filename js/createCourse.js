var urls = "http://tudvari.ddns.net:3000/courses";

$(document).ready(function () {
    authenticate();
    $("#createTest").submit(function () {
        var formData = $(this).serializeArray();
        getUser(getCookie(userNamec), function (user) {
            formData[formData.length] = {
                name: "_Teacher",
                value: user["_id"],
            }
            $.ajax({
                url: urls,
                type: "POST",
                dataType: "json",
                data: formData,
                success: function (data) { 
                    alert("Teszt létrehozva: " + data[1]) 
                    setCookies([{
                        name: userNamec,
                        value: user[userNamec]
                    },
                    {
                        name: courseIDc,
                        value: data["_id"]
                    }], 90);
                    window.location = teacherCourseHtml;
                },
                error: function (data) { console.log(JSON.stringify(data)); },
            });
        });
        return false;
    });
});