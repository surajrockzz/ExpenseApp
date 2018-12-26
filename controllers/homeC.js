$(window).load(function(){

    $("form").submit(function (event) {
        var type = $("#sc").val();
        var desc = $("#textarea").val();
        var price = $("#price").val();
        console.log(type + " " + desc + " " + price);
        var obj = {
            types: type,
            descr: desc,
            pri: price,
        }
       $.ajax({
           url: "/user",
           type: 'POST',
           headers:{"token":localStorage.getItem("token")},
           contentType: 'application/json',
           data: JSON.stringify(obj),
           error: function (err) {
               console.log('Error!', err)
           },
           success: function (data) {
               console.log('login Success!')
           }
       });
        event.preventDefault();
    });
    $("#logout").click(function () {
        localStorage.removeItem('token');
        window.location.replace("login.html");
    });


})

