class SimpleDB{
    constructor(){}
    static Create(key){
        var start_value=new Array(0);
        if(key){
            if(!localStorage.getItem(key))
            {
                localStorage.setItem(key,JSON.stringify(start_value));
            }
        }
    }
    static Save(key,value){
        let promise=new Promise((resolve,reject)=>{
            var items=JSON.stringify(value);
            if(items)
                resolve(items);
            else
                reject(new Error('data save error'));
        }).then(items=>{
            localStorage.setItem(key,items);
        }).catch(reject=>{
            console.log(reject);
        });

    }
    static SaveSync(key,items){
        var items=JSON.stringify(items);
        localStorage.setItem(key,items);
    }
    static GetItemsSync(key){
        var items=localStorage.getItem(key);
        return JSON.parse(items);
    }

    static GetItems(key,callback){
        let promise=new Promise((resolve,reject)=>{
            var items=localStorage.getItem(key);
                resolve(items);
        }).then(items=>{
            return JSON.parse(items);
        }).then(items=>{
            callback(items);
        }).catch(error=>{
            console.log(error);
        });
    }
}