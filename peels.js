document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("peels.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const container = document.getElementById("cards-container");
        
        // Функция для экранирования HTML-символов
        const escapeHtml = (text) => {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        };
        
        container.innerHTML = data.map(item => {
            // Экранируем все данные перед вставкой
            const escapedTitle = escapeHtml(item.title);
            const escapedDescription = escapeHtml(item.description);
            const escapedAlt = escapeHtml(item.alt || '');
            const escapedButtonText = escapeHtml(item.buttonText || 'Узнать больше');
            
            // Валидируем и экранируем URL изображений
            let imageUrl = item.image;
            if (typeof item.image !== 'string' || !item.image.startsWith('img/')) {
                imageUrl = 'img/default-image.png';
            }
            imageUrl = escapeHtml(imageUrl);
            
            let buttonIconUrl = item.buttonIcon || 'https://cdn-icons-png.flaticon.com/512/124/124034.png';
            if (typeof buttonIconUrl !== 'string' || !buttonIconUrl.startsWith('http')) {
                buttonIconUrl = 'https://cdn-icons-png.flaticon.com/512/124/124034.png';
            }
            buttonIconUrl = escapeHtml(buttonIconUrl);
            
            const phoneNumber = "+79143814224";
            const defaultMessage = encodeURIComponent(`Хочу узнать подробнее ${escapedTitle}`);
            const whatsappLink = item.buttonLink || `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
            
            return `
                <div class="card">
                    <div class="card-group">
                        <div class="item-image">
                            <img src="${imageUrl}" alt="${escapedAlt}" loading="lazy">
                        </div>
                        <div class="card-items">
                            <h2>${escapedTitle}</h2>
                            <p>${escapedDescription}</p>
                            <a href="${whatsappLink}" class="whatsapp-btn" target="_blank">
                                <img src="${buttonIconUrl}" alt="WhatsApp">
                                ${escapedButtonText}
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        const container = document.getElementById("cards-container");
        if (container) {
            container.innerHTML = "<p>Не удалось загрузить данные. Пожалуйста, обновите страницу или попробуйте позже.</p>";
        }
    }
});
