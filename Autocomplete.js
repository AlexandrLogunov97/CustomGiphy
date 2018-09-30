let i = 0;
class AutocomplateItem{
    constructor(field,favorite){
        this.field=field;
        this.favorite=favorite;
    }
}
class Autocomplate {
    constructor() { }
    static CreateField(value) {
        var item = document.createElement('div');
        item.id = i + '_dropdownitem';
        i++;
        item.className = 'dropdown-item search-help';
        var label = document.createElement('label');
        label.innerHTML = value.field;
        label.setAttribute('onclick', `setSearch("${value.field}")`);
        label.className = 'search-field';
        var button = document.createElement('button');
        if(!value.favorite)
        {
            button.innerHTML ='+';
            button.setAttribute('onclick', `addFavoriteSearch("${value.field}")`);
        }
        else
        {
            button.setAttribute('onclick', `removeFavoriteSearch("${item.id}","${value.field}")`);
            button.innerHTML ='-';
        }
        console.log('button ',value.favorite);

        button.className = 'btn btn-secondary add-favorite';
        item.appendChild(label);
        item.appendChild(button);
        return item;
    }
    static GenerateFavoritesAutofields(field = 'autoComplete') {
        SimpleDB.Create('autocomplete_favorites');
        //localStorage.setItem('autocomplete',JSON.stringify([]));
        var element = document.getElementById(field);
        element.innerHTML = '';
        SimpleDB.GetItems('autocomplete', (items) => {
            items.forEach(item => {
                if(item.favorite==true)
                    element.appendChild(this.CreateField(item,false));
            });
        });
    }
    static RemoveFavoriteAutofield(field){
        SimpleDB.GetItems('autocomplete', (items) => {
            var item = items.find(x => {
                if (this.IsInclude(x.field, field)) {
                    return x;
                }
            });
            if (item) {
                var index=items.indexOf(item);
                //items.splice(index,1);
                items[index].favorite=false;
                SimpleDB.Save('autocomplete', items);
            }
        });
    }
    static SetFavoriteautofield(field){
        SimpleDB.GetItems('autocomplete', (items) => {
            var item = items.find(x => {
                if (this.IsInclude(x.field, field)) {
                    return x;
                }
            });
            if (item) {
                var index=items.indexOf(item);
                items[index].favorite = true;
                console.log(items[index]);
                SimpleDB.Save('autocomplete', items);
            }
        });
    }
    static GenerateAutofields(field = 'autoComplete') {
        SimpleDB.Create('autocomplete');
        //localStorage.setItem('autocomplete',JSON.stringify([]));
        var element = document.getElementById(field);
        element.innerHTML = '';
        var query = document.getElementById('search').value;
        var counter = 0;
        SimpleDB.GetItems('autocomplete', (items) => {
            if (items.length > 0) {
                items.forEach(item => {
                    if (counter <= 5) {
                        console.log(item.field,' ',query);
                        if (this.IsInclude(item.field, query)) {
                            element.appendChild(this.CreateField(item));
                        }
                        counter++;
                    }
                });
            }
        });
    }
    static IsInclude(str1="",str2=""){
        return str1.toString().toLowerCase().includes(str2.toString().toLowerCase());
    }
    static AddAutofield(field,flag) {
        SimpleDB.GetItems('autocomplete', (items) => {
            var item = items.find(x => {
                if (this.IsInclude(x.field, field)) {
                    return x;
                }
            });
            if (!item) {
                items.push(new AutocomplateItem(field,flag));
                SimpleDB.Save('autocomplete', items);
            }
        });
    }
}