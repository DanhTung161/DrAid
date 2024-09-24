var CLICK = {
    fixedMenu: function () {
        /* CĂ i Ä‘áº·t cháº¿ Ä‘á»™ menu */
        optionMenu = {
            hideOnScrollDown: false,
            delayShowOnScrollTop: 0 /* Delay hiá»ƒn thá»‹ khi scroll top. Ăp dá»¥ng khi hideOnScrollDown = true */,
        };

        hideOnScrollDown = optionMenu.hideOnScrollDown || false;
        delayShowOnScrollTop = optionMenu.delayShowOnScrollTop || 0;

        /* Khai bĂ¡o header */
        var header = Tech.$(".header");
        if (header != null) {
            var headerHeight = header.outerHeight();

            var width_ = window.innerWidth;

            /* Function phá»¥ trá»£ */

            /* áº¨n hiá»‡n menu khi scroll */
            var lastScrollTop = 0;
            window.addEventListener("scroll", function () {
                var st = window.pageYOffset || document.documentElement.scrollTop;
                if (st > headerHeight) {
                    header.addClass("scrollTop");
                } else {
                    header.removeClass("scrollTop");
                }
            });
        }
    },
    showMenu: function () {
        var buttonShowMenu = Tech.$(".show-menu-mobile");
        var closeMenu = Tech.$(".over-lay");
        if (typeof buttonShowMenu != "undefined") {
            buttonShowMenu.onClick(function () {
                Tech.$(".menu").toggleClass("active");
                // Tech.$('body,html').toggleClass('show-menu');
                Tech.$(".over-lay").toggleClass("active");
                Tech.$(this).toggleClass("active");
            });
        }
        if (typeof closeMenu != "undefined") {
            closeMenu.onClick(function () {
                Tech.$(".menu").removeClass("active");
                // Tech.$('body,html').toggleClass('show-menu');
                Tech.$(".over-lay").removeClass("active");
                Tech.$(".show-menu-mobile").removeClass("active");
            });
        }
        var width_ = window.innerWidth;
        if (width_ >= 1280) {
            if (Tech.$(".menu") == undefined || Tech.$(".menu") == null) return;
            var listIitemLi = Tech.$(".menu").find("li");
            listIitemLi.forEach(function (element, index) {
                if (element.find(":scope > ul").length() > 0) {
                    element.append(
                        `<span class="btn-dropdown-menu"><i class="fa-solid fa-caret-down"></i></span>`
                    );
                    element.css("padding-right", "20px");
                }
            });
        }
        if (width_ < 1280) {
            var listIitemLi = Tech.$(".menu").find("li");
            listIitemLi.forEach(function (element, index) {
                if (element.find(":scope > ul").length() > 0) {
                    element.append(
                        `<span class="btn-dropdown-menu"><i class="fa-solid fa-caret-down"></i></span>`
                    );
                    // element.onClick(function() {
                    //     var a = Tech.$(this).find(":scope > a");
                    //     var href = a._element[0]._element.getAttribute('href')
                    //     if (href === 'javascript:void(0)' || href === "" || href === "/") {
                    //         a.next("ul").toggleSlide(300);
                    //         Tech.$(this).toggleClass('open');
                    //     }
                    // })
                    var a = element.find(":scope > a");
                    var href = a._element[0]._element.getAttribute("href");
                    a.onClick(function (e) {
                        e.preventDefault();
                        Tech.$(this).next("ul").toggleSlide(300);
                        Tech.$(this).next().next().toggleClass("open");
                    });
                }
            });
            // var listBtnDropdownMenu =
            //     Tech.$(".menu").find(".btn-dropdown-menu");
            // var timeSlide = 300;
            // listBtnDropdownMenu.onClick(function(event) {
            //     var _this = Tech.$(this);
            //     _this.css("pointer-events", "none");
            //     setTimeout(function() {
            //         _this.css("pointer-events", "all");
            //     }, timeSlide);
            //     // var parentLi = Tech.$(this.closest('li'));
            //     var listUlChild = Tech.$(this).prev("ul");
            //     _this.toggleClass("open");
            //     listUlChild.toggleSlide(timeSlide);
            // });
        }
    },

    initAnimation: function () {
        var width_ = window.innerWidth;
        if (width_ > 1279) {
            var wow = new WOW();
            wow.init();
        }
    },

    playVideo: function () {
        var btn = document.querySelectorAll("[play-video]");
        if (typeof btn !== "undefined") {
            btn.forEach(function (elm) {
                elm.onclick = function () {
                    var link = this.getAttribute("data-link");
                    var html =
                        '<iframe width="100%" src="https://www.youtube.com/embed/' +
                        youtubeParser(link) +
                        '?autoplay=1" frameborder="0" allow="autoplay;accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                    this.innerHTML = html;
                };
            });
        }
    },
    showMoreNew: function () {
        var btn = Tech.$("span[show-more]");
        if (typeof btn !== "undefined" && btn !== null) {
            btn.onClick(function () {
                Tech.$(this).parent(".head").next(".content").toggleSlide("300");
            });
        }
    },
    copyRight: function () {
        var email = document.querySelector("[data-email]");
        if (email != null) {
            email.addEventListener("click", function (e) {
                e.preventDefault();
                var success = email.getAttribute("data-success");
                var failed = email.getAttribute("data-failed");
                const textArea = document.createElement("textarea");
                textArea.value = email.getAttribute("data-email");
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand("copy");
                    NOTIFICATION.showNotify(200, success);
                } catch (err) {
                    NOTIFICATION.showNotify(100, failed);
                }
                document.body.removeChild(textArea);
            });
        }
    },
    injectCsrfForm: function () {
        if (document.querySelector('meta[name="csrf-token"]') != null) {
            var csrf = document.querySelector('meta[name="csrf-token"]').content;
            var forms = document.querySelectorAll("[inject-form]");
            var body = document.querySelector("body");
            if (forms != null) {
                var lang = body.getAttribute("lang");
                var url =
                    lang == "vi"
                        ? window.location.origin + "vi/send-contact"
                        : window.location.origin + "/send-contact";
                forms.forEach(function (e, i) {
                    e.setAttribute("action", url);
                    e.querySelector("input[name='_token']").value = csrf;
                });
            }
        }
    },
    XhrLoad: function () {
        var paginates = document.querySelectorAll(".xhr-load .pagination a");
        var xhrContent = document.querySelector(".xhr__content");
        paginates.forEach(function (e, i) {
            e.addEventListener("click", async function (event) {
                event.preventDefault();
                var href = e.getAttribute("href");

                const request = await XHR.send({
                    url: href,
                    method: "GET",
                }).then(function (response) {
                    xhrContent.innerHTML = response;
                    CLICK.XhrLoad();
                });
            });
        });
    },
    xHrLoadCategory: function () {
        var categories = document.querySelectorAll(".nav-publications a");
        var xhrContent = document.querySelector(".xhr__content");
        categories.forEach(function (e, i) {
            e.addEventListener("click", async function (event) {
                event.preventDefault();
                var href = e.getAttribute("href");
                const request = await XHR.send({
                    url: href,
                    method: "GET",
                }).then(function (response) {
                    categories.forEach((elm, idx) => {
                        elm.classList.remove("active");
                    });
                    e.classList.add("active");
                    xhrContent.innerHTML = response;
                    CLICK.XhrLoad();
                });
            });
        });
    },
    toogleProducts: function () {
        var boxProduct = document.querySelector(".products-list .current");
        var body = document.querySelector("body");
        var products = document.querySelectorAll(".products-list .ls .it-checkbox");
        if (boxProduct) {
            boxProduct.addEventListener("click", function (e) {
                e.preventDefault();
                boxProduct.classList.toggle("show");
            });
        }
        body.addEventListener("click", function (e) { });
        products.forEach(function (e, i) {
            e.addEventListener("click", function (e) {
                var _arr = [];
                var productsActive = document.querySelectorAll(
                    ".products-list .ls .it-checkbox input:checked"
                );
                productsActive.forEach(function (elm, i) {
                    _arr.push(elm.value);
                });
                var _html = "";
                _arr.forEach(function (value, idx) {
                    _html += `<strong>${value}</strong>`;
                });
                if (productsActive.length == 0) {
                    boxProduct.querySelector(".currents").innerHTML =
                        boxProduct.getAttribute("default");
                } else {
                    boxProduct.querySelector(".currents").innerHTML = _html;
                }
            });
        });
    },
    moduleSearch: function () {
        /* Khai basco setting */
        optinonSearch = {
            fullContent: false /* Chá»‰ Ä‘á»ƒ true khi Ä‘Ă£ dung menu fixed. */,
            contentTagertSelector: ".header-content",
        };
        fullContent = optinonSearch.fullContent || false;
        contentTagertSelector = optinonSearch.contentTagertSelector || "";
        if (fullContent && contentTagertSelector != "") {
            contentTagert = Tech.$(contentTagertSelector);
            offSetContentTagert = contentTagert.offset();
        }

        var btnShowSearch = Tech.$(".btn-show-search");
        var formSearch = Tech.$(".form-search-header");
        if (!formSearch) return;
        var inputSearch = formSearch.find("input");

        function resetPositionFormSearch() {
            if (fullContent && typeof contentTagert !== "undefined") {
                if (formSearch.hasClass("active")) {
                    formSearch.css("top", offSetContentTagert.top + `px`);
                } else {
                    formSearch.css(
                        "top",
                        offSetContentTagert.top - contentTagert.height() + `px`
                    );
                }
            }
        }

        btnShowSearch.onClick(function (event) {
            btnShowSearch.toggleClass("active");
            if (fullContent && typeof contentTagert !== "undefined") {
                var btnDoSearch = formSearch.find(".btn-do-search");
                if (btnDoSearch.length() > 0) {
                    btnDoSearch.remove();
                }
                var btnCloseSearch = formSearch.find(".btn-close-search");
                if (btnCloseSearch.length() == 0) {
                    formSearch.append(`<button class="smooth btn-close-search d-flex justify-content-center align-items-center" type="button">
                                        <div class="icon-close"></div>
                                    </button>`);
                }
                formSearch.css("position", "fixed");
                formSearch.css(
                    "top",
                    offSetContentTagert.top - contentTagert.height() + `px`
                );
                formSearch.css("left", offSetContentTagert.left + `px`);
                formSearch.css("width", contentTagert.width() + `px`);
                formSearch.css("height", contentTagert.height() + `px`);
            }
            formSearch.addClass("have-transition");
            formSearch.toggleClass("active");
            resetPositionFormSearch();
            setTimeout(function () {
                document.getElementById("input-search-header").focus();
            }, 500);
        });
        document.addEventListener("click", function (event) {
            var insideBtnShowSearch = event.target.closest(".btn-show-search");
            var insideFormSearch = event.target.closest(".form-search-header");
            var insideCloseSearch = event.target.closest(".btn-close-search");
            if ((!insideBtnShowSearch && !insideFormSearch) || insideCloseSearch) {
                btnShowSearch.removeClass("active");
                formSearch.removeClass("active");
                resetPositionFormSearch();
            }
        });
    },
    ajaxSearch: function () {
        var elementAjaxSearch = Tech.$('.ajax_search');
        if (elementAjaxSearch.length() == 0) return;
        var key = Tech.$('input[name="keyword"]').val();
        elementAjaxSearch.forEach(function (element) {
            var action = element.attr('data-action');
            var type = element.attr('type');
            Tech.Query.ajax({
                url: action,
                type: 'POST',
                body: {
                    q: key,
                    type: type
                },
                success: function (html) {
                    element.find('.results_ajax').html(html);
                }
            });
        });
        Tech.Query.on('click', '.results_ajax .pagination a', function (event) {
            event.preventDefault();
            var _this = Tech.$(event.target);
            Tech.Query.ajax({
                url: _this.attr('href'),
                type: 'GET',
                success: function (data) {
                    $('.results_ajax').html(data);
                    var scrollTo = $('.results_ajax').position().top - 100;
                    setTimeout(function () {
                        Tech.Query.scrollTo({
                            time: number = 300, position: top = scrollTo
                        }, 600);
                    }, 1000);
                }
            });
        })
    },
    tabIntroHome: function () {
        if (typeof Tech.$('.button-tab-intro') === 'undefined') return;
        var tabLinks = document.querySelectorAll(".button-tab-intro .tablinks");
        var tabContent = document.querySelectorAll(".module-content .tab-content");
        if (tabLinks.length > 0 && tabContent.length > 0) {
            tabLinks[0].classList.add("active");
            tabContent[0].classList.add("active");
        }
    },

    init: function () {
        CLICK.showMenu();
        CLICK.fixedMenu();
        CLICK.initAnimation();
        CLICK.playVideo();
        // CLICK.ajaxSearch();
        CLICK.moduleSearch();
        CLICK.showMoreNew();
        CLICK.copyRight();
        CLICK.injectCsrfForm();
        CLICK.XhrLoad();
        CLICK.xHrLoadCategory();
        CLICK.toogleProducts();
        CLICK.tabIntroHome();
    },
};
Tech.Query.ready(function () {
    setTimeout(function () {
        CLICK.init();
    }, 100);
    // BackToTop.create('.back-to-top', {
    //     threshold: 300,
    // })
});

function youtubeParser(url) {
    var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
}

var NOTIFICATION = {
    toastrMessage: function (data) {
        NOTIFICATION.showNotify(data.code, data.message);
    },
    toastrMessageReload: function (data) {
        NOTIFICATION.showNotify(data.code, data.message);
        if (data.code == 200) {
            window.location.reload();
        }
    },
    toastrMessageRedirect: function (data) {
        if (data.redirect_url) {
            if (data.code == 200) {
                window.location.href = data.redirect_url;
            }
        }
        NOTIFICATION.showNotify(data.code, data.message);
    },
    toastrMessageRedirectClear: function (data) {
        if (data.redirect_url) {
            if (data.code == 200) {
                window.location.href = data.redirect_url;
            }
        }
        NOTIFICATION.showNotify(data.code, data.message);
        var boxProduct = document.querySelector(".products-list .current");
        boxProduct.querySelector(".currents").innerHTML =
            boxProduct.getAttribute("default");
    },
    toastrMessageClearData: function (data, baseData, form) {
        NOTIFICATION.showNotify(data.code, data.message);
        form.reset();
    },
    showNotifyWhenLoadPage() {
        if (
            typeof typeNotify != "undefined" &&
            typeNotify != undefined &&
            typeNotify != "" &&
            typeof messageNotify != "undefined" &&
            messageNotify != undefined &&
            messageNotify != ""
        ) {
            var code = typeNotify;
            this.showNotify(code, messageNotify);
        }
    },
    showNotify(code, message) {
        if (message == "undefined" || message == undefined || message == "") {
            return;
        }
        for (const toastr of document.querySelectorAll(".toastify")) {
            toastr.remove();
        }
        Toastify({
            text: message,
            close: false,
            avatar:
                code == 200
                    ? "base_assets/images/check.svg"
                    : "base_assets/images/alert.svg",
            style: {
                background: code == 200 ? "#06d6a0" : "#ef476f",
            },
        }).showToast();
    },
};

window.addEventListener("DOMContentLoaded", function () {
    NOTIFICATION.showNotifyWhenLoadPage();
});
