'use strict'

const myList = new TodoList();

const refreshView = () => {
    let content = "";

    myList.getList().forEach((el, ix) => {
        let checked = "";
        if (el.done) {
            checked = "checked";
        }
        content += '<tr><td>' + el.text + '</td><td><input type="checkbox" id="check' + ix + '" ' + checked + '</td></tr>';
    });

    $('#todos').html(content);

    myList.getList().forEach((el, ix) => {
        $('#check' + ix).on('click', () => {
            () => {
                myList.set(ix, $('#todos input #check' + ix + '').attr())
            }
        })
    })
}