// TODO: controllare isNight dal json
document.documentElement.setAttribute("data-theme", "dark");

window.onload = function () {
    document.querySelector("body").style.transitionDuration = "1s";

    const slider = document.getElementById("slider");
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

    let isNight = true;
    changeBackground(isNight);
    isNight = !isNight;

    // SOLO PER TEST: ------
    document.getElementById("test").addEventListener("click", function () {
        changeBackground(isNight);
        isNight = !isNight;
    });
    // ----------------------
};


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
        day.style.opacity = "0";
        night.style.opacity = "1";
        document.documentElement.setAttribute("data-theme", "dark");
        nav.classList.remove("bg-light");
        nav.classList.add("navbar-dark");
        nav.classList.add("bg-dark");
    } else {
        night.style.opacity = "0";
        day.style.opacity = "1";
        document.documentElement.setAttribute("data-theme", "light");
        nav.classList.remove("bg-dark");
        nav.classList.remove("navbar-dark");
        nav.classList.add("bg-light");
    }
}