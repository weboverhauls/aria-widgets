var initSaveButton = function() {
    $("#liveUpdate").attr("aria-live", "polite");

    $("#save").click(saveHandler);
}

var saveHandler = function(event) {
    event.preventDefault();
    $(".updating")
        .removeClass("hidden")
        .attr("tabindex", "0")
        .attr("aria-hidden", "false");
    $("#save").off("click").click(function(e) {e.preventDefault();});
    $(".updating").appendTo("#liveUpdate");
    window.setTimeout(function() {
        $(".updating")
            .addClass("hidden")
            .attr("aria-hidden", "true")
            .attr("tabindex", "-1");
        $(".updating").appendTo(".save");
        $("#save").off("click").click(saveHandler);
        window.alert("Your user profile has been updated.");
    }, 3000);
}

$(document).ready(function() {
    initSaveButton();
});
