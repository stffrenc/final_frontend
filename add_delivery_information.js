document.addEventListener('DOMContentLoaded', () => {
    const basketCount = document.getElementById('basket-count');
    const deliveryForm = document.getElementById('delivery-form');
    const signUpButton = document.getElementById('sign-up');
    const logInButton = document.getElementById('log-in');

    function updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        basketCount.textContent = basket.length > 0 ? basket.length : '0';
    }

    function saveDeliveryInfo() {
        const recipientName = document.getElementById('recipient-name').value;
        const shippingAddress = document.getElementById('shipping-address').value;
        const shippingCity = document.getElementById('shipping-city').value;
        const shippingZip = document.getElementById('shipping-zip').value;

        let basket = JSON.parse(localStorage.getItem('basket')) || [];
        if (basket.length > 0) {
            basket[0].recipientName = recipientName;
            basket[0].shippingAddress = shippingAddress;
            basket[0].shippingCity = shippingCity;
            basket[0].shippingZip = shippingZip;

            localStorage.setItem('basket', JSON.stringify(basket));
        }
    }

    function handleSignUp() {
        saveDeliveryInfo();
        window.location.href = 'signup.html';
    }

    function handleLogIn() {
        saveDeliveryInfo();
        window.location.href = 'login.html';
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        saveDeliveryInfo();
        window.location.href = 'place_order.html';
    }

    updateBasketCount();
    signUpButton.addEventListener('click', handleSignUp);
    logInButton.addEventListener('click', handleLogIn);
    deliveryForm.addEventListener('submit', handleFormSubmit);
});
