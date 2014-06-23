//////////////////////////////////////////////////

var disqus_shortname = 'silvenga-blog-ghost';

//////////////////////////////////////////////////

function start() {

    $(".hover-parrent").on("mouseenter", function () {

        $(this).addClass("onhover");
    });

    $(".hover-parrent").on("mouseleave", function () {

        $(this).removeClass("onhover");
    });

    //    $('.hover-parrent').bind('touchstart', function () {
    //
    //        $(this).addClass("onhover");
    //    });

    $(window).scroll(function () {

        if ($(document).scrollTop() > 50) {

            $(".sticky-menu").addClass("menu-small");
        } else {

            $(".sticky-menu").removeClass("menu-small");
        }
    });

    sizeForScroll();

    try {

        // if id is seen, then run the comments reset script
        if ($("#disqus_script").length > 0) {

            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = $("#page-id").text();
                    this.page.url = history.getState().url;
                }
            });

        } else if ($("#disqus_thread").length > 0 && $("#disqus_script").length == 0) {

            // Reset the comments script?
            $("#disqus_script").remove();

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
    catch (err) {
        console.log(err);
    }

    // Download Gists
    try {
        readGists();
    }
    catch (err) {
        console.log(err);
    }

    try {
        $("#ajax-container").lazyView();
    }
    catch (err) {
        console.log(err);
    }

    // Lightbox
    attachLightBox();
}

$("body").lazyView();

start();

$(window).resize(function () {

    sizeForScroll();
});

//var timer;
//window.addEventListener('resize', function () {
//
//    //sizeForScroll();
//});
//
//var iframe = document.createElement('iframe');
//iframe.id = "hacky-scrollbar-resize-listener";
//iframe.style.cssText = 'height: 0; background-color: transparent; margin: 0; padding: 0; overflow: hidden; border-width: 0; position: absolute; width: 100%;';
//
//// Register our event when the iframe loads
//iframe.onload = function () {
//    // The trick here is that because this iframe has 100% width 
//    // it should fire a window resize event when anything causes it to 
//    // resize (even scrollbars on the outer document)
//    iframe.contentWindow.addEventListener('resize', function () {
//        try {
//            var evt = document.createEvent('UIEvents');
//            evt.initUIEvent('resize', true, false, window, 0);
//            window.dispatchEvent(evt);
//        } catch (e) { }
//    });
//};
//
//document.body.appendChild(iframe);

function attachLightBox() {

    // Encase imges in the required tags
    $("img", ".postcontent").wrap(function () {
        return "<div class='light-box-wrapper'></div>";
    });

    $("img", ".postcontent").addClass("light-box");

    $(".light-box-wrapper").click("click", function () {

        if ($(this).hasClass("selected"))
            $(this).removeClass("selected");
        else
            $(this).addClass("selected");
    });
}

function sizeForScroll() {

    console.log("Resize");

    if (!isScrollBar()) {
        //            $("body").css('margin-right', getScrollBar() + 'px');
        $('body').width($(window).width() - getScrollBar());
    } else {
        //            $("body").css('margin-right', 0 + 'px');

        $('body').width($(window).width());
    }

    //$('body').width($('html').width() - getScrollBar());

    $("#nav-bar").width($("#ajax-container").width());
    //    $("#ajax-container").width($("#page-length").width());

}

function isScrollBar() {

    return $("body")[0].scrollHeight > $("body")[0].clientHeight;
}

function getScrollBar() {

    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);

    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
}