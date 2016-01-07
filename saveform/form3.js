var initSaveButton = function() {
    $("#liveUpdate").attr("role", "alert");

    $("#save").click(saveHandler);
}

var saveHandler = function(event) {
    event.preventDefault();
    $(".updating")
        .removeClass("hidden")
        .attr("tabindex", "0")
        .attr("aria-hidden", "false");
    $(".updated")
        .addClass("hidden")
        .attr("aria-hidden", "true")
        .attr("tabindex", "-1");
    $(".updated").appendTo(".save");  
    $(".updating").appendTo("#liveUpdate");
    $("#save").off("click").click(function(e) {e.preventDefault();});
    window.setTimeout(function() {
        $(".updating")
            .addClass("hidden")
            .attr("aria-hidden", "true")
            .attr("tabindex", "-1");
        $(".updated")
            .removeClass("hidden")
            .attr("aria-hidden", "false")
            .attr("tabindex", "0");
        //       $("#save").removeAttr("disabled");    
        $(".updating").appendTo(".save");
        $(".updated").appendTo("#liveUpdate");
        $("#save").off("click").click(saveHandler);
    }, 3000);
}

$(document).ready(function() {
    initSaveButton();
});
