$(document).ready(function(e) {
    $("#ajaxButton1").click(function() {
       
        var ajaxRequest = $.ajax({
            url: "https://dequeuniversity.com/assets/js/aria/ajax/content1.html",
            cache: false
        })
        ajaxRequest.done(function( html ) {
            $( "#ajaxContent1" ).html( html );
        });
     
        $("#ajaxButton1").focus();
        return false;
    });
    
    $("#ajaxButton1remove").click(function() {
        $("#ajaxContent1").empty();    
        $("#ajaxButton1remove").focus();
        return false;     
    });
});

