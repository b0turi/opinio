var accessToken = '';

function searchSpotify(value, limit = 20) {
    if(value && value.length > 1) {
        $("#box").addClass('suggestion-box-bottom-border');
        showLoading();
        let url = 'https://api.spotify.com/v1/search?q=' + encodeURI(value) + '&type=album&limit=' + limit;
        if (limit > 50) {
            url = 'https://api.spotify.com/v1/search?q=' + encodeURI(value) + '&type=album&limit=50&offset=' + (limit - 50);
        }
        $.ajax({
            url: url,
            type: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + accessToken
            },
            success: function(data) {
                showData(data, limit);
            }
        });
    } else {
        $("#box").removeClass('suggestion-box-bottom-border');
        $("#box").html('');
        hideBox();
    }
}

function hideBox() {
    $("#box").hide();
}

function showLoading() {
    $("#box").show();
    $("#box").html(`<div style="text-align: center"><i style="font-size: 70px; padding: 30px;" class="fas fa-cog fa-spin"></i></div>`);
}

function showData(data, limit = 20) {
    $("#box").html('');
    for(let i in data['albums']['items']) {
        let artists = data['albums']['items'][i]['artists'];
        let artistsString = '';
        for(let j in artists) {
            artistsString += artists[j]['name'];
            if(j < artists.length - 1)
                artistsString += ', ';
        }

        let albumName = data['albums']['items'][i]['name'];
        let albumArt = data['albums']['items'][i]['images'][1]['url'];

        $("#box").append(`
            <div class="album-container album-container-hoverable" id="album${i}" data-art="${albumArt}" data-title="${albumName}" data-artists="${artistsString}">
                <img style="float:left;" src="${albumArt}" width="80px" crossOrigin="anonymous"/>
                <div class="album-desc-container">
                    <div class="album-title">${albumName}</div>
                    <div class="album-artists">${artistsString}</div>
                </div>
            </div>
        `);

        $("#album" + i).click(function(e){
            addAlbum($(this).data('art'), $(this).data('title'), $(this).data('artists'));
            $("#spotifySearch").val('');
            searchSpotify('');
        });

        if(i < data['albums']['items'].length - 1) {
            $("#box").append(`<div class="divider"></div>`);
        }
    }
    if(data['albums']['total'] == 0) {
        $("#box").html(`<p style="text-align: center; padding: 30px; font-size: 30px;">No results for '${searchTerm}'.</p>`)
    }
    if(data['albums']['items'].length == limit && data['albums']['total'] > limit) {
        $("#box").append(`<a id="loadMore" href="#">Load More</a>`);
        $("#loadMore").on('click', function(e){
            searchSpotify(searchTerm, limit + 20);
        });
    }
}

function addAlbum(art, title, artists) {
    if($("#list").children().length > 9) {
        return false;
    }

    let testImg = new Image();
    testImg.src = art;
    testImg.onerror = function() {
        $("#albumArt").val("INVALID IMAGE URL");
        return false;
    };

    testImg.onload = function() {
        $("#list").append(`
            <div class="list-item">
                <div class="album-container">

                    <div class="trash-btn"><i class="far fa-trash-alt"></i></div>
                    <div class="sort-btn"><i class="fas fa-sort"></i></div>
                    <div class="rank">${$("#list").children().length + 1}</div>
                    <img style="float:left; border:5px solid var(--accent2-shading)" src="${art}" width="100px"/>
                    <div class="main-album-desc-container">
                        <div class="main-album-title">${title}</div>
                        <div class="main-album-artists">${artists}</div>
                    </div>
                </div>
            </div>
        `);
        $(".trash-btn").off();
        $(".trash-btn").on('click', function(e){
            $(this)[0].parentElement.parentElement.remove();
            $(".generate-button").prop('disabled', true);
            updateRanks();
        });
        $("#albumArt").val(``);
        $("#albumArtist").val(``);
        $("#albumName").val(``);

        if($("#list").children().length == 10) {
            $(".generate-button").prop('disabled', false);
        }
        return true;
    }
}

function updateRanks() {
    let ranks = $("#list").children();
    ranks.each(function(i) {
        ranks[i].children[0].children[2].innerHTML = i + 1;
    });
}
