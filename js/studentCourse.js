var courseTests;

$(document).ready(function () {

    getCourseTests(getCookie(courseIDc), function (tests) {
        courseTests = tests;
    })

    getCourse(getCookie(courseIDc), function (data) {
        $("#CourseName").append(data["Name"]);
        $("#CourseLevel").append(data["Level"]);
        getUser(data["_Teacher"], function (teacher) {
            $("#CourseTeacher").append(teacher["LastName"] + " " + teacher["FirstName"]);
        });
    });

    getUsersCourse(getCookie(userIDc), function (courses) {
        let loaded = false
        courses.forEach(element => {
            if (element["_id"] === getCookie(courseIDc)) {
                $("#OnCourse").load("../html/studentOnCourse", "", onCourseFill);
                loaded = true;
            }
        });
        if (!loaded)
            notOnCourseFill();
    });
});


var onCourseFill = function () {
    let sumPoint = 0;
    let maxPoint = 0;
    getConcreteTests(getCookie(userIDc), function (userTests) {
        for (var i = 0; i < courseTests.length; i++) {
            for (var j = 0; j < userTests.length; j++) {
                if (courseTests[i]["_Test"] === userTests[j]["_Test"]) {
                    courseTests[i]["Taken"] = true;
                    sumPoint += userTests[j]["Result"];
                    maxPoint += userTests[j]["MaxPoints"];
                    addResult(j, userTests);
                }
            }
            if (courseTests[i]["Taken"] !== true)
                getTest(courseTests[i]["_Test"], function (test) {
                    $("#TakeTests").append("<tr id='" + test["_id"] + "' class='clickable-row' data-href=\"../html/takeTest.html\"><td> " + test["Name"] + " kitöltése</td></tr>");
                    $("#TakeTests .clickable-row").click(function () {
                        setCookie(testIDc, $(this).attr("id"), 90);
                        window.location = takeTestHtml;
                    });
                });
        }
        $("#SumPoints").append(sumPoint + "/" + maxPoint);
    });

    $("#SignOutBtn").on("click", function () {
        let urls = "http://tudvari.ddns.net:3000/usersCourses/"
        $.ajax({
            url: urls + getCookie(userIDc) + "/" + getCookie(courseIDc),
            type: "DELETE",
            dataType: "json",
            success: function (data) {
                alert("sikeresen lejelentkezett a kurzusról:"),
                window.location = studentIndexHtml
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    });
}

var addResult = function (index, userTests) {
    getTest(userTests[index]["_Test"], function (test) {
        $("#TestResults").append("<tr><td>" + test["Name"] + ":</td><td>" + userTests[index]["Result"] + "/" + userTests[index]["MaxPoints"] + "</td></tr>");
    });
}

var notOnCourseFill = function () {
    $("#NotOnCourse").append("<a href=\"#\"><button id='SignUpBtn'  type=\"button\" class=\"btn btn-primary\">Jelentkezés a kurzusra</button></a><br><br>");
    $("#SignUpBtn").on("click", function () {
        let resultData = [{
            name: "_User",
            value: getCookie(userIDc)
        },
        {
            name: "_Course",
            value: getCookie(courseIDc)
        }]
        let urls = "http://tudvari.ddns.net:3000/usersCourses";
        $.ajax({
            url: urls,
            type: "POST",
            dataType: "json",
            data: resultData,
            success: function (data) {
                alert("Sikeres kurzusra jelentkezés!");
                location.reload();
            },
            error: function (data) { console.log(JSON.stringify(data)); },
        });
    });
}