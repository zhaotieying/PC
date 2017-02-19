(function () {
    var up = document.getElementById("up"), down = document.getElementById("down");
    var listA = up.getElementsByTagName("li"), listB = down.getElementsByClassName("downP");
    for (var i = 0; i < listA.length; i++) {
        var cur = listA[i];
        cur.index = i;
        cur.onmouseenter = function () {
            this.className = "special";
            utils.addClass(listB[this.index], "special");
            for (var k = 0; k < listA.length; k++) {
                if (k !== this.index) {
                    listA[k].className = null;
                    utils.removeClass(listB[k], "special");
                }
            }
        }
    }
})
();


(function () {
    var left = document.getElementById("left"), detailL = document.getElementById("detailL"), detailR = document.getElementById("detailR"), details = document.getElementById("details");
    left.onmouseenter = function () {
        utils.setCss(detailL, "display", "block");
        animate(detailL, {left: 0}, 500);
        utils.setCss(detailR, "display", "block");
        animate(detailR, {left: 500}, 500);
        utils.setCss(details, "left", "175px");

    };
    left.onmouseleave = function () {
        animate.clear(detailL);
        animate.clear(detailR);
        utils.setCss(detailL, "display", "none");
        utils.setCss(detailL, "left", "-500px");
        utils.setCss(detailR, "display", "none");
        utils.setCss(detailR, "left", "-320px");
        utils.setCss(details, "left", "-1000px");
    };


    var leftFir_Ul = document.getElementById("leftFir_Ul"), liList = leftFir_Ul.getElementsByTagName("li"), blockList = detailL.getElementsByTagName("div");

    var iList = leftFir_Ul.getElementsByTagName("i");
    for (var i = 0; i < liList.length; i++) {
        var current = null;

        (function () {
            var cur = liList[i], child = iList[i];
            cur.index = i;
            child.style.backgroundPosition = "10px " + (-92 - (38 * cur.index)) + "px";
            cur.onmouseenter = function () {
                child.style.backgroundPosition = "-271px " + (-92 - 38 * this.index) + "px";
                utils.setCss(blockList[cur.index], "display", "block");
                utils.setCss(this, "backgroundColor", "#ff7300");
            };
            cur.onmouseleave = function () {
                child.style.backgroundPosition = "10px " + (-92 - 38 * this.index) + "px";
                utils.setCss(blockList[cur.index], "display", "none");
                utils.setCss(this, "backgroundColor", "#f8f8f8");
                current = cur.index;
            };
        })(i);

        details.onmouseenter = function () {
            utils.setCss(blockList[current], "display", "block");
            utils.setCss(liList[current], "backgroundColor", "#ff7300");
            iList[current].style.backgroundPosition = "-271px " + (-92 - 38 * current) + "px";
        };
        details.onmouseleave = function () {
            utils.setCss(blockList[current], "display", "none");
            utils.setCss(liList[current], "backgroundColor", "#f8f8f8");
            iList[current].style.backgroundPosition = "10px " + (-92 - 38 * current) + "px";
        }
    }

    var close = document.getElementById("close");
    close.onclick = function () {
        utils.setCss(details, "left", "-1000px");
    }


})();
