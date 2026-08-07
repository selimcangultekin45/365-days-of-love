        const relationshipStartDate = new Date("2026-06-02");
let isFilteringFavorites = false; // Filtre durumu

// ... (Sayaç ve diğer fonksiyonlar aynı kalıyor) ...
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

function createFloatingHearts() {
    const icons = ['❤️', '💖', '✨', '🌸', '💕', '⭐'];
    for (let i = 0; i < 30; i++) {
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

// Favori işlemleri
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

// Mesaj listeleme ve filtreleme
const viewPastButton = document.getElementById("viewPastButton");
const pastModal = document.getElementById("pastModal");
const closeModal = document.getElementById("closeModal");
const pastMessagesList = document.getElementById("pastMessagesList");

if (viewPastButton && pastModal) {
    viewPastButton.addEventListener("click", function() {
        isFilteringFavorites = false; // Her açıldığında varsayılan "Tümü" olsun
        renderPastMessages();
        pastModal.style.display = "flex";
    });
}

function renderPastMessages() {
    pastMessagesList.innerHTML = "";
    const favs = getFavorites();
    const today = new Date();
    const currentDay = Math.floor((today - relationshipStartDate) / (1000 * 60 * 60 * 24)) + 1;

    // Filtre butonlarını ekle
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";
    filterContainer.innerHTML = `
        <button class="filter-btn ${!isFilteringFavorites ? 'active' : ''}" id="btnAll">All</button>
        <button class="filter-btn ${isFilteringFavorites ? 'active' : ''}" id="btnFav">Favorites</button>
    `;
    pastMessagesList.appendChild(filterContainer);

    // Filtre buton olayları
    document.getElementById("btnAll").addEventListener("click", () => { isFilteringFavorites = false; renderPastMessages(); });
    document.getElementById("btnFav").addEventListener("click", () => { isFilteringFavorites = true; renderPastMessages(); });

    // Mesajları döngüye al
    if (typeof messages !== 'undefined' && Array.isArray(messages)) {
        for (let i = 0; i < currentDay && i < messages.length; i++) {
            const isFav = favs.includes(i);
            
            // Sadece favorileri göster durumu aktifse ve bu mesaj favori değilse atla
            if (isFilteringFavorites && !isFav) continue;

            const item = document.createElement("div");
            item.className = "message-item";
            item.innerHTML = `
                <div><strong style="color: #ff2a55;">Day ${i + 1}:</strong> ${messages[i]}</div>
                <span class="fav-heart" data-index="${i}">${isFav ? "❤️" : "🤍"}</span>
            `;
            pastMessagesList.appendChild(item);
        }
    }

    // Kalp tıklama olayı
    document.querySelectorAll(".fav-heart").forEach(heart => {
        heart.addEventListener("click", function() {
            toggleFavorite(parseInt(this.getAttribute("data-index")));
            renderPastMessages(); // Listeyi güncelle
        });
    });
}

if (closeModal && pastModal) {
    closeModal.addEventListener("click", () => pastModal.style.display = "none");
            }
                                        
