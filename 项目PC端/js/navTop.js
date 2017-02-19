(function () {
    var fixedTop = document.getElementById("fixedTop");
    window.onscroll = function () {
        var scrollTop = utils.win("scrollTop");
        var current = utils.getCss(fixedTop, "top");
        if (scrollTop >= 300) {
            try {
                animate.clear(fixedTop);
            } catch (e) {

            }
            animate(fixedTop, {top: 0}, 500)
        } else if (scrollTop < 300) {
            try {
                animate.clear(fixedTop);
            } catch (e) {

            }
            animate(fixedTop, {top: -50}, 200)
        }
    }
})();


