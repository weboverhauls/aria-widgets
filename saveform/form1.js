var initSaveButton = function() {
    $("#save").click(function(event) {
        event.preventDefault();
        $(".updating")
            .removeClass("hidden")
            .attr("tabindex", "0")
            .attr("aria-hidden", "false")
            .focus();
        $(".updated")
            .addClass("hidden")
            .attr("aria-hidden", "true")
            .attr("tabindex", "-1");
        $("#save").attr("disabled", "true");    
        window.setTimeout(function() {
            $(".updating")
                .addClass("hidden")
                .attr("aria-hidden", "true")
                .attr("tabindex", "-1");
            $(".updated")
                .removeClass("hidden")
                .attr("aria-hidden", "false")
                .attr("tabindex", "0")
                .focus();
                $("#save").removeAttr("disabled");    
            }, 3000);
    });
}

$(document).ready(function() {
    initSaveButton();
});
