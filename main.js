const apiKey="kPYLajZHZche04iYNm48UTa1pI2Hn70B";
class Favorite{
    constructor(id,url){
        this.id=id;
        this.url=url;
    }
}
class SimpleDB{
    constructor(){}
    static Save(key,value){
        localStorage.setItem(key,value);
    }
    static GetItems(key){
        var items=localStorage.getItem(key);
        return items;
    }
    static Find(key,predicate){
        predicate(localStorage.getItem(key));
    }
}
class GalleryGenerator{
    constructor(){
    }
    
    static CreateItem(){
        
    }
}

let client=new GiphyClient();
function load(){
}
function search(){

}
function loadFavorites(){
    
}