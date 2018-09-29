class Http{
    constructor(){}
    static Get(url,callaBack){
        const promise=new Promise((resolve,reject)=>{
            var xhr=new XMLHttpRequest();
            xhr.open('GET',url,true);
            xhr.onload=()=>{
                if(xhr.status==200){
                    resolve(xhr.response);
                }else{
                    var error=new Error('Error');
                    reject(error);
                }
            };
            xhr.onerror=()=>{
                var error=new Error('Error');
                reject(error);
            }
            xhr.send();
        }).then(response=>{
            callaBack(response);
        }).catch(error=>{
            console.log(error);
        })
    }
}