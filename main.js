const apiKey = "kPYLajZHZche04iYNm48UTa1pI2Hn70B";
let client = new GiphyClient();
let offest = 0;
let selectedMode = 'gifs';

function clearSelected() {
    document.getElementsByName('mode').forEach(el => {
        document.getElementById(el.id).className = "btn btn-secondary el eq";
    });
}

function selectMode(mode) {
    clearSelected();
    if (mode != 'favorites') {
        selectedMode = mode;
        search();
    }
    else if(mode === 'favorites'){
        loadFavorites();
    }
    document.getElementById(mode).className = 'btn btn-primary el eq';
}
function search() {
    var query = document.getElementById('search').value;
    if (query != null || query != undefined) {
        document.getElementById('grid').innerHTML = '';
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
    console.log(favorite);
    client.AddFavorite(favorite);
    if (document.getElementById('favorites').hidden)
        document.getElementById('favorites').hidden = false;
}
function removeFavorite(){
    var element = document.getElementById(event.srcElement.id);
    document.getElementById(element.id+'_item').outerHTML='';
}
function loadFavorites() {
    document.getElementById('grid').innerHTML='';
    console.log(document.getElementById('grid').innerHTML);
    client.ShowFavorites().forEach(favorite => {
        GalleryGenerator.CreateItemFavaorite(favorite.id, favorite.url);
    });
}
function searchFocused(){
    document.getElementById('autoComplete').style.display='block';
}
function load(){
    if(client.CountFavorites>0){
        document.getElementById('favorites').hidden=false;
        loadFavorites();
    }
}