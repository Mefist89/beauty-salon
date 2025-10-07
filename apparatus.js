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
        document.getElementById('apparatus-container').innerHTML = '<p>Ошибка при загрузке данных об аппаратах</p>';
    }
}

function displayApparatus(apparatusData) {
    const container = document.getElementById('apparatus-container');
    container.innerHTML = ''; // Очистить контейнер перед добавлением новых данных

    apparatusData.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'apparatus-category';

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.category;
        categoryElement.appendChild(categoryTitle);

        const categoryDescription = document.createElement('p');
        categoryDescription.textContent = category.description;
        categoryElement.appendChild(categoryDescription);

        const apparatusGrid = document.createElement('div');
        apparatusGrid.className = 'apparatus-grid';

        category.apparatus.forEach(item => {
            const apparatusItem = document.createElement('div');
            apparatusItem.className = 'apparatus-item';

            // Create image element
            const image = document.createElement('img');
            image.src = item.image || 'img/logo.jpg'; // Use default image if none provided
            image.alt = item.name;
            image.className = 'apparatus-image';
            apparatusItem.appendChild(image);

            // Create info container
            const infoContainer = document.createElement('div');
            infoContainer.className = 'apparatus-info';

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
                const featuresList = document.createElement('ul');
                featuresList.className = 'apparatus-features';

                item.features.forEach(feature => {
                    const featureItem = document.createElement('li');
                    featureItem.innerHTML = `<i class="fas fa-check-circle"></i> ${feature}`;
                    featuresList.appendChild(featureItem);
                });

                infoContainer.appendChild(featuresList);
            }

            // Add price
            if (item.price) {
                const price = document.createElement('div');
                price.className = 'apparatus-price';
                price.textContent = item.price;
                infoContainer.appendChild(price);
            }

            apparatusItem.appendChild(infoContainer);
            apparatusGrid.appendChild(apparatusItem);
        });

        categoryElement.appendChild(apparatusGrid);
        container.appendChild(categoryElement);
    });
}