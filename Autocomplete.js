let i = 0;
class AutocompleteItem {
    constructor(field, favorite) {
        this.field = field;
        this.favorite = favorite;
    }
}
class Autocomplete {
    constructor() { }
    static CreateField(value) {
        var item = document.createElement('div');
        item.id = i + '_dropdownitem';

        item.className = 'search-help';
        var label = document.createElement('label');
        label.innerHTML = value.field;
        label.setAttribute('onclick', `setSearch("${value.field}")`);
        label.className = 'search-field';
        var button = document.createElement('button');
        button.id = i;
        if (!value.favorite) {
            button.innerHTML = '+';
            button.setAttribute('onclick', `addFavoriteSearch("${value.field}")`);
        }
        else {
            button.setAttribute('onclick', `removeFavoriteSearch("${item.id}","${value.field}")`);
            button.innerHTML = '-';
        }

        button.className = 'btn btn-secondary add-favorite';
        item.appendChild(label);
        item.appendChild(button);
        i++;
        return item;
    }
    static GenerateFavoritesAutofields(field = 'autoComplete') {
        SimpleDB.Create('autocomplete');
        //localStorage.setItem('autocomplete',JSON.stringify([]));
        var element = document.getElementById(field);
        element.innerHTML = '';
        i = 0;
        var items = SimpleDB.GetItemsSync('autocomplete');
        items.forEach(item => {
            if (item.favorite == true)
                element.appendChild(this.CreateField(item, false));
        });
    }
    static RemoveFavoriteAutofield(field) {
        var items = SimpleDB.GetItemsSync('autocomplete');
        var item = items.find(x => {
            if (this.IsInclude(x.field, field)) {
                return x;
            }
        });
        if (item) {
            var index = items.indexOf(item);
            //items.splice(index,1);
            items[index].favorite = false;
            SimpleDB.SaveSync('autocomplete', items);
        }
    }
    static SetFavoriteAutofield(field) {
        var items = SimpleDB.GetItemsSync('autocomplete');
        var item = items.find(x => {
            if (this.IsInclude(x.field, field)) {
                return x;
            }
        });
        if (item) {
            var index = items.indexOf(item);
            items[index].favorite = true;
            //console.log(items[index]);
            SimpleDB.SaveSync('autocomplete', items);
        }
    }
    static GenerateAutofields(field = 'autoComplete') {
        SimpleDB.Create('autocomplete');
        //localStorage.setItem('autocomplete',JSON.stringify([]));
        var element = document.getElementById(field);
        element.innerHTML = '';
        var query = document.getElementById('search').value;
        i = 0;
        var counter = 0;
        var items = SimpleDB.GetItemsSync('autocomplete');
        if (items.length > 0) {
            items.forEach(item => {
                if (this.IsInclude(item.field, query)) {
                    if (counter < 5) {
                        element.appendChild(this.CreateField(item));
                    }
                    counter++;
                }
            });
        }
    }
    static IsInclude(str1 = "", str2 = "") {
        return str1.trim().toLowerCase().includes(str2.trim().toLowerCase());
    }
    static AddAutofield(field, flag) {
        if (field.trim().length > 0) {
            var items = SimpleDB.GetItemsSync('autocomplete');
            var item = items.find(x => {
                if (x.field.trim().toLowerCase() === field.trim().toLowerCase()) {
                    return x;
                }
            });
            if (!item) {
                items.push(new AutocompleteItem(field, flag));
                SimpleDB.SaveSync('autocomplete', items);
            }
        }
    }
}