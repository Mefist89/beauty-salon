fetch("peels.json")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("cards-container");
        container.innerHTML = data.map(item => {
            const phoneNumber = "+79143814224"; 
            const defaultMessage = encodeURIComponent(`Хочу узнать подробнее ${item.title}`);
            const whatsappLink = item.buttonLink || `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
            
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
                                <img src="${item.buttonIcon || 'https://cdn-icons-png.flaticon.com/512/124/124034.png'}" alt="WhatsApp">
                                ${item.buttonText || 'Узнать больше'}
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
