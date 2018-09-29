class GiphyClient{   
    constructor(){
        this.limit=30;    
    }
    Load(query,offset=0,callBack){
        var result=null;
        Http.Get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&offset=${offset}&limit=${this.limit}`,(response)=>{
            callBack(response);
        });
    }
    
    AddFavorite(){

    }
}