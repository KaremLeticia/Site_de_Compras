document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.parentElement.querySelector('h3').innerText;
            alert(`${productName} foi adicionado ao carrinho!`);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        console.log('Form Data:', data);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContent = document.getElementById('cartContent');


    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
    }


    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = loadCart();
        cartCount.textContent = cart.length;
    }

    function addToCart(item) {
        const cart = loadCart();
        cart.push(item);
        saveCart(cart);
        updateCartCount();
    }

    function removeFromCart(index) {
        const cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
        updateCartCount();
        displayCartItems();
    }

    function displayCartItems() {
        const cart = loadCart();
        cartContent.innerHTML = '';

        if (cart.length === 0) {
            cartContent.innerHTML = '<p>Seu carrinho está vazio.</p>';
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>R$ ${item.price}</p>
                </div>
                <button class="remove-item" data-index="${index}">Remover</button>
            `;

            cartContent.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const item = {
                image: product.querySelector('img').src,
                name: product.querySelector('h3').textContent,
                price: product.querySelector('p').textContent.replace('R$ ', '')
            };

            addToCart(item);
        });
    });

    if (cartContent) {
        displayCartItems();
    }

    updateCartCount();
});



