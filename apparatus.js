const WHATSAPP_PHONE_NUMBER = "+79143814224";
const WHATSAPP_ICON_URL = "https://cdn-icons-png.flaticon.com/512/124/124034.png";

document.addEventListener('DOMContentLoaded', function() {
    loadApparatusData();
});

async function loadApparatusData() {
    try {
        const response = await fetch("apparatus.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apparatusData = await response.json();
        displayApparatus(apparatusData);
    } catch (error) {
        console.error('Ошибка при загрузке данных об аппаратах:', error);
        document.getElementById('cards-container').innerHTML = '<p>Ошибка при загрузке данных об аппаратах</p>';
    }
}

function displayApparatus(apparatusData) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Очистить контейнер перед добавлением новых данных

    apparatusData.forEach(category => {
        category.apparatus.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardGroup = document.createElement('div');
            cardGroup.className = 'card-group';

            // Create image container
            const imageContainer = document.createElement('div');
            imageContainer.className = 'item-image';

            const image = document.createElement('img');
            image.src = item.image || 'img/logo.jpg'; // Use default image if none provided
            image.alt = item.name;
            imageContainer.appendChild(image);

            cardGroup.appendChild(imageContainer);

            // Create info container
            const infoContainer = document.createElement('div');
            infoContainer.className = 'card-items';

            // Add name
            const name = document.createElement('h3');
            name.textContent = item.name;
            infoContainer.appendChild(name);

            // Add description
            const description = document.createElement('p');
            description.textContent = item.description;
            infoContainer.appendChild(description);

            // Add features list
            if (item.features && item.features.length > 0) {
                const featuresDiv = document.createElement('div');
                featuresDiv.className = 'features';

                item.features.forEach(feature => {
                    const featureElement = document.createElement('p');
                    featureElement.innerHTML = `<i class="fas fa-check-circle" style="color: #e67e22; margin-right: 10px;"></i> ${feature}`;
                    featuresDiv.appendChild(featureElement);
                });

                infoContainer.appendChild(featuresDiv);
            }

            // Add price
            if (item.price) {
                const price = document.createElement('div');
                price.style.fontWeight = 'bold';
                price.style.color = '#e67e22';
                price.style.textAlign = 'center';
                price.style.marginTop = '10px';
                price.style.paddingTop = '10px';
                price.style.borderTop = '1px solid #eee';
                price.textContent = item.price;
                infoContainer.appendChild(price);
            }

            // Add WhatsApp button
            const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(`Хочу узнать подробнее про: ${item.name}`)}`;
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = whatsappLink;
            whatsappBtn.className = 'whatsapp-btn';
            whatsappBtn.target = '_blank';
            whatsappBtn.innerHTML = `
                <img src="${WHATSAPP_ICON_URL}" alt="WhatsApp">
                Узнать больше
            `;
            infoContainer.appendChild(whatsappBtn);

            cardGroup.appendChild(infoContainer);
            card.appendChild(cardGroup);
            container.appendChild(card);
        });
    });
}