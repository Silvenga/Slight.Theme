function isExternal(url) {
    if (url.indexOf("mailto:") === 0) return true;
    var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
    if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
    if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[location.protocol] + ")?$"), "") !== location.host) return true;
    return false;
}

jQuery(function ($) {

    var history = window.History;
    var $ajaxContainer = $('#ajax-container');

    if (!history.enabled) {
        console.log("Ajax not supported. :(");
        return false;
    }

    // Make the ajax status bar
    Pace.start();
    Pace.restart();

    history.Adapter.bind(window, 'statechange', function () {

        var state = history.getState();

        // Move user to top of page (mainly for phone users)
        $('html, body').animate({ 'scrollTop': 0 });

        // Fade out to ajax
        $("#main-footer").fadeOut(100);
        $ajaxContainer.fadeOut(100);

        // Hate the flashing scoll
        sizeForScroll();

        $('#ajax-container').load(state.url + ' #ajax-content', function (response, status, xhr) {

            // Anything happened?
            if (status != "success" && status != "notmodified") {

                var msg = $('<div>', { html: response });
                msg = msg.find('#ajax-content').html();

                $("#ajax-container").html(msg);
            }

            // We are removing title info, get it before its gone.
            document.title = $("#title").text();

            // We lost conntent, most likely need to resize for the missing scoll bar
            sizeForScroll();

            // Unhide
            $ajaxContainer.fadeIn(0);
            $("#main-footer").fadeIn(0, function() {
                 Pace.stop();
            });

            // Move to top
            $('html, body').animate({
                scrollTop: $("#ajax-content").offset().top - 90
            }, 400);

            // Run the scripts after ajax (ajax looses scripts)
            try {
                start();
            }
            catch (err) {
                console.log(err);
            }

            // My own analytics, may fail, but we handle anyway 
            try {
                _paq.push(['setDocumentTitle', $("#title").text()]);
                _paq.push(['setCustomUrl', state.url]);
                _paq.push(['trackPageView']);
            }
            catch (err) {}
        });
    });

    $('body').on('click', 'a', function (e) {

        // Figure out if like that we can ajax
        if (isExternal($(this).attr('href')) || $(this).hasClass('light-box'))
            return true;

        // The link is ajaxible, disable normal action
        e.preventDefault();

        // Then do the request
        var currentState = history.getState();
        var url = $(this).attr('href');
        var title = $(this).attr('title') || null;

        if (url !== currentState.url.replace(/\/$/, "")) {

            history.pushState({}, title, url);
        }
    });
});