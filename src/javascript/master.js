function start() {

    peak();

    $(".hover-parrent").on("mouseenter", function() {

        $(this).addClass("onhover");
    });

    $(".hover-parrent").on("mouseleave", function() {

        $(this).removeClass("onhover");
    });

    $('.hover-parrent').bind('touchstart', function() {
         
        $(this).addClass("onhover");
    });
     
    $(window).scroll(function() {

        if ($(document).scrollTop() > 50) {

            $(".sticky-menu").addClass("menu-small"); 
        } else { 
             
            $(".sticky-menu").removeClass("menu-small");
        }
    });

    sizeForScroll();

    // Reset the comments script
    $("#disqus_script").remove(); 

    // if id is seen, then run the comments script
    if ($("#disqus_thread").length > 0) {
        var disqus_shortname = 'silvenga-blog-ghost';
        var disqus_identifier = $("#page-id").text();
        (function() {
            var dsq = document.createElement('script');
            dsq.id = "disqus_script";
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
        }
         
//    // Reset the comments script
//
//    // if id is seen, then run the comments script
//    if ($("#disqus_script").length > 0 && ("disqus_thread").length > 0) {
//
//        var state = history.getState();
//
//        DISQUS.reset({
//            reload: true, 
//            config: function () {
//                this.page.identifier = $("#page-id").text();
//                this.page.url = state.url;
//            }
//        });
//
//    } else if ($("disqus_thread").length > 0) {
//        
//        var disqus_shortname = 'silvenga-blog-ghost';
//        var disqus_identifier = $("#page-id").text();
//        (function () {
//            var dsq = document.createElement('script');
//            dsq.id = "disqus_script";
//            dsq.type = 'text/javascript';
//            dsq.async = true;
//            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
//            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
//        })();
//    }



    // Download Gists
    try {
        readGists();
    }
    catch (err) {
        console.log(err);
    }
 

    // Lightbox
    attachLightBox();
}

function peak() {

    setTimeout(function() {

        $(".post-excerpt").css("padding-top", "0.5em");
        setTimeout(function() {
            $(".post-excerpt").delay(200).css("padding-top", "");
        }, 400);

    }, 800);
}

start();

$(window).resize(function() {

    sizeForScroll();
});

function attachLightBox() {

    // Encase imges in the required tags
    $("img", ".postcontent").wrap(function() {
        return "<div class='light-box-wrapper'></div>";
    });

    $("img", ".postcontent").addClass("light-box");

    $(".light-box-wrapper").click("click", function() {

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

    return  $("body").get(0).scrollHeight >  $("body").get(0).clientHeight;
}

function getScrollBar() {
    
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);

    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
}

//$(document).ready(function() {
//
//    // Attach Ghost Hunter to DOM
//    $("#search-field").ghostHunter({
//        results: "#ajax-container",
//        onKeyUp: true
//    });
//});