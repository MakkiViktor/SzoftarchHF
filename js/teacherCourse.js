var urls = "http://tudvari.ddns.net:3000/coursesTests";
var coureseTests;

$(document).ready(function(){

    getCourseTests(getCookie(courseIDc), function(tests){
        coureseTests = tests;
    })

    getCourse(getCookie(courseIDc), function(data){
        $("#CourseName").append(data["Name"]);
        $("#CourseLevel").append(data["Level"]);
        getCourseUsers(getCookie(courseIDc), function(users){
            $("#StundentNumber").append(users.length);
            for(var rows = 0; rows < users.length; rows++){
                let sumPoint = 0;
                getConcreteTests(users[rows]["_id"], function(userTests){
                        for(var ct = 0 ; ct < courseTests.length ; ct++){
                            for(var j = 0 ; j < userTests.length ; j++){
                                if(courseTests[ct]["_Test"] === userTests[j]["_Test"])
                                sumPoint += userTests[j]["Result"];
                            }                                                  
                        }
                        $("#Students").append("<tr><th scope='row'>"+ (rows + 1) + "</th><td>"+ users[rows]["FirstName"] + " " + users[rows]["LastName"] +"</td><td><a href='#'>"+ sumPoint + "</a></td></tr>");    
                });
            }
        });
    });

    getTests(function(tests){
        let rows = 1;
        for(var i = 0; i < tests.length; i++){
            $("#tests").append("<option id = '" + tests[i]["_id"] + "' value='"+ tests[i]["Name"] +"'>");
            coureseTests.forEach(element => {
                if(tests[i]["_id"] === element["_Test"]){
                    $("#CourseTests").append("<tr><th scope='row'>"+ rows + "</th><td>"+ tests[i]["Name"] + "</td><td>"+ tests[i]["Level"] + "</td></tr>");     
                    rows++;
                }
            });
        }
    });
    
    $("#addTest").submit(function(){
        let testID; //ezt ki kell szedni valahogy
        $("#tests option").each(function(){
            if($(this).val() === $("#_Test").val()){
                testID = $(this).attr("id");
            }
        });

        var formData = $(this).serializeArray();
        formData[formData.length] = {
            name: "_Course",
            value: getCookie(courseIDc)
        }
        formData[0]["value"] = testID;
        
        $.ajax({
            url: urls,
            type : "POST",
            dataType: "json",
            data : formData,
            success: function(data) {
                let rows = $("#CourseTests tr").length + 1; 
                //TODO:  ezt javítani kell, vagy hogy ne legyen lekérdezés, és a post kapá
                getTest(data["_Test"], function(test){
                    $("#CourseTests").append("<tr><th scope='row'>"+ rows + "</th><td>"+ test["Name"] + "</td><td>"+ test["Level"] + "</td></tr>");
                });
                alert("Sikeresen hozzá lett adva a teszt");
             },
            error: function(data) { 
                console.log(JSON.stringify(data));
                alert(serverError); 
            },
        });
        return false;
    });


});