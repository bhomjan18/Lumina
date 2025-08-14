// Sample product data with Unsplash images
const products = [
    {
        id: 1,
        name: "Elegant Silver Ring",
        category: "Rings",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Pearl Necklace",
        category: "Necklaces",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Gold Charm Bracelet",
        category: "Bracelets",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Diamond Stud Earrings",
        category: "Earrings",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Vintage Gold Ring",
        category: "Rings",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Pendant Necklace",
        category: "Necklaces",
        price: 54.99,
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Silver Bangle Bracelet",
        category: "Bracelets",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Hoop Earrings",
        category: "Earrings",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
];

// Cart functionality
let cart = [];
let currentCategory = 'all';

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const cartSummary = document.getElementById('cartSummary');
const categoryCards = document.querySelectorAll('.category-card');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

// Initialize the page
function init() {
    renderProducts();
    setupEventListeners();
}

// Render products to the grid
function renderProducts(category = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category.toLowerCase() === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        Add to Cart
                    </button>
                    <button class="wishlist-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);

        // Add click event to add to cart button
        productCard.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(product);
        });
    });
}

 const a   = console.log(window.innerHeight, window.innerWidth)

// Setup event listeners
function setupEventListeners() {
    // Cart toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', () => {
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    });

    // Category filtering
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            currentCategory = category;
            renderProducts(category);
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    renderCart();
}

// Add product to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    renderCart();
    
    // Show notification
    alert(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

// Update cart quantity
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Render cart items
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25,30 L75,30 L65,70 L35,70 Z" stroke="#ddd" stroke-width="2" fill="none" />
                        <path d="M35,30 L40,10 L60,10 L65,30" stroke="#ddd" stroke-width="2" fill="none" />
                        <path d="M35,40 L65,40 M35,50 L65,50 M35,60 L65,60" stroke="#ddd" stroke-width="2" />
                    </svg>
                </div>
                <p>Your cart is empty</p>
            </div>
        `;
        cartSummary.style.display = 'none';
        return;
    }
    
    cartSummary.style.display = 'block';
    cartItems.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        cartItems.appendChild(cartItem);
        
        // Add event listeners for quantity buttons
        cartItem.querySelector('.decrease-btn').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
                renderCart();
                updateCartCount();
            }
        });
        
        cartItem.querySelector('.increase-btn').addEventListener('click', () => {
            if (item.quantity < 10) {
                item.quantity++;
                renderCart();
                updateCartCount();
            }
        });
        
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            removeFromCart(index);
        });
    });
    
    // Update cart summary
    const shipping = cart.length > 0 ? 5 : 0;
    const total = subtotal + shipping;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', init);

// User data (in a real app, this would come from a database)
const users = [
    { id: 1, email: "user@example.com", password: "password123", name: "John Doe", role: "user" },
    { id: 2, email: "admin@example.com", password: "admin123", name: "Admin User", role: "admin" }
];

// Current user
let currentUser = null;

// Search functionality
function setupSearch() {
    const searchIcon = document.querySelector('.header-icon:first-child');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const searchTerm = prompt("Enter search term:");
            if (searchTerm) {
                searchProducts(searchTerm);
            }
        });
    }
}

function searchProducts(term) {
    term = term.toLowerCase();
    const results = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term)
    );
    
    if (results.length > 0) {
        renderProducts('all'); // Show all products first
        // Highlight matching products
        document.querySelectorAll('.product-card').forEach(card => {
            const name = card.querySelector('.product-name').textContent.toLowerCase();
            const category = card.querySelector('.product-category').textContent.toLowerCase();
            if (!name.includes(term) && !category.includes(term)) {
                card.style.display = 'none';
            }
        });
        showNotification(`Found ${results.length} matching products`);
    } else {
        showNotification("No products found matching your search", "warning");
    }
}

// Login functionality
function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                showNotification(`Welcome back, ${user.name}!`);
                setTimeout(() => {
                    window.location.href = user.role === 'admin' ? 'admin.html' : 'index.html';
                }, 1500);
            } else {
                showNotification("Invalid email or password", "error");
            }
        });
    }
}

// Notification system
function showNotification(message, type = "success") {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Update the init function to include new setups
function init() {
    renderProducts();
    setupEventListeners();
    setupSearch();
    setupLogin();
    
    // Check if user is logged in
//     const isLoginPage = window.location.pathname.includes('login.html');
//     if (!isLoginPage && !currentUser) {
//         // Redirect to login or show login prompt
//         const shouldLogin = confirm("You need to login to continue. Go to login page?");
//         if (shouldLogin) {
//             window.location.href = 'login.html';
//         }
//     }
}

// Add this to your existing setupEventListeners function
function setupEventListeners() {
    // ... existing code ...
    
    // Add login/logout button functionality
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
    
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentUser = null;
            showNotification("You have been logged out");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // Admin login link
    const adminLoginLink = document.getElementById('adminLoginLink');
    if (adminLoginLink) {
        adminLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('email').value = 'admin@example.com';
            document.getElementById('password').focus();
        });
    }
}