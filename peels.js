fetch("peels.json")
    .then(res => res.json())
    .then(data => {
    const container = document.getElementById("cards-container");
    container.innerHTML = data.map(item => `
        <div class="card">
            <div class="card-group">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.alt || ''}">
                </div>
                <div class="card-items">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <a href="${item.buttonLink || '#'}" class="whatsapp-btn">
                    <img src="${item.buttonIcon || 'https://cdn-icons-png.flaticon.com/512/124/124034.png'}" alt="WhatsApp">
                    ${item.buttonText || 'Записаться'}
                    </a>
                </div>
            </div>
        </div>
    `).join("");
    })
    .catch(error => {
        console.error("Ошибка загрузки:", error);
        document.getElementById("cards-container").innerHTML = "<p>Ошибка загрузки данных</p>";
    });
