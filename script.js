const startDate = new Date("2026-06-02");

const button = document.getElementById("messageButton");
const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("dailyMessage");

if (button) {
    button.addEventListener("click", function() {
        const today = new Date();
        const difference = today - startDate;
        let dayNumber = Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

        if (dayNumber < 1) dayNumber = 1;
        if (dayNumber > 365) dayNumber = 365;

        if (typeof messages !== 'undefined' && messages[dayNumber - 1]) {
            messageText.innerText = messages[dayNumber - 1];
        } else {
            messageText.innerText = "Bugünün mesajı henüz eklenmedi veya yüklenemedi.";
        }

        if (messageBox) {
            messageBox.style.display = "block";
            messageBox.classList.remove("hidden");
        }
    });
}
