$("form").submit(function (event) {
    var type = $("#sc").val();
    var desc = $("#textarea").val();
    var price = $("#price").val();
    console.log(type + " " + desc + " " + price);
    var obj = {
        types: type,
        descr: desc,
        pri: price,
        token: localStorage.getItem('token')
    }

    $.post("/user", obj);

    event.preventDefault();
});