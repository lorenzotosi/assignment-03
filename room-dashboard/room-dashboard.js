window.onload = function() {
    const slider = document.getElementById("slider");
    slider.defaultValue = 0;
    slider.addEventListener("input", function() {
        slideRollerBlinds(this.value);
    });
    let isNight = false;
    document.getElementById("test").addEventListener("click", function() {
            changeBackground(isNight);
            isNight = !isNight;
        });
}


function slideRollerBlinds(value) {
    document.getElementById("close").style.top = -value * 0.85 + "%";
}

function changeBackground(isNight){
    const night = document.getElementById("night");
    const day = document.getElementById("day");
    if(isNight){
        day.style.opacity = "0";
        night.style.opacity = "1";
    } else {
        night.style.opacity = "0";
        day.style.opacity = "1";
    }
}