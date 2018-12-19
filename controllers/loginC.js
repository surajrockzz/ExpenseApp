 $("#sub").click(function () {
     if (localStorage.getItem('token') == null) {
         var username = $("#username").val();
         var pass = $("#password").val();
         $.ajax({
             url: "/login",
             type: 'POST',
             data: {
                 username: username,
                 pass: pass
             },
             error: function (err) {
                 console.log('Error!', err)
             },
             success: function (data) {
                 console.log('login Success!')
                 localStorage.setItem('token', data);

             }
         });
     } else {
         alert("somebody already logged in ");
     }

 });