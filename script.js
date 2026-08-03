const startDate = new Date("June 2, 2026 00:00:00");


function updateCounter() {

    const now = new Date();

    const difference = now - startDate;


    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );


    document.getElementById("counter").innerHTML =
        `${days} Days, ${hours} Hours, ${minutes} Minutes ❤️`;
}


setInterval(updateCounter, 1000);

updateCounter();



const button = document.getElementById("messageButton");
const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("dailyMessage");


button.addEventListener("click", function() {

    const today = new Date();
    const dayNumber = today.getDate();

    messageText.innerHTML =
        messages[dayNumber - 1] ||
        "Every day with you is special ❤️";


    messageBox.classList.remove("hidden");

    button.style.display = "none";

});



function checkSpecialDays(){

    const today = new Date();

    const month = today.getMonth() + 1;
    const day = today.getDate();


    const special = document.getElementById("specialDay");


    if(day === 10 && month === 3){

        special.innerHTML =
        "🎂 Happy Birthday Lia ❤️";

        special.classList.remove("hidden");

    }


    if(day === 2 && month === 6){

        special.innerHTML =
        "💍 Happy Anniversary Selimcan & Lia ❤️";

        special.classList.remove("hidden");

    }

}


checkSpecialDays();
