(function () {
    var outer = document.getElementById("outer");
    var inner = document.getElementById("inner"), tip = document.getElementById("tip"), tipList = tip.getElementsByTagName("li"), outer_left = document.getElementById("outer_left"), outer_right = document.getElementById("outer_right");
    var step = 0, autoTimer = null, interval = 3000;
    var imgFir = document.getElementById("imgFir"), imgSec = document.getElementById("imgSec");

    function changeTip() {
        var tempStep = step;
        tempStep >= tipList.length ? tempStep = 0 : null;
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = i === tempStep ? "bg" : null;
        }
    }

    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        step++;
        if (step > 5) {
            step = 1;
            inner.style.left = 0;
        }
        animate(inner, {left: -step * 760}, 1000, 1);
        changeTip();
        if (step === 1) {
            animate(imgFir, {left: 0}, 1500);
            animate(imgSec, {top: 0}, 1500);
        } else {
            imgFir.style.left = -760 + "px";
            imgSec.style.top = 300 + "px";
        }
    }


    outer.onmouseenter = function () {
        window.clearInterval(autoTimer);
        outer_left.style.display = outer_right.style.display = "block";
    };
    outer.onmouseleave = function () {
        autoTimer = window.setInterval(autoMove, interval);
        outer_left.style.display = outer_right.style.display = "none";
    };
    tipMove();
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var cur = tipList[i];
            cur.index = i;
            cur.onclick = function () {
                step = this.index;
                if (step == 1) {
                    animate(imgFir, {left: 0}, 1500);
                    animate(imgSec, {top: 0}, 1500);
                } else {
                    animate.clear(imgFir);
                    animate.clear(imgSec);
                    imgFir.style.left = -760 + "px";
                    imgSec.style.top = 300 + "px";
                }
                animate(inner, {left: -step * 760}, 500, 3);
                changeTip();
            }
        }
    }

    outer_left.onclick = function () {
        step--;
        if (step < 0) {
            step = 4;
            inner.style.left = -3800 + "px";
        }
        animate(inner, {left: -step * 760}, 500, 1);
        changeTip();
        if (step === 1) {
            animate(imgFir, {left: 0}, 2000);
            animate(imgSec, {top: 0}, 2000);
        } else {
            imgFir.style.left = -760 + "px";
            imgSec.style.top = 300 + "px";
        }
    };
    outer_right.onclick = autoMove;
})();

//rigFou
(function () {
    var contentUl = document.getElementById("contentUl");
    var step = 0;
    var autoTimer = null;

    function autoMove() {
        step++;
        if (step >= 7) {
            step = 0;
            contentUl.style.top = 0;
            step++;
            animate(contentUl, {top: -step * 24}, 500, 1);
        }
        animate(contentUl, {top: -step * 24}, 500, 1);
    }

    autoTimer = window.setInterval(autoMove, 1500);

    contentUl.onmouseenter = function () {
        window.clearInterval(autoTimer);
    };
    contentUl.onmouseleave = function () {
        autoTimer = window.setInterval(autoMove, 1500);
    }
})();

//sale
(function () {
    var cenDown_left = document.getElementById("cenDown_left"), cenDown_right = document.getElementById("cenDown_right");
    var saleIn = document.getElementById("saleIn");
    var step = 0;
    cenDown_left.onclick = function () {
        step--;
        if (step < 0) {
            step = 0;
        }
        if (step === 0) {
            cenDown_left.style.backgroundPosition = "-81px -1316px";
        }
        cenDown_right.style.backgroundPosition = "-280px -1129px";
        animate(saleIn, {left: -step * 750}, 500)
    };
    cenDown_right.onclick = function () {
        step++;
        if (step > 2) {
            step = 2;
        }
        if (step === 2) {
            cenDown_right.style.backgroundPosition = "-116px -1316px";
        }
        cenDown_left.style.backgroundPosition = "-243px -1129px";
        animate(saleIn, {left: -step * 750}, 500)
    }

})
();















