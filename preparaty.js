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
        // Показываем сообщение об ошибке пользователю
        const container = document.getElementById("cards-container");
        if (container) {
            container.innerHTML = "<p>Не удалось загрузить данные. Пожалуйста, обновите страницу или попробуйте позже.</p>";
        }
        return null;
    }
};

const renderPreparaty = (preparaty) => {
    const container = document.getElementById("cards-container");
    if (!preparaty) {
        container.innerHTML = "<p>Ошибка загрузки данных. Пожалуйста, попробуйте позже.</p>";
        return;
    }

    // Функция для экранирования HTML-символов
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    container.innerHTML = preparaty.map(item => {
        // Экранируем данные перед вставкой
        const escapedTitle = escapeHtml(item.title);
        const escapedDescription = escapeHtml(item.description);
        const escapedAlt = escapeHtml(item.alt || '');
        
        // Проверяем и валидируем URL изображения
        let imageUrl = item.image;
        if (typeof item.image !== 'string' || !item.image.startsWith('img/')) {
            imageUrl = 'img/default-image.png'; // использовать изображение по умолчанию для безопасности
        }
        
        const message = encodeURIComponent(`Хочу узнать подробнее про: ${escapedTitle}`);
        const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;
        
        return `
            <div class="card">
                <div class="card-group">
                    <div class="item-image">
                            <img src="${escapeHtml(imageUrl)}" alt="${escapedAlt}" loading="lazy">
                        </div>
                    <div class="card-items">
                        <h2>${escapedTitle}</h2>
                        <p>${escapedDescription}</p>
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