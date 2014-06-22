// https://github.com/Silvenga/jquery-lazyView

(function ($) {

    var seenKey = 'handled';
    var funqueue = [];
    var isProcessing = false;

    function seen($element) {

        $element.removeClass('invisible');
        $element.addClass('visible');

        setTimeout(function () {
            $element.removeClass('visible');
        }, 310);
    }

    function isSeen($element) {

        return $element.data(seenKey) || $element.is("script") || $element.is("style") || $element.is("link");
    }

    function setSeen($element) {

        $element.data(seenKey, true);
    }

    function isVisible($element) {

        var bonds = $element[0].getBoundingClientRect();

        var bondsTop = $(window).scrollTop() + bonds.top;
        var bondsLeft = $(window).scrollLeft() + bonds.left;
        var bondsBottom = $(window).scrollTop() + bonds.bottom;
        var bondsRight = $(window).scrollLeft() + bonds.right;

        var bondsHeight = bondsBottom - bondsTop;
        var bondsWidth = bondsRight - bondsLeft;

        var portTop = $(window).scrollTop() - bondsHeight;
        var portLeft = $(window).scrollLeft() - bondsWidth;
        var portBottom = portTop + $(window).height() + bondsHeight + bondsHeight;
        var portRight = portLeft + $(window).width() + bondsWidth + bondsWidth;

        return (portTop < bondsTop && portBottom > bondsBottom) && (portLeft < bondsLeft && portRight > bondsRight);
    }

    function doProcess() {

        isProcessing = funqueue.length > 0;

        if (isProcessing) {

            var func = funqueue.shift();
            func();

            setTimeout(doProcess, 5);
        }
    };

    function addProcess(func) {

        funqueue.push(func);

        if (!isProcessing)
            doProcess();
    };

    $.fn.lazyView = function () {

        this.find("*").each(function () {

            var $element = $(this);

            if (!isSeen($element)) {
                $element.addClass('invisible');

//                console.log($element.attr('id') + "::test");

                var onChanged = function () {

                    if (!isSeen($element)) {

                        if (isVisible($element)) {
                            var seenWrapper = function () {

//                                console.log($element.attr('id') + "::in");

                                seen($element);
                            }

                            setSeen($element);
                            addProcess(seenWrapper);
                        }
                    }
                };

                $(window).scroll(onChanged);
                $(window).resize(onChanged);
                onChanged();
            }
        });

        this.css("visibility", "visible");

        return this;
    };

}(jQuery));