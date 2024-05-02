document.addEventListener('DOMContentLoaded', () => {
    const basketCount = document.getElementById('basket-count');
    const loginForm = document.getElementById('login-form');

    function updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        basketCount.textContent = basket.length > 0 ? basket.length : '0';
    }

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Send a POST request to the backend to log in
        fetch('https://database-demo-latest-zbnn.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed!');
            }
            return response.text(); // Assuming token is returned as plain text
        })
        .then(token => {
            if (token && token.length > 10) { // Simple validation check
                alert('Login successful!');
                // Store the token locally for authentication
                localStorage.setItem('authToken', token);

                // Determine the page to redirect based on the previous page
                const previousPage = document.referrer.includes('index.html')
                    ? 'index.html'
                    : 'add_delivery_information.html';
                window.location.href = previousPage;
            } else {
                throw new Error('Invalid token received!');
            }
        })
        .catch(error => {
            alert(error.message);
        });
    }

    updateBasketCount();
    loginForm.addEventListener('submit', handleLogin);
});
