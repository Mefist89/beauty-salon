document.addEventListener("DOMContentLoaded", async () => {
    const promotionsContainer = document.getElementById("promotions-container");
    const WHATSAPP_PHONE_NUMBER = "+79143814224";

    const fetchPromotions = async () => {
        try {
            const response = await fetch("promo.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка загрузки акций:", error);
            promotionsContainer.innerHTML = "<p>Не удалось загрузить акции. Пожалуйста, попробуйте позже.</p>";
            return null;
        }
    };

    const createPromotionCard = (promo) => {
        const featuresList = promo.features.map(feature => 
            `<div class="item"><i class="far fa-check-square check-icon"></i><p>${feature}</p></div>`
        ).join("");

        const message = encodeURIComponent(`Хочу записаться на акцию: ${promo.title}`);
        const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;

        return `
            <div class="card">
                <div class="card-group">
                    <div class="card-items">
                        <div class="card-title">
                            <h1>${promo.title}</h1>
                        </div>
                        <div class="item">
                            <i class="far fa-check-square check-icon"></i>
                            <p>${promo.price}</p>
                        </div>
                        ${featuresList}
                        <div class="item">
                            <i class="far fa-check-square check-icon"></i>
                            <p><span>${promo.valid_until}</span></p>
                        </div>
                        <a href="${whatsappLink}" class="whatsapp-btn" target="_blank">
                            <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp">
                            Записаться
                        </a>
                    </div>
                    <div class="item-image">
                        <img src="${promo.image}" alt="${promo.alt}" loading="lazy">
                    </div> 
                </div>
            </div>
        `;
    };

    const renderPromotions = (promotions) => {
        if (!promotions) return;
        promotionsContainer.innerHTML = promotions.map(createPromotionCard).join("");
    };

    const promotionsData = await fetchPromotions();
    renderPromotions(promotionsData);
});