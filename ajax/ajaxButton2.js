$(document).ready(function(e) {
    $("#ajaxButton2").click(function() {
       
        var ajaxRequest = $.ajax({
            url: "https://dequeuniversity.com/assets/js/aria/ajax/content2.html",
            cache: false
        })
        ajaxRequest.done(function( html ) {
            $( "#ajaxContent2" ).html( html );
        });
        $("#ajaxContent2update").empty();
        $("#ajaxButton2").focus();
        return false;
    });
    
    $("#ajaxButton2remove").click(function() {
		if ($('#ajaxContent2').is(':empty')){

		}
		else {
			$("#ajaxContent2").empty();  
			$("#ajaxContent2update").html("<p>The AJAX content has been removed.</p>");  
			$("#ajaxButton2remove").focus();
			return false; 
		}
    });
});

