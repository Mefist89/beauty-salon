// Добавляем кэширование данных
let servicesCache = null;

document.addEventListener("DOMContentLoaded", async () => {
    const servicesContainer = document.getElementById("services-container");

    const fetchServices = async () => {
        // Проверяем, есть ли уже закэшированные данные
        if (servicesCache) {
            return servicesCache;
        }
        
        try {
            const response = await fetch("services.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Кэшируем данные
            servicesCache = data;
            
            return data;
        } catch (error) {
            console.error("Ошибка загрузки услуг:", error);
            servicesContainer.innerHTML = "<p>Не удалось загрузить список услуг. Пожалуйста, попробуйте позже.</p>";
            return null;
        }
    };

    const createServiceItem = (service) => {
        // Экранируем HTML-символы для предотвращения XSS
        const escapeHtml = (text) => {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        };
        
        return `
            <li class="service-item">
                <span class="service-item-name">${escapeHtml(service.name)}</span>
                <span class="service-item-duration">${escapeHtml(service.duration)}</span>
                <span class="service-item-price">${escapeHtml(service.price)}</span>
            </li>
        `;
    };

    const createServiceCategory = (category) => {
        // Экранируем HTML-символы для предотвращения XSS
        const escapeHtml = (text) => {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        };
        
        const servicesList = category.services.map(createServiceItem).join("");
        return `
            <div class="service-category">
                <h2>${escapeHtml(category.category)}</h2>
                <p class="category-description">${escapeHtml(category.description)}</p>
                <ul class="service-list">
                    ${servicesList}
                </ul>
            </div>
        `;
    };

    const renderServices = (servicesData) => {
        if (!servicesData) return;
        servicesContainer.innerHTML = servicesData.map(createServiceCategory).join("");
    };

    const servicesData = await fetchServices();
    renderServices(servicesData);
});
