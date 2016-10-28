$(document).ready(function() {
    lazyloadSettings = {
        placeholder: 'http://images.all-free-download.com/images/graphicthumb/plain_white_background_211387.jpg',
        threshold: 800,
        appear : function(elements_left, settings) {
            replaceWithBiggerImage(this);
        }
    };
    $(function() {
        $(".beastcast-img").lazyload(lazyloadSettings);
        $(".bombcast-img").lazyload(lazyloadSettings);
    });
});

/* If the desired scale for an image isn't available it gets changed
 * to the next scale above. This is to reduce bandwidth usage.
 * Order: scale_small -> scale_medium -> scale_large -> original */
function replaceWithBiggerImage(img) {
    if ($(img).attr('data-original').indexOf('scale_small') !== -1) {
        $(img).attr('src', $(img).attr('data-original').replace('scale_small', 'scale_small'));
        $(img).attr('data-original', '');
    } else if ($(img).attr('src').indexOf('scale_small') !== -1) {
        $(img).attr('src', $(img).attr('src').replace('scale_small', 'scale_medium'));
    } else if ($(img).attr('src').indexOf('scale_medium') !== -1) {
        $(img).attr('src', $(img).attr('src').replace('scale_medium', 'scale_large'));
    } else if ($(img).attr('src').indexOf('scale_large') !== -1) {
        $(img).attr('src', $(img).attr('src').replace('scale_large', 'original'));
    }
}
