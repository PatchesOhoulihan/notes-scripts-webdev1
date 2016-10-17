'use strict'


class TodoList{

    constructor() {
        this.list = ["Test Element"];
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
