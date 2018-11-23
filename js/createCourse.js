var urls = "http://tudvari.ddns.net:3000/courses";

$(document).ready(function () {
    authenticate();
    $("#createTest").submit(function () {
        var formData = $(this).serializeArray();
        getUser(getCookie(userNamec), function (user) {
            formData[formData.length] = {
                name: "_Creator",
                value: user["_id"],
            }
            $.ajax({
                url: urls,
                type: "POST",
                dataType: "json",
                data: formData,
                success: function (data) { alert("Teszt létrehozva: " + data[1]) },
                error: function (data) { console.log(JSON.stringify(data)); },
            });
        })

    });