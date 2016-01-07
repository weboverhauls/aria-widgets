$(document).ready(function(e) {
    $('#trigger-alertdialog').click(function() {
        $('#skipnav').attr('aria-hidden', 'true');
        $('#container').attr('aria-hidden', 'true');
        var bgOverlay = $('<div>').attr({
            class: "bgOverlay",
            tabindex: "0"
        });
        $(bgOverlay).appendTo('body');
        var dialog = $('<div>').attr({
            role: "alertdialog",
            "aria-labelledby": "alertHeading",
            "aria-describedby": "alertText",
            tabindex: "0",
            "aria-hidden": "false"
        });
        $(dialog).html('<div id="firstElement" tabindex="0"></div><h1 id="alertHeading">Warning</h1><div id="alertText" class="center">Are you sure you want to delete this item?</div><p class="center"><button id="deleteButton">Delete</button> <button id="cancelButton">Cancel</button></p><div id="lastElement" tabindex="0"></div>').appendTo('body');
        $("#deleteMsg").text("").removeClass("alert");
        $('#deleteButton').focus();

        $('#lastElement').focusin(function(e) {
            $('#deleteButton').focus();
        });
        $('#firstElement').focusin(function(e) {
            $('#cancelButton').focus();
        });

        $("#deleteButton").click(function(e) {
            $('#skipnav').removeAttr('aria-hidden');
            $('#container').removeAttr('aria-hidden');
            $(bgOverlay).remove();
            $(dialog).remove();
            $("#trigger-alertdialog").focus();
            $("#deleteMsg").addClass("alert").addClass("alertSuccess").text("The item has been deleted.");

        });
        $("#cancelButton").click(function(e) {
            $('#skipnav').removeAttr('aria-hidden');
            $('#container').removeAttr('aria-hidden');
            $(bgOverlay).remove();
            $(dialog).remove();
            $("#trigger-alertdialog").focus();

        });

        $(document).keydown(function(e) {
            if (e.keyCode == 27) {
                $('#skipnav').removeAttr('aria-hidden');
                $('#container').removeAttr('aria-hidden');
                $(bgOverlay).remove();
                $(dialog).remove();
                $("#trigger-alertdialog").focus();
            }

        });
        return false;
    });

});