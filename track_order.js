document.addEventListener('DOMContentLoaded', () => {
    const basketCount = document.getElementById('basket-count');
    const orderList = document.getElementById('order-list');

    function updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        basketCount.textContent = basket.length > 0 ? basket.length : '0';
    }

    function checkLoginAndRedirect() {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            // Redirect to login page if the user is not logged in
            alert('Please log in to view your orders.');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    function fetchOrders() {
        fetch('https://database-demo-latest-zbnn.onrender.com/orders', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch orders. Please try again later.');
            }
            return response.json();
        })
        .then(data => displayOrders(data))
        .catch(error => {
            console.error('Error fetching orders:', error);
            orderList.innerHTML = `<p>${error.message}</p>`;
        });
    }

    function displayOrders(orders) {
        if (orders.length === 0) {
            orderList.innerHTML = '<p>No orders found.</p>';
        } else {
            orderList.innerHTML = '';
            orders.forEach(order => {
                const status = order.status ? order.status : 'submitted';
                const orderDiv = document.createElement('div');
                orderDiv.className = 'order';
                orderDiv.innerHTML = `
                    <p><strong>Flower:</strong> ${order.flowerId}</p>
                    <p><strong>Total Cost:</strong> $${order.totalCost.toFixed(2)}</p>
                    <p><strong>Recipient:</strong> ${order.recipientName}</p>
                    <p><strong>Status:</strong> ${status}</p>
                `;
                orderList.appendChild(orderDiv);
            });
        }
    }

    if (checkLoginAndRedirect()) {
        updateBasketCount();
        fetchOrders();
    }
});
