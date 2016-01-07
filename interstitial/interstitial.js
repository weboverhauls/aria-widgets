$(document).ready(function(e) {
    $("#launchInterstitialView").click(function() {

        var originalContent;
        originalContent = $("body").html();

        $("body").html('<div id="liveContainer" aria-live="assertive"></div>');

        var timeout1;
        timeout1 = window.setTimeout(delay1, 300);

        function delay1() {
            var ajaxRequest = $.ajax({
                url: "https://dequeuniversity.com/assets/js/aria/interstitial/interstitialWait.html",
                cache: false
            })
            ajaxRequest.done(function(html) {
                $("#liveContainer").html(html);
            });
        }

        var timeout2;
        timeout2 = window.setTimeout(delay2, 4000);

        function delay2() {
            $("body").html(originalContent);

            $("#interstitialP").html('<button id="startOver">Start Over</button>');

            var ajaxRequest = $.ajax({
                url: "https://dequeuniversity.com/assets/js/aria/interstitial/flightResults.html",
                cache: false
            })
            ajaxRequest.done(function(html) {
                $("#flightResults").html(html);
            });

            $("#startOver").click(function() {

                location.reload(true);
                return false;
            });

            var timeout3;
            timeout3 = window.setTimeout(delay3, 1000);

            function delay3() {
                $("#flightResults").focus();
            }
        }
        return false;
    });
});