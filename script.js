const relationshipStartDate = new Date("2026-06-02");

// Sayaç Fonksiyonu
function updateCounter() {
    const today = new Date();
    const difference = today - relationshipStartDate;

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

// Arka Plan Kalp Yağmuru Efekti
function createFloatingHearts() {
    const hearts = ['❤️', '💖', '🌸', '✨'];
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        document.body.appendChild(heart);
    }
}
createFloatingHearts();

// Bugünün Mesajını Aç
const messageButton = document.getElementById("messageButton");
const messageBox = document.getElementById("messageBox");
const dailyMessage = document.getElementById("dailyMessage");

if (messageButton) {
    messageButton.addEventListener("click", function() {
        const today = new Date();
        const diffTime = today - relationshipStartDate;
        let dayNumber = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (dayNumber < 1) dayNumber = 1;
        if (dayNumber > 365) dayNumber = 365;

        if (typeof messages !== 'undefined' && Array.isArray(messages) && messages[dayNumber - 1]) {
            dailyMessage.innerText = messages[dayNumber - 1];
        } else {
            dailyMessage.innerText = "Mesaj dosyası okunamadı.";
        }

        if (messageBox) {
            messageBox.style.display = "block";
        }
    });
}

// Geçmiş Mesajlar Penceresi
const viewPastButton = document.getElementById("viewPastButton");
const pastModal = document.getElementById("pastModal");
const closeModal = document.getElementById("closeModal");
const pastMessagesList = document.getElementById("pastMessagesList");

if (viewPastButton && pastModal) {
    viewPastButton.addEventListener("click", function() {
        const today = new Date();
        const diffTime = today - relationshipStartDate;
        let currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        pastMessagesList.innerHTML = "";

        if (typeof messages !== 'undefined' && Array.isArray(messages)) {
            for (let i = 0; i < currentDay && i < messages.length; i++) {
                const item = document.createElement("div");
                item.style.padding = "10px 0";
                item.style.borderBottom = "1px solid #fff0f3";
                item.style.fontSize = "14px";
                item.innerHTML = `<strong style="color: #ff2a55;">Day ${i + 1}:</strong> ${messages[i]}`;
                pastMessagesList.appendChild(item);
            }
        }
        pastModal.style.display = "flex";
    });
}

if (closeModal && pastModal) {
    closeModal.addEventListener("click", function() {
        pastModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === pastModal) {
            pastModal.style.display = "none";
        }
    });
}
