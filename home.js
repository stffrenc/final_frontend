document.addEventListener('DOMContentLoaded', () => {
    const basketCount = document.getElementById('basket-count');
    const flowersList = document.getElementById('flowers-list');
    const flowerTypeFilter = document.getElementById('flower-type');
    const occasionFilter = document.getElementById('occasion');
    const colorFilter = document.getElementById('color');
    const sortFilter = document.getElementById('sort');

    let flowersData = [];

    function updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        basketCount.textContent = basket.length > 0 ? basket.length : '0';
    }

    function fetchAndDisplayFlowers() {
        fetch('https://database-demo-latest-zbnn.onrender.com/flowers')
            .then(response => response.json())
            .then(data => {
                flowersData = data;
                applyFilters();
            })
            .catch(error => console.error('Error fetching flowers:', error));
    }

    function applyFilters() {
        const type = flowerTypeFilter.value;
        const occasion = occasionFilter.value;
        const color = colorFilter.value;
        const sortOption = sortFilter.value;

        let filteredFlowers = flowersData.filter(flower => 
            (type === "All" || flower.flowerType === type) &&
            (occasion === "All" || flower.occasion === occasion) &&
            (color === "All" || flower.color === color)
        );

        if (sortOption === "Price: Low to High") {
            filteredFlowers.sort((a, b) => a.cost - b.cost);
        } else if (sortOption === "Price: High to Low") {
            filteredFlowers.sort((a, b) => b.cost - a.cost);
        }

        flowersList.innerHTML = '';
        filteredFlowers.forEach(flower => {
            const flowerDiv = document.createElement('div');
            flowerDiv.className = 'flower';
            flowerDiv.innerHTML = `
                <img src="https://database-demo-latest-zbnn.onrender.com/flowers/${flower.id}/image" alt="${flower.name}">
                <h2>${flower.name}</h2>
                <p>$${flower.cost.toFixed(2)}</p>
                <button>Add to Basket</button>
            `;
            flowerDiv.querySelector('button').addEventListener('click', () => addToBasket(flower));
            flowersList.appendChild(flowerDiv);
        });
    }

    function addToBasket(flower) {
        const basketItem = {
            id: flower.id,
            name: flower.name,
            price: flower.cost
        };
        localStorage.setItem('basket', JSON.stringify([basketItem]));
        updateBasketCount();
    
        // Redirect to the add to basket page
        window.location.href = 'add-to-basket.html';
    }
    

    flowerTypeFilter.addEventListener('change', applyFilters);
    occasionFilter.addEventListener('change', applyFilters);
    colorFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);

    updateBasketCount();
    fetchAndDisplayFlowers();
});
