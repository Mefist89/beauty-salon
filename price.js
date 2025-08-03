document.addEventListener("DOMContentLoaded", async () => {
    const accordionContainer = document.getElementById("accordion-container");

    const fetchPrices = async () => {
        try {
            const response = await fetch("price.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка загрузки прайс-листа:", error);
            accordionContainer.innerHTML = "<p>Не удалось загрузить прайс-лист. Пожалуйста, попробуйте позже.</p>";
            return null;
        }
    };

    const createAccordionItem = (item) => {
        const servicesList = item.services.map(service => 
            `<li><span>${service.name}</span><span>${service.price}</span></li>`
        ).join("");

        return `
            <div class="accordion-item">
                <button class="accordion-header">${item.category}</button>
                <div class="accordion-content">
                    <div class="accordion-body"> 
                        <ul>
                            ${servicesList}
                        </ul>
                    </div>  
                </div>
            </div>
        `;
    };

    const renderAccordion = (priceData) => {
        if (!priceData) return;
        
        accordionContainer.innerHTML = priceData.map(createAccordionItem).join("");

        // Add event listeners to the newly created headers
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                // Close all other items
                document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                    if (activeItem !== header.parentElement) {
                        activeItem.classList.remove('active');
                    }
                });
                // Toggle the clicked item
                header.parentElement.classList.toggle('active');
            });
        });
    };

    const priceData = await fetchPrices();
    renderAccordion(priceData);
});