class GiphyClient {
    constructor() {
        this.limit = 28;
        this.dbName = 'favorites';
        SimpleDB.Create(this.dbName);
        this.items = [];
        SimpleDB.GetItems(this.dbName, (items) => {
            this.items = items;
        });
    }
    Load(type, query, offset = 0, callBack) {
        var result = null;
        Http.Get(`http://api.giphy.com/v1/${type}/search?q=${query}&api_key=${apiKey}&offset=${offset}&limit=${this.limit}`, (response) => {

            callBack(JSON.parse(response));
        });
    }
    get CountFavorites() {
        return this.items.length;
    }
    ShowFavorites() {
        return this.items;
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
                if(this.items.find(x=>{
                    if(x.id===favorite.id)
                        return false
                }))
                {
                    items.push(favorite);
                    SimpleDB.Save(this.dbName, items);
                }
            }
        });
    }
}