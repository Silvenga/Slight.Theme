//////////////////////////////////////////////////

var enable_disques = ("@@enableDisques" === "true");
var disqus_shortname = "@@disqusShortname";

//////////////////////////////////////////////////

jQuery(function ($) {

    var history = window.History;
    var $ajaxContainer = $("#ajax-container");

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

    function lightBox() {

        $(".body p img").each(function () {

            var $image = $(this);

            var $wrapper = $("<a/>", {
                "href": $image.attr("src"),
                "class": "light-box"
            });

            $image.wrap($wrapper);

        });

        $(".light-box").fluidbox();

        $(window).resize(); // fixes small images for some reason TODO
    }

    function attachDisqus() {

        if (enable_disques) {
            // Have we already loaded Disqus?

            if ($("#disqus_thread").length > 0) {

                if ($("#disqus_script").length > 0) {

                    // if id is seen, then run the comments reset script
                    window.DISQUS.reset({
                        reload: true,
                        config: function () {
                            this.page.identifier = $("#page-id").text();
                            this.page.url = history.getState().url;
                        }
                    });

                } else {

                    var dsq = document.createElement("script");
                    dsq.id = "disqus_script";
                    dsq.async = true;
                    dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";
                    document.getElementsByTagName("head")[0].appendChild(dsq);
                }
            }
        }
    }

    function onStateChanged() {

        var state = history.getState();

        $(".main-container").addClass("going-container").removeClass("main-container");

        // Move user to top of page (mainly for phone users)
        $("html, body").animate({ 'scrollTop': 0 });

        // Fade out to ajax
        $("#main-footer").fadeOut(100);

        var $tempDiv = $("<div/>", {
            id: $ajaxContainer.id
        });

        var animation = $.Deferred();
        var ajax = $.Deferred();

        $(".main-container").addClass("going-container").removeClass("main-container");

        $tempDiv.load(state.url + " #ajax-content", function (response, status) {

            // Anything happened?
            if (status !== "success" && status !== "notmodified") {

                // Bad happened
                $tempDiv.html("<br>Error? " + status);
                $(".going-container").addClass("main-container").removeClass("going-container");
            }

            // We are removing title info, get it before its gone.
            document.title = $tempDiv.find("#title").text();

            Pace.stop();
            ajax.resolve();
        });

        setTimeout(function () {
            animation.resolve();
        }, 400);

        $.when(animation, ajax).then(function () {

            // Unhide
            $("#main-footer").fadeIn(100);
            $ajaxContainer.html($tempDiv.html());

            // Tell everyone of the new page
            $.event.trigger({
                type: "ajax.completed",
                title: $("#title").text(),
                url: state.url
            });

            // Move to top
            $("html, body").animate({
                scrollTop: $(".nav-bar").offset().top //- 120
            }, 400);
        });
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

    function doAjaxLink(e) {

        var $this = $(this);

        // Figure out if link can ajax
        if ($this.hasClass("light-box") || isExternal($this.attr("href")) || $this.hasClass("disable-ajax"))
            return true;

        // The link is ajaxible, disable normal action
        e.preventDefault();

        // Then change the state
        var url = $this.attr("href");
        var title = $this.attr("title") || null;

        if (url !== history.getState().url.replace(/\/$/, "")) {

            history.pushState({}, title, url);
        }

        return false;
    }

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
        $("body").on("click", "a", doAjaxLink);

        // The backbone of Ajax
        history.Adapter.bind(window, "statechange", onStateChanged);

        return true;
    }

    function onLoaded() {

        attempt(function () {
            if (Ghost.isAuthenticated()) {
                $(".ghost-authed").show();
                $("#ghost-edit-page").on("click", function () {
                    Ghost.edit($("#page-id").text());
                });
            }
        });

        attempt(function () {
            setTimeout(function () {
                $(".flow").removeClass("flow");
            }, (100 * 10));
        });

        attempt(function () {
            $(".body p img").parent().addClass("image-p");
            $(".body p code[data-gist-id]").parent().addClass("image-p");
        });

        attempt(function () {
            attachDisqus();
        });

        attempt(function () {
            lightBox();
        });

        attempt(function () {
            $("[data-gist-id]").gist();
        });
    }

    setTimeout(function () {
        (function () {

            // Load the javascript for every page
            onLoaded();

            // See if we can enable Ajax'ed requests
            enableAjax();

            // Run the scripts after ajax (ajax looses scripts)
            $(document).on("ajax.completed", onLoaded);
        }());
    }, 0);
});