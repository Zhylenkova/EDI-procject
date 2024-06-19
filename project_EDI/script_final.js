var xmlhttp = new XMLHttpRequest();
var url = "";
var data = [];

function get_data(file_url) {
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            draw_graphs(myArr);
        }
    };
    xmlhttp.open("GET", file_url, true);
    xmlhttp.send();
}

function fetch1() {
    get_data("https://my.api.mockaroo.com/Cars.json?key=f621adc0");
}

function draw_graphs(objectData) {
    let tableData = "";
    let beenCount = 0;
    let notbeenCount = 0;

    const ageBuckets = [0, 0, 0];
    const satisfactionBuckets = [0, 0, 0];

    objectData.forEach((values) => {
        if (values.been_in_accident) {
            beenCount++;
        } else {
            notbeenCount++;
        }

        // const birthDate = new Date();
        const age = values.year_in_use;
        console.log(`Wiek dla ${values.VIN_number}: ${age}`);
        if (age < 5) {
            ageBuckets[0]++;
        } else if (age < 20) {
            ageBuckets[1]++;
        } else {
            ageBuckets[2]++;
        }

        const satisfaction_rate = values.satisfaction_rate;
        if (satisfaction_rate < 3) {
            satisfactionBuckets[0]++;
        } else if (satisfaction_rate < 6) {
            satisfactionBuckets[1]++;
        } else {
            satisfactionBuckets[2]++;
        }
    });

    objectData.map((values) => {
        tableData += `<tr>
        <td>${values.VIN_number}</td>
        <td>${values.been_in_accident}</td>
        <td>${values.car_model}</td>
        <td>${values.year_in_use}</td>
        <td>${values.satisfaction_rate}</td>
    </tr>`;
    });
    document.getElementById("table-body").innerHTML = tableData;

    const ctx = document.getElementById("pieChart").getContext("2d");
    const pieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Been in accident", "Has not been in accident"],
            datasets: [
                {
                    label: "Accidents",
                    data: [beenCount, notbeenCount],
                    backgroundColor: [
                        "rgba(0, 255, 0, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                    ],
                    borderColor: [
                        "rgba(0, 255, 0, 1)",
                        "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
    });
    // pieChart.canvas.parentNode.style.display = "inline";
    // pieChart.canvas.parentNode.style.height = "500px";
    pieChart.canvas.parentNode.style.width = "500px";
    // pieChart.canvas.parentNode.style.float = "right";

    const ctx2 = document.getElementById("barChart").getContext("2d");
    const barChart2 = new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["< 10", "10-20", "> 20"],
            datasets: [
                {
                    label: "Years in use",
                    data: ageBuckets,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
    });
    const ctx3 = document.getElementById("barChart2").getContext("2d");
    const barChart3 = new Chart(ctx3, {
        type: "bar",
        data: {
            labels: ["< 3", "3-6", "> 6"],
            datasets: [
                {
                    label: "Satisfaction Rate",
                    data: satisfactionBuckets,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
    });
}
