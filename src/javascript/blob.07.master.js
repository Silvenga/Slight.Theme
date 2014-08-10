//////////////////////////////////////////////////

var enable_disques = true;
var disqus_shortname = 'silvenga-blog-ghost';

//////////////////////////////////////////////////

jQuery(function ($) {

    var history = window.History;
    var $ajaxContainer = $('#ajax-container');

    setTimeout(function () {
        (function () {

            // Bring everything in nicely
            //$(".fade").lazyView();
            var color = genColor("" + document.title);

            $ajaxContainer.find(".nav-banner").css('background-color', color);
            $ajaxContainer.find(".banner").css('background-color', color);

            // See if we can enable Ajax'ed requests
            enableAjax();

            // Load the javascript for every page
            onLoaded();

            // Prevent flashing when scroll bars apear/hide 
            $(window).on("resize", sizeForScroll);

            // Run the scripts after ajax (ajax looses scripts)
            $(document).on("ajax.completed", onLoaded);

        }());
    }, 0);

    function enableAjax() {

        // Got Ajax?
        if (!history.enabled) {
            console.log("Ajax not supported. :(");
            return false;
        }

        // Progress bar for Ajax
        Pace.start();
        Pace.restart();

        // Make any link Ajax'ible
        $('body').on('click', 'a', doAjaxLink);

        // The backbone of Ajax
        history.Adapter.bind(window, 'statechange', onStateChanged);
    }

    function onLoaded() {

        attempt(function () {
            attachEvents();
        });

        attempt(function () {
            sizeForScroll();
        });

        attempt(function () {
            attachDisqus();
        });

        attempt(function () {
            $('[data-gist-id]').gist();
        });

        attempt(function () {
            //  $(".fade").lazyView();
        });
    }

    function attempt(func) {
        setTimeout(function () {
            try {
                func();
            }
            catch (err) {
                console.log(err);
            }
        }, 0);
    }

    function attachEvents() {

        $(".hover-parrent").on("mouseenter", function () {

            $(this).addClass("onhover");
        });

        $(".hover-parrent").on("mouseleave", function () {

            $(this).removeClass("onhover");
        });
    }

    function attachDisqus() {

        if (enable_disques) {
            // Have we already loaded Disqus?
            if ($("#disqus_script").length > 0) {

                // if id is seen, then run the comments reset script

                DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.identifier = $("#page-id").text();
                        this.page.url = history.getState().url;
                    }
                });

            } else if ($("#disqus_thread").length > 0 && $("#disqus_script").length == 0) {

                // We have no Disqus scripts loaded, lets fix that

                var disqus_identifier = $("#page-id").text();
                (function () {
                    var dsq = document.createElement('script');
                    dsq.id = "disqus_script";
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                })();
            }
        }
    }

    function onStateChanged() {

        var state = history.getState();

        $(".main-container").addClass("going-container").removeClass("main-container");

        // Move user to top of page (mainly for phone users)
        $('html, body').animate({ 'scrollTop': 0 });

        // Fade out to ajax
        $("#main-footer").fadeOut(100);

        var $tempDiv = $("<div/>", {
            id: $ajaxContainer.id
        });

        setTimeout(function () {
            $tempDiv.load(state.url + ' #ajax-content', function (response, status, xhr) {

                var oldColor = $ajaxContainer.find(".nav-banner").css('background-color');

                $tempDiv.find(".nav-banner").css('background-color', "transparent");
                $tempDiv.find(".banner").css('background-color', oldColor);

                // Anything happened?
                if (status != "success" && status != "notmodified") {

                    // Bad happened
                    $ajaxContainer.html("<br>Error? " + status);
                    $(".going-container").addClass("main-container").removeClass("going-container");
                }

                // We are removing title info, get it before its gone.
                document.title = $tempDiv.find("#title").text();

                // Unhide
                $("#main-footer").fadeIn(100);
                $ajaxContainer.html($tempDiv);

                // Move to top
                $('html, body').animate({
                    scrollTop: $("#ajax-content").offset().top
                }, 400);

                // Tell everyone of the new page
                $.event.trigger({
                    type: "ajax.completed",
                    title: $("#title").text(),
                    url: state.url
                });

                var color = genColor("" + document.title);

                $ajaxContainer.find(".nav-banner").css('background-color', color);
                $ajaxContainer.find(".banner").css('background-color', color);

                Pace.stop();
            });
        }, 400);
    }

    function doAjaxLink(e) {

        // Figure out if link can ajax
        if (isExternal($(this).attr('href')) || $(this).hasClass('light-box') || $(this).hasClass('disable-ajax'))
            return true;

        // The link is ajaxible, disable normal action
        e.preventDefault();

        // Then change the state
        var currentState = history.getState();
        var url = $(this).attr('href');
        var title = $(this).attr('title') || null;

        if (url !== currentState.url.replace(/\/$/, "")) {

            history.pushState({}, title, url);
        }
    }

    function sizeForScroll() {

        var bodyWidth = (hasScrollBar()) ? $(window).width() : $(window).width() - getScrollBarWidth();
        $('body').width(bodyWidth);
    }

    function hasScrollBar() {

        return $("body")[0].scrollHeight > $("body")[0].clientHeight;
    }

    function getScrollBarWidth() {

        var scrollTester = document.createElement("div");
        scrollTester.className = "scrollbar-measure";
        document.body.appendChild(scrollTester);

        var scrollBarWidth = scrollTester.offsetWidth - scrollTester.clientWidth;
        document.body.removeChild(scrollTester);

        return scrollBarWidth;
    }

    function isExternal(url) {

        if (url.indexOf("mailto:") === 0)
            return true;

        var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);

        if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
            return true;
        if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[location.protocol] + ")?$"), "") !== location.host)
            return true;
        return false;
    }

    function genHash(text, mod) {

        var hash = 0;

        for (var i = 0; i < text.length; i++) {

            hash += text.charCodeAt(i);
        }

        hash *= 7;

        var simpleHash = hash % mod;

        console.log("Hash: " + hash + " " + simpleHash);

        return simpleHash;
    }

    function genColor(text) {

        var i = genHash(text, colors.length);

        return "#" + colors[i];
    }

    var colors = [
        "e51c23", "9c27b0", "673ab7",
        "3f51b5", "5677fc", "03a9f4",
        "009688", "795548", "259b24",
        "8bc34a", "ffc107", "ff5722",
        "607d8b", "9e9e9e", "00bcd4"];
});