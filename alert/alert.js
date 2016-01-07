$(document).ready(function(e) {
    $("#successForm button").click(function() {
        $("#successForm .msg").addClass("alert alertSuccess");
        $("#successForm .msgTxt").html("Your preferences have been saved.");
        $("#successForm button").focus();
        return false;
    });
    $("#successForm2 button").click(function() {
        $("#successForm2 .msg").addClass("alert alertSuccess");
        $("#successForm2 .msgTxt").html("Your preferences have been saved.");
        $("#successForm2 .msgButton").removeClass("displayNone").addClass("displayInline");
        $("#successForm2 .close").focus();
        return false;
    });
    $("#successForm2 .close").click(function() {
        $("#successForm2 .msg").removeClass("alert alertWarning center");
        $("#successForm2 .msgTxt").empty();
        $("#successForm2 .msgButton").removeClass("displayInline").addClass("displayNone");
        $("#successForm2 button").focus();
        return false;
    });    
    $("#errorForm button").click(function() {
        $("#errorForm .msg").addClass("alert alertError");
        $("#errorForm .msgTxt")
        .html("<strong>Error:</strong> Connection lost. Your preferences could not be saved.");
        $("#errorForm button").focus();
        return false;
    });
    $("#errorForm2 button").click(function() {
        $("#errorForm2 .msg").addClass("alert alertError");
        $("#errorForm2 .msgTxt")
        .html("<strong>Error:</strong> Connection lost. Your preferences could not be saved.");
        $("#errorForm2 .msgButton").removeClass("displayNone").addClass("displayInline");
        $("#errorForm2 .close").focus();
        return false;
    });
    $("#errorForm2 .close").click(function() {
        $("#errorForm2 .msgTxt").empty();
        $("#errorForm2 .msgButton").removeClass("displayInline").addClass("displayNone");
        $("#errorForm2 .msg").removeClass("alert alertInfo");
        $("#errorForm2 button").first().focus();
        return false;
    });    
    $("#warningForm button").click(function() {
        $("#warningForm .msg").removeClass("alertSuccess").addClass("alert alertWarning center");
        $("#warningForm .msgTxt")
        .html("<strong>Warning!</strong> You cannot undo this action!<br>");
        $("#warningForm .msgButton").removeClass("displayNone").addClass("displayInline");
        $("#warningForm #warningOk").focus();
        return false;
    });
    $("#warningForm .cancel").click(function() {
        $("#warningForm .msg").removeClass("alert alertWarning center");
        $("#warningForm .msgTxt").empty();
        $("#warningForm .msgButton").removeClass("displayInline").addClass("displayNone");
        $("#warningForm button").first().focus();
        return false;
    });    
    $("#warningForm .msg #warningOk").click(function() {
        $("#warningForm .msgTxt").html("Your profile has been deleted.");
        $("#warningForm .msg").removeClass("alertWarning center")
        .addClass("alertSuccess");
        $("#warningForm .msgButton").removeClass("displayInline").addClass("displayNone");
        $("#warningForm button").first().focus();
        return false;
    });    
    $("#infoForm button").click(function() {
        $("#infoForm .msg").addClass("alert alertInfo");
        $("#infoForm .msgTxt")
        .html("Your last login was yesterday at 10:00am");
        $("#infoForm button").focus();
        return false;
    });
    $("#infoForm2 button").click(function() {
        $("#infoForm2 .msg").addClass("alert alertInfo");
        $("#infoForm2 .msgTxt")
        .html("Your last login was yesterday at 10:00am");
        $("#infoForm2 .msgButton").removeClass("displayNone").addClass("displayInline");
        $("#infoForm2 .close").focus();
        return false;
    });
    $("#infoForm2 .close").click(function() {
        $("#infoForm2 .msgTxt").empty();
        $("#infoForm2 .msgButton").removeClass("displayInline").addClass("displayNone");
        $("#infoForm2 .msg").removeClass("alert alertInfo");
        $("#infoForm2 button").first().focus();
        return false;
    });    
});
