// signup.js
document.addEventListener('DOMContentLoaded', () => {
    const basketCount = document.getElementById('basket-count');
    const signupForm = document.getElementById('signup-form');

    function updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        basketCount.textContent = basket.length > 0 ? basket.length : '0';
    }

    function handleSignup(event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const email = document.getElementById('signup-email').value;

        fetch('https://database-demo-latest-zbnn.onrender.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        })
        .then(response => {
            if (response.ok) {
                alert('Account created successfully');
                window.location.href = 'login.html';
            } else {
                alert('Sign-up failed!');
            }
        });
    }

    updateBasketCount();
    signupForm.addEventListener('submit', handleSignup);
});
