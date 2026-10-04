document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 2. FAQ ACCORDION LOGIC
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // ==========================================
    // 3. PRODUCT PAGE LOGIC
    // ==========================================
    if (window.location.pathname.includes("product.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('id');

        if (!productId) {
            productId = "norton-360-deluxe";
            window.history.replaceState({}, document.title, "?id=" + productId);
        }

        const product = productsData.find(p => p.id === productId);

        if (product) {
            document.title = product.name + " | Secure Digital";
            document.getElementById('p-title').innerText = product.name;
            document.getElementById('p-price').innerText = product.price;
            document.getElementById('p-price-sticky').innerText = product.price;
            document.getElementById('p-desc').innerText = product.shortDesc;
            document.getElementById('p-image-text').innerHTML = `[ ${product.name} Image ]<br>(Replace with actual image)`;

            const featuresList = document.getElementById('p-features');
            featuresList.innerHTML = ''; 
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="check-icon">✓</span> ${feature}`;
                featuresList.appendChild(li);
            });

            if (product.badge) {
                const badge = document.createElement('div');
                badge.className = `product-badge ${product.badgeClass}`;
                badge.innerText = product.badge;
                
                const imageContainer = document.getElementById('p-image-text');
                imageContainer.style.position = 'relative';
                badge.style.position = 'absolute';
                badge.style.top = '20px';
                badge.style.right = '20px';
                imageContainer.appendChild(badge);
            }
        } else {
            window.location.href = "shop.html";
        }
    }

    // ==========================================
    // 4. CONTACT PAGE SMART PRE-FILL
    // ==========================================
    if (window.location.pathname.includes("contact.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            const product = productsData.find(p => p.id === productId);
            if (product) {
                const selectBox = document.getElementById('product');
                if (selectBox) selectBox.value = productId;
                
                const messageBox = document.getElementById('message');
                if (messageBox && messageBox.value === "") {
                    messageBox.value = `Hi, I am interested in purchasing the ${product.name} (${product.price}). Please provide more details.`;
                }
            }
        }
    }

});
