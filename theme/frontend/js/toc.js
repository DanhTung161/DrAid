var SUPPORT = (function () {
    var scrollIntoViewNew = function () {
        if (typeof (Tech.$("#toc_container") == "undefined")) return;
        var btnToc = document.querySelectorAll('#toc_container a[href^="#"]');
        var toggleToc = document.querySelector(".toggle-content-toc");
        console.log(btnToc);
        btnToc.forEach(function (e, i) {
            e.addEventListener("click", function (event) {
                event.preventDefault();
                var id = Tech.$(this).attr("href");
                var $id = Tech.$(id);
                if ($id.length === 0) {
                    return;
                }
                var pos = $id.offset().top;
                window.scrollTo(100, pos - 200);
            });
        });
        toggleToc.addEventListener("click", function (event) {
            event.preventDefault();
            Tech.$(this).toggleClass("active");
            var tocList = Tech.$(".toc_list");
            if (Tech.$(this).hasClass("active")) {
                tocList.slideDown(300);
            } else {
                tocList.slideUp(300);
            }
        });
    };
    return {
        _: function () {
            scrollIntoViewNew();
        },
    };
})();
window.addEventListener("DOMContentLoaded", function () {
    SUPPORT._();
});
