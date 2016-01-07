$(document).ready(function(e) {
    $("#ajaxButton3").click(function() {
       
        var ajaxRequest = $.ajax({
            url: "https://dequeuniversity.com/assets/js/aria/ajax/content3.html",
            cache: false
        })
        ajaxRequest.done(function( html ) {
            $( "#ajaxContent3" ).html( html );
        });
        $("#ajaxContent3update").empty();
		
		var timeoutID;

		timeoutID = window.setTimeout(slowFocus, 500);
		
		function slowFocus() {
		  $("#ajaxContent3").focus();
		}
        return false;
    });
    
    $("#ajaxButton3remove").click(function() {
		if ($('#ajaxContent3').is(':empty')){

		}
		else {
			$("#ajaxContent3").empty();  
			$("#ajaxContent3update").html("<p>The AJAX content has been removed.</p>");  
			$("#ajaxContent3update").focus();
			return false; 
		}
    });
});

