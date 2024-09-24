var VIDEO_LAZY = {
    init: function () {
        var listVideoLaze = document.querySelectorAll(".video-lazy");
        for (var i = 0; i < listVideoLaze.length; i++) {
            var element = listVideoLaze[i];
            if (element.dataset.src) {
                var html = "<source src=\"".concat(element.dataset.src, "\" type=\"video/mp4\">\n        Your browser does not support the video tag.");
                element.innerHTML = html;
            }
        }

        var listVideoYoutubeLazy = document.querySelectorAll(".lazy-frame-youtube");
        for (var j = 0; j < listVideoYoutubeLazy.length; j++) {
            var element = listVideoYoutubeLazy[j];
            if (element.dataset.link) {
                var videoIdMatch = element.dataset.link.match(/(?:v=|v\/|vi=|vi\/|youtu.be\/|embed\/|\/v\/|\/e\/|\/u\/\w+\/|\/embed\/|v=|e=|u\/\d+\/|embed\/|v=|e=|u\/\w+\/|embed\/|youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|youtu.be\/|embed\/|\/v\/|e\/|u\/\w+\/|embed\/|youtu.be\/)([^#\\&\?]*[^\\&\?])/i);
                var videoId = videoIdMatch ? videoIdMatch[1] : null;

                var html = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/".concat(videoId, "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>");
                element.innerHTML = html;
            }
        }
    }
};

window.addEventListener("DOMContentLoaded", function () {
    VIDEO_LAZY.init();
});
