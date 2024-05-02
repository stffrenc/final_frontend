document.addEventListener('DOMContentLoaded', () => {
    const basketCount = document.getElementById('basket-count');
    const placeOrderButton = document.getElementById('place-order-button');

    function updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        basketCount.textContent = basket.length > 0 ? basket.length : '0';
    }

    function displayOrderSummary() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        if (basket.length > 0) {
            document.getElementById('flower-name').textContent = basket[0].name;
            document.getElementById('delivery-date').textContent = basket[0].deliveryDate;
            document.getElementById('recipient-name').textContent = basket[0].recipientName;
            document.getElementById('shipping-address').textContent = basket[0].shippingAddress;
            document.getElementById('shipping-city').textContent = basket[0].shippingCity;
            document.getElementById('shipping-zip').textContent = basket[0].shippingZip;
            document.getElementById('purchase-option').textContent = basket[0].purchaseOption;

            // logged in
            const subtotal = basket[0].price - 10;
            
            document.getElementById('subtotal').textContent = subtotal.toFixed(2);

            const deliveryFee = 25.00;
            const total = subtotal + deliveryFee;
            document.getElementById('total').textContent = total.toFixed(2);
        }
    }

    function placeOrder() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        if (basket.length > 0) {
            const order = {
                flowerId: basket[0].id,
                recipientName: basket[0].recipientName,
                totalCost: parseFloat(document.getElementById('total').textContent),
                shippingAddress: basket[0].shippingAddress,
                shippingCity: basket[0].shippingCity,
                shippingZipCode: basket[0].shippingZip
            };

            fetch('https://database-demo-latest-zbnn.onrender.com/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(order)
            })
            .then(response => {
                if (response.ok) {
                    alert('Order placed successfully!');
                    localStorage.removeItem('basket'); // Clear the cart
                    window.location.href = 'track_order.html'; // Navigate to the track order page
                } else {
                    alert('Order placement failed!');
                }
            });
        }
    }

    updateBasketCount();
    displayOrderSummary();
    placeOrderButton.addEventListener('click', placeOrder);
});
