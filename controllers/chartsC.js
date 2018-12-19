var obji = {
    "Food": 0,
    "Shopping": 0,
    "Entertainment": 0,
    "Lend": 0,
    "Borrow": 0,
    "token": localStorage.getItem('token')
}
var answer = null;
var inde = ["Food", "Shopping", "Entertainment", "Lend", "Borrow"]
var values = [];
$("#butt").click(function () {
    $.ajax({
            type: 'POST',
            url: "/query",
            data: obji,
        })
        .done(function (results) {
            answer = results;
            console.log(answer)
            for (var i = 0; i < 5; i++)
                values.push(parseInt(answer[inde[i]], 10))
            console.log(values);
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: inde,
                    datasets: [{
                        label: '# of Votes',
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })
})