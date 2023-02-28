const start = new Date().setHours(8, 0, 0);
const end = new Date().setHours(19, 0, 0);
let now = new Date();
let isNight = start < now && now < end ? false : true;
document.documentElement.setAttribute("data-theme", isNight ? "dark" : "light");
let legendColor = isNight ? "white" : "black";
let chartBackgroundColor = isNight ? "#686868" : "#c1e8ff";

window.onload = function () {
    google.charts.load("current", { "packages": ["timeline", "line", "corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    document.querySelector("body").style.transitionDuration = "1s";

    changeBackground(isNight);
};

window.onresize = function () {
    google.charts.load("current", { "packages": ["timeline", "line", "corechart", "annotationchart"] });
    google.charts.setOnLoadCallback(drawChart);
};


// TODO chiamare questa funzione
function test() {
    axios.get("room-dashboard-history.php").then((response) => {
        console.log(response.data);
    });
}

function drawChart() {
    axios.get("logs.json").then((response) => {
        let windowData = response.data["data"]["window-log"];
        let lightsData = response.data["data"]["lights-log"];
        // drawWindowLog(windowData);
        drawLightsLog(lightsData);
        drawLightsUsage(lightsData);
        drawWindowLogg(windowData);
    });
}

function drawWindowLogg(data) {
    const chart = new CanvasJS.Chart("window-logg", {
        axisY: {
            interval: 10,
            maximum: 100,
            suffix: "%",
            valueFormatString: "#"
        },
        data: [{
            type: "stepLine",
            yValueFormatString: "#0.0\"%\"",
            xValueFormatString: "HH:mm:ss",
            markerSize: 5,
            dataPoints: [
            ]
        }]
    });

    data.forEach(element => {
        chart.options.data[0].dataPoints.push({ x: convertTime(element.start), y: element.status });
    });
    chart.render();
}


function drawWindowLog(data) {
    const container = document.getElementById("window-log");
    const chart = new google.visualization.LineChart(container);
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: "datetime", id: "Start" });
    // dataTable.addColumn({ type: "datetime", id: "End" });
    // dataTable.addColumn({ type: "string", id: "dummy bar label" });
    dataTable.addColumn({ type: "string", role: "tooltip" });
    dataTable.addColumn({ type: "number", id: "Status" });
    data.forEach(element => {
        const tooltip = `
            <div>
                <div class="border-bottom p-2">
                    <p class="mb-0 text-dark"><b>Status:</b> ${element.status}%</p>
                </div>
                <div class="p-2" style="width: max-content">
                    <p class="mb-0 text-dark"><b>Time:</b> ${getTimeDifference(convertTime(element.end), convertTime(element.start))}</p>
                </div>
            </div>
        `;
        dataTable.addRow([
            convertTime(element.start),
            // convertTime(element.end),
            // null,
            tooltip,
            element.status
        ]);
    });
    const options = {
        colors: ["black"],
        curveType: "step",
        chartArea: {
            width: "85%",
            height: "80%",
        },
        legend: {
            position: "none"
        },
        backgroundColor: chartBackgroundColor,
        hAxis: {
            format: 'HH:MM',
            color: legendColor,
        },
        vAxis: {
            color: legendColor,
            ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        },
    };
    chart.draw(dataTable, options);
}

function drawLightsLog(data) {
    const container = document.getElementById("lights-log");
    const chart = new google.visualization.Timeline(container);
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: "string", id: "Status" });
    dataTable.addColumn({ type: "string", id: "dummy bar label" });
    dataTable.addColumn({ type: "string", role: "tooltip" });
    dataTable.addColumn({ type: "datetime", id: "Start" });
    dataTable.addColumn({ type: "datetime", id: "End" });
    data.forEach(element => {
        const tooltip = `
            <div>
                <div class="border-bottom p-2">
                    <p class="mb-0 text-dark"><b>Status:</b> ${element.status}</p>
                </div>
                <div class="p-2" style="width: max-content">
                    <p class="mb-0 text-dark"><b>Duration:</b> ${getTimeDifference(convertTime(element.end), convertTime(element.start))}</p>
                </div>
            </div>
        `;
        dataTable.addRow([
            element.status,
            null,
            tooltip,
            convertTime(element.start),
            convertTime(element.end),
        ]);
        // options.hAxis.ticks.push(convertTime(element.start));
        // options.hAxis.ticks.push(convertTime(element.end));
    });
    const options = {
        backgroundColor: chartBackgroundColor,
        colors: ["green", "red"],
        hAxis: {
            format: 'HH:MM',
            gridlines: {
                color: "transparent",
            },
            // ticks: [],
        },
        timeline: {
            rowLabelStyle: {
                color: "black",
                fontSize: 14,
            },
            barLabelStyle: {
                color: legendColor,
                fontSize: 14,
            },
        },
        // chxl: data.map(element => `0:|${convertTime(element.start).toLocaleTimeString()}|${convertTime(element.end).toLocaleTimeString()}`)
    };
    chart.draw(dataTable, options);
}

function drawLightsUsage(data) {
    const container = document.getElementById("lights-usage");
    const chart = new google.visualization.PieChart(container);
    let sumOn = "00:00:00";
    let sumOff = "00:00:00";
    data.forEach(element => {
        if (element.status == "On") sumOn = sumTimes(sumOn, getTimeDifference(convertTime(element.end), convertTime(element.start)));
        else sumOff = sumTimes(sumOff, getTimeDifference(convertTime(element.end), convertTime(element.start)));
    });
    const dataTable = google.visualization.arrayToDataTable([
        ["Status", "Hours"],
        ["On: " + sumOn, stringToSeconds(sumOn)],
        ["Off: " + sumOff, stringToSeconds(sumOff)]
    ]);
    const options = {
        backgroundColor: "transparent",
        colors: ["green", "red"],
        is3D: true,
        legend: {
            position: "right",
            textStyle: {
                color: legendColor,
                fontSize: 14,
            },
        },
        chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        },
        pieSliceText: "percentage",
        pieSliceTextStyle: {
            fontSize: 14,
        },
        tooltip: {
            trigger: "none",
        }
    };
    chart.draw(dataTable, options);
}

function convertTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(component => parseInt(component));
    const dateTime = new Date();
    dateTime.setHours(hours, minutes, seconds);
    return dateTime;
}

function stringToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(component => parseInt(component));
    return hours * 3600 + minutes * 60 + seconds;
}

function sumTimes(firstTime, secondTime) {
    const endSeconds = stringToSeconds(firstTime);
    const startSeconds = stringToSeconds(secondTime);
    const totalSeconds = endSeconds + startSeconds;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getTimeDifference(endDate, startDate) {
    const millisDifference = Math.abs(endDate - startDate);
    const secondsDifference = Math.round(millisDifference / 1000);
    const hours = Math.floor(secondsDifference / 3660);
    const minutes = Math.floor((secondsDifference % 3600) / 60);
    const seconds = secondsDifference % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function changeBackground(isNight) {
    const nav = document.querySelector("nav");
    if (isNight) {
        document.documentElement.setAttribute("data-theme", "dark");
        nav.classList.remove("bg-light");
        nav.classList.add("navbar-dark");
        nav.classList.add("bg-dark");
        legendColor = "white";
        chartBackgroundColor = "#686868";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        nav.classList.remove("bg-dark");
        nav.classList.remove("navbar-dark");
        nav.classList.add("bg-light");
        legendColor = "black";
        chartBackgroundColor = "#c1e8ff";
    }
}