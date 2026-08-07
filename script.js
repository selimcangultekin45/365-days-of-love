     const relationshipStartDate = new Date("2026-06-02");
let isFilteringFavorites = false;

// 1. Sayaç
function updateCounter() {
    const today = new Date();
    const difference = today - relationshipStartDate;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const counterElement = document.getElementById("counter");
    if (counterElement) counterElement.innerHTML = `${days} Days, ${hours} Hours, ${minutes} Minutes`;
}
setInterval(updateCounter, 1000);
updateCounter();

// 2. Arka Plan Kalpleri
function createFloatingHearts() {
    const icons = ['❤️', '💖', '✨', '🌸', '💕', '⭐'];
    for (let i = 0; i < 28; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart-up';
        heart.innerText = icons[Math.floor(Math.random() * icons.length)];
        heart.style.left = Math.random() * 92 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5.5) + 's';
        heart.style.animationDelay = (Math.random() * 6) + 's';
        document.body.appendChild(heart);
    }
}
createFloatingHearts();

// 3. Geri Sayım
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

// 4. Günün Mesajı
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
            messageBox.style.display = "block";
            updateNextMessageCountdown();
        }
    });
}

// 5. Favori Hafızası
function getFavorites() {
    return JSON.parse(localStorage.getItem("fav_messages") || "[]");
}

function toggleFavorite(index) {
    let favs = getFavorites();
    if (favs.includes(index)) {
        favs = favs.filter(i => i !== index);
    } else {
        favs.push(index);
    }
    localStorage.setItem("fav_messages", JSON.stringify(favs));
}

// 6. Geçmiş Mesajlar ve Filtreleme
const viewPastButton = document.getElementById("viewPastButton");
const pastModal = document.getElementById("pastModal");
const closeModal = document.getElementById("closeModal");
const pastMessagesList = document.getElementById("pastMessagesList");
const btnAll = document.getElementById("btnAll");
const btnFav = document.getElementById("btnFav");

if (viewPastButton && pastModal) {
    viewPastButton.addEventListener("click", function() {
        isFilteringFavorites = false;
        updateFilterButtons();
        renderPastMessages();
        pastModal.style.display = "flex";
    });
}

if (btnAll && btnFav) {
    btnAll.addEventListener("click", function() {
        isFilteringFavorites = false;
        updateFilterButtons();
        renderPastMessages();
    });

    btnFav.addEventListener("click", function() {
        isFilteringFavorites = true;
        updateFilterButtons();
        renderPastMessages();
    });
}

function updateFilterButtons() {
    if (isFilteringFavorites) {
        btnFav.classList.add("active");
        btnAll.classList.remove("active");
    } else {
        btnAll.classList.add("active");
        btnFav.classList.remove("active");
    }
}

function renderPastMessages() {
    if (!pastMessagesList) return;
    pastMessagesList.innerHTML = "";

    const favs = getFavorites();
    const today = new Date();
    const currentDay = Math.floor((today - relationshipStartDate) / (1000 * 60 * 60 * 24)) + 1;

    let hasMessages = false;

    if (typeof messages !== 'undefined' && Array.isArray(messages)) {
        for (let i = 0; i < currentDay && i < messages.length; i++) {
            const isFav = favs.includes(i);

            if (isFilteringFavorites && !isFav) continue;

            hasMessages = true;
            const item = document.createElement("div");
            item.className = "message-item";
            item.innerHTML = `
                <div><strong style="color: #ff2a55;">Day ${i + 1}:</strong> ${messages[i]}</div>
                <span class="fav-heart" data-index="${i}">${isFav ? "❤️" : "🤍"}</span>
            `;
            pastMessagesList.appendChild(item);
        }
    }

    if (!hasMessages && isFilteringFavorites) {
        pastMessagesList.innerHTML = `<div style="text-align:center; color:#aaa; padding:20px;">Henüz favori mesaj eklemediniz ❤️</div>`;
    }

    document.querySelectorAll(".fav-heart").forEach(heart => {
        heart.addEventListener("click", function() {
            toggleFavorite(parseInt(this.getAttribute("data-index")));
            renderPastMessages();
        });
    });
}

if (closeModal && pastModal) {
    closeModal.addEventListener("click", () => pastModal.style.display = "none");
    window.addEventListener("click", (e) => { if (e.target === pastModal) pastModal.style.display = "none"; });
}
