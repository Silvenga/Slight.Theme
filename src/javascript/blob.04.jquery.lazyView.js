// https://github.com/Silvenga/jquery-lazyView

(function ($) {

    var seenKey = 'handled';
    var funQueue = [];
    var isProcessing = false;

    function doSeen($element) {

        $element.removeClass('invisible');
        $element.addClass('visible');

        // Cleanup
        setTimeout(function () {
            $element.removeClass('visible');
        }, 300);
    }

    function isSeen($element) {

        return $element.data(seenKey) || $element.is("script") || $element.is("style") || $element.is("link");
    }

    function setSeen($element) {

        $element.data(seenKey, true);
    }

    function isVisible($element) {

        var bonds = $element[0].getBoundingClientRect();

        var windowScrollTop = $(window).scrollTop();
        var windowScrollLeft = $(window).scrollLeft();

        var bondsTop = windowScrollTop + bonds.top;
        var bondsLeft = windowScrollLeft + bonds.left;
        var bondsBottom = windowScrollTop + bonds.bottom;
        var bondsRight = windowScrollLeft + bonds.right;

        var bondsHeight = bondsBottom - bondsTop;
        var bondsWidth = bondsRight - bondsLeft;

        var portTop = windowScrollTop - bondsHeight;
        var portLeft = windowScrollLeft - bondsWidth;
        var portBottom = portTop + $(window).height() + bondsHeight + bondsHeight;
        var portRight = portLeft + $(window).width() + bondsWidth + bondsWidth;

        return (portTop < bondsTop && portBottom > bondsBottom) && (portLeft < bondsLeft && portRight > bondsRight);
    }

    function doProcess() {

        isProcessing = funQueue.length > 0;

        if (isProcessing) {

            var func = funQueue.shift();
            func();

            setTimeout(doProcess, 5);
        }
    };

    function addProcess(func) {

        funQueue.push(func);

        if (!isProcessing)
            doProcess();
    };

    $.fn.lazyView = function () {

        this.find("*").each(function () {

            var $element = $(this);

            if (!isSeen($element)) {

                $element.addClass('invisible');

                var onChanged = function () {

                    if (!isSeen($element) && isVisible($element)) {

                        var seenWrapper = function () {
                            doSeen($element);
                        }

                        setSeen($element);
                        addProcess(seenWrapper);

                        $(window).off("scroll", onChanged);
                        $(window).off("resize", onChanged);
                    }
                };

                $(window).on("scroll", onChanged);
                $(window).on("resize", onChanged);

                onChanged();
            }
        });

        this.css("visibility", "visible");

        return this;
    };

}(jQuery));