var utils = {
    listToArray: function listToArray(likeArray) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeArray, 0);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                ary[ary.length] = likeArray[i];
            }
        }
        return ary;
    },
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },
    offset: function (curEle) {
        var p = curEle.offsetParent, t = curEle.offsetTop, l = curEle.offsetLeft;
        while (p) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                t += p.clientTop;
                l += p.clientLeft;
            }
            t += p.offsetTop;
            l += p.offsetLeft;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    },
    hasClass: function hasClass(curEle, cName) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
        return reg.test(curEle.className);
    },
    addClass: function addClass(curEle, cName) {
        if (!this.hasClass(curEle, cName)) {
            curEle.className += " " + cName;
        }
    },
    removeClass: function removeClass(curEle, cName) {
        if (this.hasClass(curEle, cName)) {
            var reg = new RegExp("(?:^| +)" + cName + "( +|$)", "g");
            curEle.className = curEle.className.replace(reg, " ");
        }
    },
    prev: function prev(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    },
    prevAll: function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    },
    next: function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    },
    nextAll: function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }
};

utils.sibling = function sibling(curEle) {
    var pre = this.prev(curEle), nex = this.next(curEle);
    var ary = [];
    pre ? ary.push(pre) : null;
    nex ? ary.push(nex) : null;
    return ary;
};

utils.siblings = function siblings(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));
};

utils.getIndex = function getIndex(curEle) {
    return this.prevAll(curEle).length;
};

utils.children = function children(curEle, tag) {
    var nodeList = curEle.childNodes, ary = [];
    for (var i = 0; i < nodeList.length; i++) {
        var cur = nodeList[i];
        if (cur.nodeType === 1) {
            if (typeof tag !== "undefined") {
                var reg = new RegExp("^" + tag + "$", "i");
                reg.test(cur.tagName) ? ary[ary.length] = cur : null;
                continue
            }
            ary[ary.length] = cur;
        }
    }
    return ary
};

utils.getElementsByClass = function getElementsByClass(strClass, context) {
    context = context || document;
    if ("getElementsByClassName" in document) {
        return this.listToArray(context.getElementsByClassName(strClass))
    }
    var tagList = context.getElementsByTagName("*"), ary = [];
    strClass = strClass.replace(/(^ +| +$)/g, "").split(/ +/);
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i], curTagClass = curTag.className;
        var flag = true;
        for (var k = 0; k < strClass.length; k++) {
            var reg = new RegExp("(?:^| +)" + strClass[k] + "(?: +|$)");
            if (!reg.test(curTagClass)) {
                flag = false;
                break;
            }
        }
        flag ? ary[ary.length] = curTag : null;
    }
    return ary;
};

utils.hasClass = function hasClass(curEle, cName) {
    var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
    return reg.test(curEle.className);
};

utils.addClass = function addClass(curEle, cName) {
    if (!this.hasClass(curEle, cName)) {
        curEle.className += " " + cName;
    }
};

utils.removeClass = function removeClass(curEle, cName) {
    if (this.hasClass(curEle, cName)) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
        curEle.className = curEle.className.replace(reg, " ");
    }
};

utils.getCss = function getCss(curEle, attr) {
    var val = reg = null;
    if ("getComputedStyle"in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr === "opacity") {
            val = curEle.currentStyle["filter"]
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
    return reg.test(val) ? parseFloat(val) : val;
};

utils.setCss = function setCss(curEle, attr, value) {
    if (attr === "float") {
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
        return;
    }
    if (attr === "opacity") {
        value > 1 ? value = 1 : null;
        value < 0 ? value = 0 : null;

        curEle["style"]["opacity"] = value;
        curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        return;
    }
    var reg = /^(width|height|(padding|margin(Top|Left|Right|Bottom))|top|left|right|bottom)$/;
    if (reg.test(attr)) {
        reg = /^-?\d+(\.\d+)?$/;
        if (reg.test(value)) {
            curEle["style"][attr] = value + "px";
            return;
        }
    }
    curEle["style"][attr] = value;
};

utils.setGroupCss = function setGroupCss(curEle, options) {
    if (Object.prototype.toString.call(options) !== "[object Object]") {
        return;
    }
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            this.setCss(curEle, key, options[key]);
        }
    }
};

utils.win = function win(attr, value) {
    if (typeof value === "undefined") {
        return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
};

utils.offset = function offset(curEle) {
    var t = curEle.offsetTop, l = curEle.offsetLeft, p = curEle.offsetParent;
    while (p) {
        if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
            t += p.clientTop;
            l += p.clientLeft;
        }
        t += p.offsetTop;
        l += p.offsetLeft;
        p = p.offsetParent;
    }
    return {top: t, left: l};
};

utils.prev = function prev(curEle) {
    if ("previousElementSibling" in curEle) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
};

utils.prevAll = function prevAll(curEle) {
    //this->utils
    var ary = [], pre = this.prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = this.prev(pre);
    }
    return ary;
};

utils.next = function next(curEle) {
    if ("nextElementSibling" in curEle) {
        return curEle.nextElementSibling;
    }
    var nex = curEle.nextSibling;
    while (nex && nex.nodeType !== 1) {
        nex = nex.nextSibling;
    }
    return nex;
};

utils.nextAll = function nextAll(curEle) {
    var ary = [], nex = this.next(curEle);
    while (nex) {
        ary[ary.length] = nex;
        nex = this.next(nex);
    }
    return ary;
};

