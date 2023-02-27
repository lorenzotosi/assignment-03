const start = new Date().setHours(8, 0, 0);
const end = new Date().setHours(19, 0, 0);
let now = new Date();
let isNight = start < now && now < end ? false : true;
document.documentElement.setAttribute("data-theme", isNight ? "dark" : "light");

window.onload = function () {
    document.querySelector("body").style.transitionDuration = "1s";

    updateClock();

    const slider = document.getElementById("slider");
    handleSlider(slider);

    changeBackground(isNight);

    let isOn = false;
    lightSwitches = document.querySelectorAll(".light-switch");
    lightSwitches.forEach(element => {
        element.addEventListener("click", function () {
            isOn = !isOn;
            checkLights(isOn);
        });
    });
};

function handleSlider(slider) {
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

function slideRollerBlinds(value) {
    document.getElementById("close").style.top = -value * 0.85 + "%";
    if (value == 0) {
        document.getElementById("window-status").innerHTML = "closed";
    } else if (value == 100) {
        document.getElementById("window-status").innerHTML = "completely open";
    } else {
        document.getElementById("window-status").innerHTML = "open at " + value + "%";
    }
    axios.post("room-dashboard-window.php", { Type: "window", Value: value }).then(response => { });
}

function checkLights(isOn) {
    document.getElementById("lights-status").innerHTML = isOn ? "on" : "off";
    document.getElementById("lights-status").style.color = isOn ? "green" : "red";
    document.getElementById(isOn ? "light-on" : "light-off").style.opacity = "1";
    document.getElementById(isOn ? "light-off" : "light-on").style.opacity = "0";
    axios.post("room-dashboard-window.php", { Type: "lights", Value: isOn }).then(response => { });
}

function changeBackground(isNight) {
    const night = document.getElementById("night");
    const day = document.getElementById("day");
    const nav = document.querySelector("nav");
    if (isNight) {
        document.documentElement.setAttribute("data-theme", "dark");
        day.style.opacity = "0";
        night.style.opacity = "1";
        nav.classList.remove("bg-light");
        nav.classList.add("navbar-dark");
        nav.classList.add("bg-dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        night.style.opacity = "0";
        day.style.opacity = "1";
        nav.classList.remove("bg-dark");
        nav.classList.remove("navbar-dark");
        nav.classList.add("bg-light");
    }
}

function updateClock() {
    const clock = document.getElementById("clock");
    let currentTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    clock.innerHTML = currentTime;
}
setInterval(updateClock, 1000);