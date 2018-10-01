const apiKey = "kPYLajZHZche04iYNm48UTa1pI2Hn70B";
let client = new GiphyClient();
let offest = 0;
let selectedMode = 'favorites';

function clearSelected() {
    document.getElementsByName('mode').forEach(el => {
        document.getElementById(el.id).className = "btn btn-secondary el eq";
    });
}

function selectMode(mode) {
    clearSelected();
    selectedMode = mode;
    if (selectedMode != 'favorites') {
        selectedMode = mode;
        search();
    }
    else if (mode === 'favorites') {
        loadFavorites();
    }
    document.getElementById(mode).className = 'btn btn-primary el eq';
}
function search() {
    if (selectedMode === 'favorites') {
        clearSelected();
        document.getElementById('gifs').className = 'btn btn-primary el eq';
        selectedMode = 'gifs';
    }
    var query = document.getElementById('search').value;
    if (query.length > 0) {
        document.getElementById('grid').innerHTML = '';
        Autocomplete.AddAutofield(query, false);
        client.Load(selectedMode, query, offest, (response) => {
            response.data.forEach((value) => {
                GalleryGenerator.CreateItem(value.id, value.images.downsized_large.url);
            });
        });
    }
}
function addFavorite() {
    var element = document.getElementById(event.srcElement.id);
    var favorite = new Favorite(
        id = element.getAttribute('dataid'),
        url = element.getAttribute('dataurl')
    );
    client.AddFavorite(favorite);
    if (document.getElementById('favorites').hidden)
        document.getElementById('favorites').hidden = false;
}
function removeFavorite() {
    var element = document.getElementById(event.srcElement.id);
    document.getElementById(element.id + '_item').outerHTML = '';
    client.RemoveFavorite(new Favorite(event.srcElement.id, element.getAttribute('dataurl')));
}
function loadFavorites() {
    document.getElementById('grid').innerHTML = '';
    console.log(document.getElementById('grid').innerHTML);
    client.ShowFavorites((items) => {
        items.forEach(favorite => {
            GalleryGenerator.CreateItemFavaorite(favorite.id, favorite.url)
        });
    });
}
function searchFocused() {
    var element = event.srcElement;
    document.getElementById('autoComplete').style.display = 'block';
    if (document.getElementById('search').value.length <= 0)
        Autocomplete.GenerateFavoritesAutofields();
    else
        Autocomplete.GenerateAutofields();
}
function setSearch(value) {
    if (value) {
        document.getElementById('search').value = value;
        search();
        document.getElementById('autoComplete').style.display = 'none';
    }
}
function addFavoriteSearch(value) {
    if (document.getElementById('search').value.length > 0)
        document.getElementById(event.srcElement.id).innerHTML = '-';
    Autocomplete.SetFavoriteAutofield(value);
    document.getElementById('search').focus();
}
function removeFavoriteSearch(value, field) {

    if (document.getElementById('search').value.length > 0)
        document.getElementById(event.srcElement.id).innerHTML = '+';
    else
        document.getElementById(value).outerHTML = '';
    Autocomplete.RemoveFavoriteAutofield(field);
    document.getElementById('search').focus();
}
function setAutoCompete() {
    if (document.getElementById('search').value.length > 0) {
        Autocomplete.GenerateAutofields();
    }
    else {
        Autocomplete.GenerateFavoritesAutofields();
    }
    if (event.keyCode === 13) {
        document.getElementById('autoComplete').style.display = 'none';
    }
}
function setAutoCompete2() {

}
function load() {
    if (client.CountFavorites > 0) {
        document.getElementById('favorites').hidden = false;
        loadFavorites();
    }
    else {
        document.getElementById('favorites').className = 'btn btn-secondary el eq';
        document.getElementById('gifs').className = 'btn btn-primary el eq';
    }
}
function scrollLoad() {
    //console.log(window.screen.height,' y=',document.documentElement.scrollHeight-window.screenTop,' ',window.pageYOffset);
    var element = document.documentElement;

    var temp = element.scrollTop;
    element.scrollTop = 1 + element.scrollHeight - element.clientHeight;
    var height = element.scrollTop;
    element.scrollTop = temp;
    var scroll = element.scrollTop;
    if (height - scroll === 0) {
        if (selectedMode != 'favorites') {
            var query = document.getElementById('search').value;
            if (query != null || query != undefined) {
                client.Preload(selectedMode, query, (response) => {
                    response.data.forEach((value) => {
                        GalleryGenerator.CreateItem(value.id, value.images.downsized_large.url);
                    });
                });
            }
        }
    }
}