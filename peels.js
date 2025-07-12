fetch("peels.json")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("cards-container");
        container.innerHTML = data.map(item => {
            // Construct WhatsApp link dynamically if buttonLink is not provided
            const phoneNumber = "+37378329685"; // Replace with the clinic's WhatsApp number
            const defaultMessage = encodeURIComponent(`Хочу узнать подробнее ${item.title}`);
            const whatsappLink = item.buttonLink || `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
            
            return `
                <div class="card">
                    <div class="card-group">
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.alt || ''}">
                        </div>
                        <div class="card-items">
                            <h2>${item.title}</h2>
                            <p>${item.description}</p>
                            <a href="${whatsappLink}" class="whatsapp-btn" target="_blank">
                                <img src="${item.buttonIcon || 'https://cdn-icons-png.flaticon.com/512/124/124034.png'}" alt="WhatsApp">
                                ${item.buttonText || 'Записаться'}
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    })
    .catch(error => {
        console.error("Ошибка загрузки:", error);
        document.getElementById("cards-container").innerHTML = "<p>Ошибка загрузки данных</p>";
    });


