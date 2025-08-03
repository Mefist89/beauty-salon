document.addEventListener("DOMContentLoaded", async () => {
    const servicesContainer = document.getElementById("services-container");

    const fetchServices = async () => {
        try {
            const response = await fetch("services.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка загрузки услуг:", error);
            servicesContainer.innerHTML = "<p>Не удалось загрузить список услуг. Пожалуйста, попробуйте позже.</p>";
            return null;
        }
    };

    const createServiceItem = (service) => {
        return `
            <li class="service-item">
                <span class="service-item-name">${service.name}</span>
                <span class="service-item-duration">${service.duration}</span>
                <span class="service-item-price">${service.price}</span>
            </li>
        `;
    };

    const createServiceCategory = (category) => {
        const servicesList = category.services.map(createServiceItem).join("");
        return `
            <div class="service-category">
                <h2>${category.category}</h2>
                <p class="category-description">${category.description}</p>
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
