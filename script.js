const startDate = new Date("2026-06-02");

// Sayaç fonksiyonu (Loading alanını günceller)
function updateCounter() {
    const today = new Date();
    const difference = today - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    const counterElement = document.getElementById("counter");
    if (counterElement) {
        counterElement.innerHTML = `${days} Days, ${hours} Hours, ${minutes} Minutes`;
        
    }
}

setInterval(updateCounter, 1000);
updateCounter();

// Mesaj Butonu İşlevi
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

        if (typeof messages !== 'undefined' && Array.isArray(messages) && messages[dayNumber - 1]) {
            messageText.innerText = messages[dayNumber - 1];
        } else {
            messageText.innerText = "Mesaj dosyası okunamadı. Lütfen messages.js dosyanı kontrol et.";
        }

        if (messageBox) {
            messageBox.style.display = "block";
            messageBox.classList.remove("hidden");
        }
    });
                               }
// Geçmiş Mesajları Gösteren Fonksiyon
const viewPastButton = document.getElementById("viewPastButton");
const pastMessagesModal = document.getElementById("pastMessagesModal");
const pastMessagesList = document.getElementById("pastMessagesList");

viewPastButton.addEventListener("click", function() {
    const today = new Date();
    const diffTime = today - relationshipStartDate;
    let currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    pastMessagesList.innerHTML = ""; // Listeyi temizle

    // Bugüne kadar olan tüm mesajları listele
    for (let i = 0; i < currentDay && i < messages.length; i++) {
        const p = document.createElement("p");
        p.style.borderBottom = "1px solid #eee";
        p.style.padding = "10px 0";
        p.innerHTML = `<strong>Day ${i + 1}:</strong> ${messages[i]}`;
        pastMessagesList.appendChild(p);
    }

    pastMessagesModal.style.display = "block";
});
