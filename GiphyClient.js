class GiphyClient {
    constructor() {
        this.limit = 28;
        this.offset = 0;
        this.dbName = 'favorites';
        SimpleDB.Create(this.dbName);
        this.items = [];
        SimpleDB.GetItems(this.dbName, (items) => {
            this.items = items;
        });
    }

    Load(type, query, offset = 0, callBack) {
        this.offset = 0;
        Http.Get(`http://api.giphy.com/v1/${type}/search?q=${query}&api_key=${apiKey}&offset=${offset}&limit=${this.limit}`, (response) => {

            callBack(JSON.parse(response));
        });
    }
    Preload(type, query, callBack) {
        this.offset += this.limit;
        Http.Get(`http://api.giphy.com/v1/${type}/search?q=${query}&api_key=${apiKey}&offset=${this.offset}&limit=${this.limit}`, (response) => {

            callBack(JSON.parse(response));
        });
    }
    get CountFavorites() {
        return this.items.length;
    }
    ShowFavorites(callBack) {
        SimpleDB.GetItems(this.dbName, callBack);
    }
    RemoveFavorite(favorite) {
        SimpleDB.GetItems(this.dbName, (items) => {
            var item = this.items.find(x => {
                if (x.id === favorite.id)
                    return x;
            });
            if (item) {
                var index = items.indexOf(items.find(x=>{ return x.id===favorite.id?x:null; }));

                if (index > -1) {
                    console.log(items.splice(index, 1));
                }
                this.items=items;
            }
            SimpleDB.Save(this.dbName, items);
        });
    }
    AddFavorite(favorite) {
        SimpleDB.GetItems(this.dbName, (items) => {
            if (!items) {
                items = new Array(0);
                items.push(favorite);
                this.items.push(favorite);
                SimpleDB.Save(this.dbName, items);
            }
            else {
                var item = this.items.find(x => {
                    if (x.id === favorite.id)
                        return x;
                });
                console.log(item);
                if (!item) {
                    items.push(favorite);
                    this.items.push(favorite);
                }
                SimpleDB.Save(this.dbName, items);
            }
        });
    }
}