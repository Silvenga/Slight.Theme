(function ($) {

    "use strict";

    var sessionKey = "ghost:session";

    function getLocalStorage(key) {
        var json = localStorage.getItem(key);
        return json ? JSON.parse(json) : false;
    }

    window.Ghost = {
        isAuthenticated: function () {
            var session = getLocalStorage(sessionKey);
            return session && new Date < new Date(session.expires_at);
        },
        edit: function (postId) {
            window.location.href = "/ghost/editor/" + postId;
        },
        logIn: function () {
            window.location.href = "/ghost/";
        }
    };

})(jQuery);