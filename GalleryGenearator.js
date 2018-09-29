class GalleryGenerator{
    constructor(){
    }   
    static CreateItem(id,url){
        var grid=document.getElementById('grid');
        var li=document.createElement('li');

        var item=document.createElement('div');
        item.className='card res';
        item.style.marginRight='10px';
        item.style.marginBottom='10px';

        var img=document.createElement('img');
        img.className='card-img-top fa';
        img.src=url;
        img.style.height='250px';
        img.style.width='100%';
        var div=document.createElement('div');
        div.className='favorite';

        var button=document.createElement('button')
        button.className='btn btn-secondary add';
        button.innerHTML='Add favorite';
        button.id=id;
        button.setAttribute('dataid',`${id}`);
        button.setAttribute('dataurl',`${url}`);
        button.setAttribute('onclick',`addFavorite()`);

        div.appendChild(button);

        item.innerHTML+=img.outerHTML;
        item.innerHTML+=div.outerHTML;

        li.innerHTML=item.outerHTML;
        grid.innerHTML+=li.outerHTML;
    }
    static CreateItemFavaorite(id,url){
        var grid=document.getElementById('grid');
        var li=document.createElement('li');
        li.id=id+"_item";
        var item=document.createElement('div');
        item.className='card res';
        item.style.marginRight='10px';
        item.style.marginBottom='10px';

        var img=document.createElement('img');
        img.className='card-img-top fa';
        img.src=url;
        img.style.height='250px';
        img.style.width='100%';
        var div=document.createElement('div');
        div.className='favorite';

        var button=document.createElement('button')
        button.className='btn btn-secondary add';
        button.innerHTML='Remove favorite';
        button.id=id;
        button.setAttribute('dataid',`${id}`);
        button.setAttribute('dataurl',`${url}`);
        button.setAttribute('onclick',`removeFavorite()`);

        div.appendChild(button);

        item.innerHTML+=img.outerHTML;
        item.innerHTML+=div.outerHTML;

        li.innerHTML=item.outerHTML;
        grid.innerHTML+=li.outerHTML;
    }
}