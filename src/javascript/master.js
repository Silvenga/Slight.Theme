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

    $('.hover-parrent').bind('touchstart', function () {

        $(this).addClass("onhover");
    });

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

    if (!isScrollBar()) {
        $("body").css('margin-right', getScrollBar() + 'px');
    } else {
        $("body").css('margin-right', 0 + 'px');
    }
    $("#nav-bar").width($("#page-length").width());
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