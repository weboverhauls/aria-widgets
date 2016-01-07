var initSaveButton = function() {
    $("#liveUpdate").attr("aria-live", "polite");

    $("#save").click(saveHandler);
}

var saveHandler = function(event) {
    event.preventDefault();
    $("#modalcancel").removeAttr("disabled");
    $("#liveUpdate").text("");
    $(".updating")
        .prependTo(".modal")
        .removeClass("hidden")
        .attr("tabindex", "0")
        .attr("aria-hidden", "false");
    $(".updated")
        .addClass("hidden")
        .prependTo(".save")
        .attr("aria-hidden", "true")
        .attr("tabindex", "-1");
    showModal();
    window.setTimeout(function() {
        $(".updating")
            .addClass("hidden")
            .prependTo(".save")
            .attr("aria-hidden", "true")
            .attr("tabindex", "-1");
        $(".updated")
            .removeClass("hidden")
            .attr("aria-hidden", "false")
            .prependTo(".modal")
            .attr("tabindex", "0");
        $("#liveUpdate").text($("#updated").text());
        $("#modalcancel").attr("disabled", "true");
    }, 3000);
}

var showModal = function() {
    $(".modal").addClass("active").removeAttr("aria-hidden").attr("role", "alertdialog");
    $("#modal-background").addClass("active");
    $("#modalok").focus();
}

$(document).ready(function() {
    initSaveButton();
    $(".modalbutton").click(function(event) {
        $(".modal")
            .removeClass("active")
            .attr("aria-hidden", "true");
        $("#modal-background").removeClass("active");
        $("#save").focus();
        event.preventDefault();
    });
});
