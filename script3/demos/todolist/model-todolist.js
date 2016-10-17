'use strict'

var rules = require('eslint-rules-es2015');

class TodoList{

    constructor() {
        this.list = [];
    }

    getList() {
        return this.list;
    }

    add(t){
        this.list.push({text: String(t), done: false});
    }

    set(ix, done){
        this.list[ix].done = done;
    }

    clean(){
        let cleanedList = [];

        this.list.forEach(el => {
            if(!el.done){
                cleanedList.push(el);
            }
        });
        this.list = cleanedList;
    }

    dump(){
        this.list.forEach(
            (t,i) => {console.log('Index: ' + i + ' ' + t.text + ' status: ' + t.done);
            console.log('------');
        });
    }
}

let myList = new TodoList();

myList.add('Kaffee kaufen');
myList.add('Code testen');
myList.dump();
$.each(myList.getList(), function(index, value){
    $('body').after('<pre>' + 'What: '+ value.text + ' Status: ' + value.done + '</pre>');
})

myList.set(0,true);