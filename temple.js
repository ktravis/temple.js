// temple.js
// a micro-framework for AJAX template loading
// depends on jQuery and some specific html
//
// author : Kyle Travis
// license: MIT (ktravis.mit-license.org)

function loadContent(target) {
    if (!target) return;
    fixURL(target);
    $("#content-main").fadeOut(200, 
        function () { 
            var $el = $(this);
            $.ajax({
                url : target,
                data: { stub : true, },
            }).done(function (newContent) {
                $el.html(newContent);
                $el.fadeIn(300);
                pageCustoms(target);
                updateLinks();
            });
        });
}

function fixURL(newUrl) {
    window.location.hash = newUrl;
}
$(window).bind('hashchange', function (e) {
    var target = window.location.hash.slice(1);
    $el = $("#nav-set div").filter(function () {
        if (target == "") target = "/";
        return $(this).attr("href") == target;
    });
    if ($el.length > 0) doNavigate($el);
    else loadContent(target);
});

function pageCustoms(target) {}

function doNavigate($link, noload) {
    if (!($link && $link.length)) return;
    var title = $link.attr("title");
    $(".active").removeClass("active");
    rotateTo(title);
    $link.addClass("active"); 
    if (!noload) loadContent($link.attr('href'));
}

function updateLinks() {
    $(".post-link").on("click", function(e) {
        loadContent($(this).attr("href"));
        e.preventDefault();
    });

    $(".back-link").on("click", function(e) {
        loadContent($(this).attr("href"));
        e.preventDefault();
    });
}

function setup() {
    $("#nav-set div").on("click", function () { 
            doNavigate($(this));
            fixURL($(this).attr('href'));
        });
    doNavigate($("#nav-set div").filter(function () {
            return $(this).attr("href") == window.location.hash.slice(1);
    }), false);
}