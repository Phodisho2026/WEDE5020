// Shopping Cart
let cart = [];
let cartTotal = 0;

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(name + ' added to cart');
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalAmount = document.getElementById('total-amount');
    
    const totalItems = cart.reduce(function(sum, item) {
        return sum + item.quantity;
    }, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    if (cart.length === 0) {
        if (cartItems) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        }
        if (totalAmount) {
            totalAmount.textContent = '0';
        }
        return;
    }
    
    let html = '';
    let total = 0;
    
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.price * item.quantity;
        total = total + itemTotal;
        
        html = html + `
            <div class="cart-item">
                <span><strong>` + item.name + `</strong> x ` + item.quantity + `</span>
                <span>R` + itemTotal + `</span>
                <button onclick="removeFromCart(` + item.id + `)" class="remove-btn">x</button>
            </div>
        `;
    }
    
    if (cartItems) {
        cartItems.innerHTML = html;
    }
    if (totalAmount) {
        totalAmount.textContent = total;
    }
}

function removeFromCart(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = cart[i].quantity - 1;
            if (cart[i].quantity === 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    
    updateCartDisplay();
    showNotification('Item removed from cart');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    var total = 0;
    var itemNames = '';
    
    for (var i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].quantity);
        itemNames = itemNames + cart[i].name + ' x' + cart[i].quantity + ', ';
    }
    
    alert('Thank you for your order!\n\nItems: ' + itemNames + '\n\nTotal: R' + total + '\n\nWe will email you shortly.');
    
    cart = [];
    updateCartDisplay();
    showNotification('Order placed successfully');
}

// Notification System
function showNotification(message) {
    var existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    var notif = document.createElement('div');
    notif.className = 'notification';
    notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #C62828;
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        max-width: 350px;
    `;
    
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(function() {
        notif.style.opacity = '0';
        notif.style.transition = '0.5s';
        setTimeout(function() {
            notif.remove();
        }, 500);
    }, 4000);
}

// Enquiry Form Validation
document.addEventListener('DOMContentLoaded', function() {
    var enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            var name = document.getElementById('fullName').value.trim();
            var email = document.getElementById('email').value.trim();
            var subject = document.getElementById('subject').value.trim();
            var message = document.getElementById('message').value.trim();
            
            clearErrors();
            
            var isValid = true;
            
            if (name.length < 2) {
                showError('fullName', 'Please enter your full name');
                isValid = false;
            }
            
            if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (subject.length < 3) {
                showError('subject', 'Please enter a subject');
                isValid = false;
            }
            
            if (message.length < 10) {
                showError('message', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }
            
            if (isValid) {
                enquiryForm.style.display = 'none';
                var successMsg = document.getElementById('successMessage');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.innerHTML = `
                        <h3>Enquiry Sent</h3>
                        <p>Thank you, <strong>` + name + `</strong>!</p>
                        <p>We will get back to you within 24 hours.</p>
                    `;
                }
                showNotification('Thank you ' + name);
                
                if (successMsg) {
                    successMsg.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            var name = document.getElementById('contactName').value.trim();
            var email = document.getElementById('contactEmail').value.trim();
            var subject = document.getElementById('contactSubject').value.trim();
            var message = document.getElementById('contactMessage').value.trim();
            
            clearErrors();
            
            var isValid = true;
            
            if (name.length < 2) {
                showError('contactName', 'Please enter your full name');
                isValid = false;
            }
            
            if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
                showError('contactEmail', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (subject.length < 3) {
                showError('contactSubject', 'Please enter a subject');
                isValid = false;
            }
            
            if (message.length < 10) {
                showError('contactMessage', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }
            
            if (isValid) {
                contactForm.style.display = 'none';
                var successMsg = document.getElementById('contactSuccess');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.innerHTML = `
                        <h3>Message Sent</h3>
                        <p>Thank you, <strong>` + name + `</strong>!</p>
                        <p>We will respond within 24 hours.</p>
                    `;
                }
                showNotification('Thank you ' + name);
                
                if (successMsg) {
                    successMsg.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
});

// Error Display Functions
function showError(inputId, message) {
    var input = document.getElementById(inputId);
    if (input) {
        input.style.borderColor = '#C62828';
        input.style.backgroundColor = '#FFEBEE';
        
        var errorMsg = input.parentElement.querySelector('.error-msg');
        if (!errorMsg) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-msg';
            errorMsg.style.cssText = `
                color: #C62828;
                display: block;
                margin-top: 5px;
                font-weight: 500;
            `;
            input.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = 'Error: ' + message;
    }
}

function clearErrors() {
    var inputs = document.querySelectorAll('input, textarea, select');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.borderColor = '';
        inputs[i].style.backgroundColor = '';
        var errorMsg = inputs[i].parentElement.querySelector('.error-msg');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
}

// Clear errors when user starts typing
document.addEventListener('DOMContentLoaded', function() {
    var allInputs = document.querySelectorAll('input, textarea, select');
    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].addEventListener('input', function() {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
            var errorMsg = this.parentElement.querySelector('.error-msg');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    }
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
    var scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = 'Top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: #C62828;
        color: white;
        border: none;
        border-radius: 50px;
        padding: 12px 20px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(198, 40, 40, 0.3);
        z-index: 999;
        opacity: 0;
        transition: all 0.3s;
    `;
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

console.log('Website loaded');
