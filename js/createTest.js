var urls = "http://tudvari.ddns.net:3000/tests";
var rows = 0;
$(document).ready(function () {
    authenticate();
    $("#createTest").submit(function () {
        var formData = $(this).serializeArray();
        if(rows === 0){
            alert("Nincs szópár");
            return false;
        }
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
    $("#AddWordBtn").on("click", function () {
        rows++;
        $("#Words").append("<tr id = 'Word" + rows + "'><th scope='row'>" + rows + "</th><td><input type='text' value='' name='Word1'></td><td><input type='text' value='' name='Word2'></td></tr>");
    });
    $("#DelWordBtn").on("click", function () {
        $("#Word" + rows).first().remove();
        rows--;
    });

});