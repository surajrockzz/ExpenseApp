if (localStorage.getItem("token") != null) {
    window.location.replace("views/home.html");
}
else{
$(window).load(function(){
    $("#sub").click(function () {
            var username = $("#username").val();
            var pass = $("#password").val();
            var data ={
                username:username,
                pass:pass
            }
            $.ajax({
                url: "/login",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                error: function (err) {
                    console.log('Error!', err)
                },
                success: function (data) {
                    console.log('login Success!')
                    localStorage.setItem('token', data);
                }
            });
    });
})
}

