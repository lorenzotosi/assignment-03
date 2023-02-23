// TODO: controllare isNight dal json
document.documentElement.setAttribute("data-theme", "dark");
window.onload = function () {
    google.charts.load('current', {'packages':['timeline']});
    google.charts.setOnLoadCallback(drawChart);
    document.querySelector("body").style.transitionDuration = "1s";
    const slider = document.getElementById("slider");
    handleSlider(slider);

    let isNight = true;
    changeBackground(isNight);
    isNight = !isNight;

    // SOLO PER TEST: ------
    if (document.getElementById("test")) {
        document.getElementById("test").addEventListener("click", function () {
            changeBackground(isNight);
            isNight = !isNight;
        });
    }
    // ----------------------
};

function handleSlider(slider) {
    if (!slider) return;
    slider.defaultValue = 0;
    slider.addEventListener("mousedown", function () {
        document.getElementById("close").style.transition = "none";
        slider.addEventListener("mousemove", function () {
            slideRollerBlinds(this.value);
        });
    });
    slider.addEventListener("mouseup", function () {
        document.getElementById("close").style.transition = "top 0.5s";
        slider.removeEventListener("mousemove", function () {
            slideRollerBlinds(this.value);
        });

    });
    slider.addEventListener("click", function () {
        slideRollerBlinds(this.value);
    });
}


function drawChart() {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'President' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
      [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
      [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
      [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]]);

    chart.draw(dataTable);
  }


function slideRollerBlinds(value) {
    document.getElementById("close").style.top = -value * 0.85 + "%";
    if (value == 0) {
        document.getElementById("status").innerHTML = "closed";
    } else {
        document.getElementById("status").innerHTML = "open at " + value + "%";
    }
}

function changeBackground(isNight) {
    const night = document.getElementById("night");
    const day = document.getElementById("day");
    const nav = document.querySelector("nav");
    if (isNight) {
        if (day && night) {
            day.style.opacity = "0";
            night.style.opacity = "1";
        }
        document.documentElement.setAttribute("data-theme", "dark");
        nav.classList.remove("bg-light");
        nav.classList.add("navbar-dark");
        nav.classList.add("bg-dark");
    } else {
        if (day && night) {
            night.style.opacity = "0";
            day.style.opacity = "1";
        }
        document.documentElement.setAttribute("data-theme", "light");
        nav.classList.remove("bg-dark");
        nav.classList.remove("navbar-dark");
        nav.classList.add("bg-light");
    }
}