$(document).ready(function(){
    var display = $("#Timer");
    startTimer(60*5, display);
    setTimeout(function(){
        alert("Lejárt a test kitöltésére megengedett idő");
        testSubmit();
     }, 5*60*1000);
    getTest(getCookie(testIDc), function(test){
        $("#TestName").append(test["Name"]);
        $("#TestLevel").append(test["Level"]);
    });
    getTestWordPairs(getCookie(testIDc), function(words){
        for (var rows = 0; rows < words.length; rows++) {
            $("#TestWords").append("<tr id = '"+ words[rows]["_id"] + "'><th scope=\"row\">" + (rows + 1) + "</th><td>"+ words[rows]["Word1"] + "</td><td><input type=\"text\" id=\"word1\" name=\"Word2\" size=\"20\" ></td></tr>");
        }
    });
    $("#TestForm").submit(testSubmit);
})

var testSubmit = function(){
    var formData = $(this).serializeArray();
    var resultData = [];
    for (let i  = 0; i < formData.length; i++) {
        resultData[resultData.length] = {
             name : "Ids" ,
             value:  $("#TestWords tr")[i]["id"]
        };
        resultData[resultData.length] = {
            name: "Answers",
            value: formData[i]["value"]
        };
    }
    resultData[resultData.length] = {
        name: "_User",
        value: getCookie(userIDc)
    }
    resultData[resultData.length] = {
        name: "_Test",
        value: getCookie(testIDc)
    }
    let urls = "http://tudvari.ddns.net:3000/concreteTests";
    $.ajax({
        url: urls,
        type: "POST",
        dataType: "json",
        data: resultData,
        success: function (data) { 
            alert("Teszt beküldve, elért pontszám: " + data["Result"]) 
            window.location = studentCourseHtml;
        },
        error: function (data) { console.log(JSON.stringify(data)); },
    });
    return false;
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
