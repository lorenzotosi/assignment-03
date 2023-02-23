// TODO: controllare isNight dal json
document.documentElement.setAttribute("data-theme", "dark");

window.onload = function () {
    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(drawChart);

    document.querySelector("body").style.transitionDuration = "1s";

    let isNight = true;
    changeBackground(isNight);
    isNight = !isNight;
};

window.onresize = function () {
    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(drawChart);
};

function drawChart() {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'President' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        ['On', new Date(1789, 3, 30), new Date(1797, 2, 4)],
        ['Off', new Date(1797, 2, 4), new Date(1801, 2, 4)],
    ]);

    var options = {
        backgroundColor: "#323438",
        colors: ["green", "red"],
    };

    chart.draw(dataTable, options);
}

function changeBackground(isNight) {
    const nav = document.querySelector("nav");
    if (isNight) {
        document.documentElement.setAttribute("data-theme", "dark");
        nav.classList.remove("bg-light");
        nav.classList.add("navbar-dark");
        nav.classList.add("bg-dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        nav.classList.remove("bg-dark");
        nav.classList.remove("navbar-dark");
        nav.classList.add("bg-light");
    }
}