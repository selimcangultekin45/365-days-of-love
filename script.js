// İlişkinizin Gerçek Başlangıç Tarihi
const relationshipStartDate = new Date("2026-06-02");

// Sayaç Fonksiyonu (İlişkinin başından bugüne geçen zaman)
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

// Günün Mesajını Açma Butonu İşlevi
const button = document.getElementById("messageButton");
const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("dailyMessage");

if (button) {
    button.addEventListener("click", function() {
        const today = new Date();
        const diffTime = today - relationshipStartDate;
        let dayNumber = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (dayNumber < 1) dayNumber = 1;
        if (dayNumber > 365) dayNumber = 365;

        if (typeof messages !== 'undefined' && Array.isArray(messages) && messages[dayNumber - 1]) {
            messageText.innerText = messages[dayNumber - 1];
        } else {
            messageText.innerText = "Mesaj dosyası okunamadı.";
        }

        if (messageBox) {
            messageBox.style.display = "block";
        }
    });
}

// Geçmiş Mesajlar (View Past Messages) Butonu İşlevi
const viewPastButton = document.getElementById("viewPastButton");
const pastModal = document.getElementById("pastModal");
const closeModal = document.getElementById("closeModal");
const pastMessagesList = document.getElementById("pastMessagesList");

if (viewPastButton && pastModal) {
    viewPastButton.addEventListener("click", function() {
        const today = new Date();
        const diffTime = today - relationshipStartDate;
        let currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        pastMessagesList.innerHTML = ""; // Listeyi temizle

        if (typeof messages !== 'undefined' && Array.isArray(messages)) {
            for (let i = 0; i < currentDay && i < messages.length; i++) {
                const item = document.createElement("div");
                item.style.padding = "10px";
                item.style.borderBottom = "1px solid #ffe3e8";
                item.style.textAlign = "left";
                item.innerHTML = `<strong style="color: #ff4757;">Day ${i + 1}:</strong> ${messages[i]}`;
                pastMessagesList.appendChild(item);
            }
        } else {
            pastMessagesList.innerHTML = "<p>Mesajlar yüklenemedi.</p>";
        }

        pastModal.style.display = "block";
    });
}

// Pencereyi Kapatma İşlemleri (X Butonu ve Dışarı Tıklama)
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
