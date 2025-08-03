const WHATSAPP_PHONE_NUMBER = "+79143814224";
const WHATSAPP_ICON_URL = "https://cdn-icons-png.flaticon.com/512/124/124034.png";

const fetchPreparaty = async () => {
    try {
        const response = await fetch("preparaty.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        return null;
    }
};

const renderPreparaty = (preparaty) => {
    const container = document.getElementById("cards-container");
    if (!preparaty) {
        container.innerHTML = "<p>Ошибка загрузки данных. Пожалуйста, попробуйте позже.</p>";
        return;
    }

    container.innerHTML = preparaty.map(item => {
        const message = encodeURIComponent(`Хочу узнать подробнее про: ${item.title}`);
        const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;
        
        return `
            <div class="card">
                <div class="card-group">
                    <div class="item-image">
                            <img src="${item.image}" alt="${item.alt || ''}" loading="lazy">
                        </div>
                    <div class="card-items">
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <a href="${whatsappLink}" class="whatsapp-btn" target="_blank">
                            <img src="${WHATSAPP_ICON_URL}" alt="WhatsApp">
                            Узнать больше
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join("");
};

document.addEventListener("DOMContentLoaded", async () => {
    const preparatyData = await fetchPreparaty();
    renderPreparaty(preparatyData);
});