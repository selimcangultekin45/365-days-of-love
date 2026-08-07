const relationshipStartDate = new Date("2026-06-02");

// 1. Birliktelik Sayacı
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

// 2. Arka Plan Kalp Yağmuru
function createFloatingHearts() {
    const hearts = ['❤️', '💖', '🌸', '✨'];
    for (let i = 0; i < 12; i++) {
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

// 3. Sonraki Mesaj İçin Canlı Geri Sayım
function updateNextMessageCountdown() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = tomorrow - now;

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const countdownEl = document.getElementById("nextCountdown");
    if (countdownEl) {
        countdownEl.innerText = `⏳ Next message unlocks in: ${hours}h ${minutes}m ${seconds}s`;
    }
}
setInterval(updateNextMessageCountdown, 1000);

// 4. Günün Mesajını Açma (Animasyon ile)
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
            dailyMessage.innerText = "Mesaj okunamadı.";
        }

        if (messageBox) {
            // Animasyonu tetiklemek için önce display block yapıyoruz
            messageBox.style.display = "block";
            updateNextMessageCountdown();
        }
    });
}

// 5. Favoriler Mantığı (Cihaz Hafızasında Tutar)
function getFavorites() {
    return JSON.parse(localStorage.getItem("fav_messages") || "[]");
}

function toggleFavorite(index) {
    let favs = getFavorites();
    if (favs.includes(index)) {
        favs = favs.filter(i => i !== index); // Favorilerden çıkar
    } else {
        favs.push(index); // Favorilere ekle
    }
    localStorage.setItem("fav_messages", JSON.stringify(favs));
}

// 6. Geçmiş Mesajlar & Kalpleme Ekranı
const viewPastButton = document.getElementById("viewPastButton");
const pastModal = document.getElementById("pastModal");
const closeModal = document.getElementById("closeModal");
const pastMessagesList = document.getElementById("pastMessagesList");

if (viewPastButton && pastModal) {
    viewPastButton.addEventListener("click", function() {
        const today = new Date();
        const diffTime = today - relationshipStartDate;
        let currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        renderPastMessages(currentDay);
        pastModal.style.display = "flex";
    });
}

function renderPastMessages(currentDay) {
    pastMessagesList.innerHTML = "";
    const favs = getFavorites();

    if (typeof messages !== 'undefined' && Array.isArray(messages)) {
        for (let i = 0; i < currentDay && i < messages.length; i++) {
            const item = document.createElement("div");
            item.className = "message-item";

            const isFav = favs.includes(i);
            const heartIcon = isFav ? "❤️" : "🤍"; // Seçiliyse kırmızı, değilse beyaz kalp

            item.innerHTML = `
                <div>
                    <strong style="color: #ff2a55;">Day ${i + 1}:</strong> ${messages[i]}
                </div>
                <span class="fav-heart" data-index="${i}">${heartIcon}</span>
            `;
            pastMessagesList.appendChild(item);
        }

        // Tıklanan kalbi kaydet
        document.querySelectorAll(".fav-heart").forEach(heart => {
            heart.addEventListener("click", function() {
                const index = parseInt(this.getAttribute("data-index"));
                toggleFavorite(index);
                renderPastMessages(currentDay); 
            });
        });
    }
}

// Pencere Kapatma İşlemleri
if (closeModal && pastModal) {
    closeModal.addEventListener("click", function() { pastModal.style.display = "none"; });
    window.addEventListener("click", function(e) { if (e.target === pastModal) pastModal.style.display = "none"; });
}
