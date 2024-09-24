window.nitro_lazySizesConfig = window.nitro_lazySizesConfig || {};
window.nitro_lazySizesConfig.lazyClass = "nitro-lazy";
nitro_lazySizesConfig.srcAttr = "nitro-lazy-src";
nitro_lazySizesConfig.srcsetAttr = "nitro-lazy-srcset";
nitro_lazySizesConfig.expand = 10;
nitro_lazySizesConfig.expFactor = 1;
nitro_lazySizesConfig.hFac = 1;
nitro_lazySizesConfig.loadMode = 1;
nitro_lazySizesConfig.ricTimeout = 50;
nitro_lazySizesConfig.loadHidden = true;
(function () {
    var t = null;
    var e = false;
    var i = false;
    var r = {
        childList: false,
        attributes: true,
        subtree: false,
        attributeFilter: ["src"],
        attributeOldValue: true,
    };
    var n = null;
    var a = [];

    function o(t) {
        let e = a.indexOf(t);
        if (e > -1) {
            a.splice(e, 1);
            n.disconnect();
            c();
        }
        t.contentWindow.location.replace(t.getAttribute("nitro-og-src"));
    }

    function l() {
        if (!n) {
            n = new MutationObserver(function (t, a) {
                t.forEach((n) => {
                    if (n.type == "attributes" && n.attributeName == "src") {
                        let e = n.target;
                        let i = e.getAttribute("nitro-og-src");
                        let r = e.src;
                        if (r != i) {
                            a.disconnect();
                            let t = r.replace(n.oldValue, "");
                            if (
                                r.indexOf("data:") === 0 &&
                                ["?", "&"].indexOf(t.substr(0, 1)) > -1
                            ) {
                                if (i.indexOf("?") > -1) {
                                    e.setAttribute(
                                        "nitro-og-src",
                                        i + "&" + t.substr(1)
                                    );
                                } else {
                                    e.setAttribute(
                                        "nitro-og-src",
                                        i + "?" + t.substr(1)
                                    );
                                }
                            }
                            e.src = n.oldValue;
                            c();
                        }
                    }
                });
            });
        }
        return n;
    }

    function s(t) {
        l().observe(t, r);
    }

    function c() {
        a.forEach(s);
    }

    function u() {
        window.removeEventListener("scroll", u);
        window.nitro_lazySizesConfig.expand = 300;
    }
    window.addEventListener("scroll", u, {
        passive: true,
    });
    window.addEventListener("NitroStylesLoaded", function () {
        e = true;
    });
    window.addEventListener("load", function () {
        i = true;
    });
    window.addEventListener("message", function (t) {
        if (t.data.action && t.data.action === "playBtnClicked") {
            var e = document.getElementsByTagName("iframe");
            for (var i = 0; i < e.length; i++) {
                if (t.source === e[i].contentWindow) {
                    o(e[i]);
                }
            }
        }
    });
    document.addEventListener("lazybeforeunveil", function (r) {
        var n = false;
        var a = r.target.getAttribute("nitro-lazy-bg");
        if (a) {
            let t = r.target.style.backgroundImage.replace(
                "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==",
                a.replace(/\(/g, "%28").replace(/\)/g, "%29")
            );
            if (t === r.target.style.backgroundImage) {
                t =
                    "url(" +
                    a.replace(/\(/g, "%28").replace(/\)/g, "%29") +
                    ")";
            }
            let e = r.target.style.backgroundImage;
            let i = ["initial", "inherit"].indexOf(e.toLowerCase()) === -1;
            if (e && i) {
                t = e + ", " + t;
            }
            r.target.style.backgroundImage = t;
            n = true;
        }
        if (!n) {
            var t = r.target.tagName.toLowerCase();
            if (t !== "img" && t !== "iframe") {
                r.target
                    .querySelectorAll(
                        "img[nitro-lazy-src],img[nitro-lazy-srcset]"
                    )
                    .forEach(function (t) {
                        t.classList.add("nitro-lazy");
                    });
            }
        }
    });
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("iframe[nitro-og-src]").forEach((e) => {
            if (e.getAttribute("nitro-og-src").indexOf("vimeo") > -1) {
                e.realGetAttribute = e.getAttribute;
                Object.defineProperty(e, "src", {
                    value: e.getAttribute("nitro-og-src"),
                    writable: false,
                });
                Object.defineProperty(e, "getAttribute", {
                    value: function (t) {
                        if (t == "src") {
                            return e.realGetAttribute("nitro-og-src");
                        } else {
                            return e.realGetAttribute(t);
                        }
                    },
                    writable: false,
                });
            }
            a.push(e);
        });
        c();
    });
})();
