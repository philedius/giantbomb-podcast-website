var small = 0
var medium = 0
var large = 0
var original = 0
$(document).ready(function() {
    $.getJSON('/scripts/giantbomb.json', function (data) {
        console.log(data);
        small = data.bombcast.length + data.beastcast.length;
        for (var i = 0; i < data.bombcast.length; i++) {
            episode = data.bombcast[i];
            $('.bombcast').append(getEpisodeHtml(episode, 'bombcast'));
        }

        for (var i = 0; i < data.beastcast.length; i++) {
            episode = data.beastcast[i];
            $('.beastcast').append(getEpisodeHtml(episode, 'beastcast'));
        }

        lazyloadSettings = {
            appear : function(elements_left, settings) {
                replaceWithBiggerImage(this);
            },
            threshold: 800,
            placeholder: 'http://images.all-free-download.com/images/graphicthumb/plain_white_background_211387.jpg'
        };

        $(function() {
            $(".beastcast-img").lazyload(lazyloadSettings);
        });

        $(function() {
            $(".bombcast-img").lazyload(lazyloadSettings);
        });

    });
});


function replaceWithBiggerImage(img) {
    if ($(img).attr('data-original').indexOf('scale_small') !== -1) {
        $(img).attr('src', $(img).attr('data-original').replace('scale_small', 'scale_small'));
        $(img).attr('data-original', '');
    } else if ($(img).attr('src').indexOf('scale_small') !== -1) {
        $(img).attr('src', $(img).attr('src').replace('scale_small', 'scale_medium'));
        // small -= 1;
        // medium += 1;
        // console.log('small to medium', img.src);
    } else if ($(img).attr('src').indexOf('scale_medium') !== -1) {
        $(img).attr('src', $(img).attr('src').replace('scale_medium', 'scale_large'));
        // medium -= 1;
        // large += 1;
        // console.log('medium to large', img.src);
    } else if ($(img).attr('src').indexOf('scale_large') !== -1) {
        $(img).attr('src', $(img).attr('src').replace('scale_large', 'original'));
        // large -= 1;
        // original += 1;
        // console.log('large to original', img.src);
    }

}

function getEpisodeHtml(episode, podcast) {
    episode.image = episode.image.replace('original', 'scale_small');
    return '<div class="episode">' +
            '<div class="image"><img class="'+podcast+'-img" data-original="' + episode.image + '" onerror="replaceWithBiggerImage(this)"></div>' +
            '<div class="info"><h3 class="title"><a href="' + episode.link + '">' + episode.title + '</a></h4>' +
            '<span class="date">' + episode.date + '</span>' +
            '<p class="summary">' + episode.summary + '</p>' +
            '<a class="download-link" href="' + episode.download_link + '">Download Episode</a>' +
            '<span class="duration">' + episode.duration + '</span></div>' +
                ''
}
