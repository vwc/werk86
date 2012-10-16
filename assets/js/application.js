/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true */
/*global jQuery:false, document:false */

(function ($) {
    $(document).ready(function () {
        if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7) {
            // it's not realistic to think we can deal with all the bugs
            // of IE 6 and lower. Fortunately, all this is just progressive
            // enhancement.
            return;
        }
        var boxes = $('.infobox');
        $('a[data-appui="readmore"]').on('click', function (e) {
            e.preventDefault();
            $('#jumbo').expose();
            var target_id = $(this).data('appui-target');
            var current = $(target_id);
            boxes.not(current).fadeOut('slow');
            $('#splashbox').fadeOut('fast');
            current.fadeIn('slow').promise().done(function () {
                $.scrollTo('#siteheader');
            });
        });
        $('a[data-appui-dismiss="infobox"]').on('click', function (e) {
            e.preventDefault();
            boxes.fadeOut('slow');
            $.mask.close();
            $('#splashbox').fadeIn('slow').promise().done(function () {
                $.scrollTo('#siteheader');
            });
        });
        $('a[data-appui="pagescroll"]').on('click', function (e) {
            e.preventDefault();
            var target_id = $(this).data('appui-target');
            $.scrollTo(target_id, {
                "duration": "slow"
            }, {onAfter: function () {
                if (target_id === '#navigation') {
                    $('#scroll-top').fadeOut('slow');
                }
            }});
        });
        $('#contact-form').on('submit', function () {
            $(this).fadeOut('fast');
            form_contents = $(this).serialize() + "&async=true";
            form_action = $(this).attr('action');
            $.ajax({
                type: 'post',
                data: form_contents,
                url: form_action,
                error: function () {
                    $('#contact-form').before('<div class="alert alert-error">Versand fehlgeschlagen</div>');
                },
                success: function (result) {
                    $('#contact-form').before('<div class="alert">' +
                                             result +
                                             '</div>');
                }
            });
            return false;
        });
    });
}(jQuery));