document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. MOBILE MENU TOGGLE & DROPDOWN LOGIC
    // ==========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const brandsToggle = document.querySelector('.dropdown > a');
    const dropdownLi = document.querySelector('.dropdown');

    if (mobileMenuToggle && nav) {
        // Toggle the main menu
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate closing
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Handle "Brands" click specifically
        if (brandsToggle && dropdownLi) {
            brandsToggle.addEventListener('click', (e) => {
                e.preventDefault(); // Stop page from jumping to top
                e.stopPropagation(); // Stop menu from closing
                // Toggle the dropdown visibility
                dropdownLi.classList.toggle('mobile-open');
            });
        }

        // Close menu ONLY when a final page link is clicked (not the Brands toggle)
        const finalLinks = nav.querySelectorAll('a:not(.dropdown > a)');
        finalLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                if(dropdownLi) dropdownLi.classList.remove('mobile-open');
            });
        });
        
        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                if(dropdownLi) dropdownLi.classList.remove('mobile-open');
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
            
            const imageContainer = document.getElementById('p-image-text');
            imageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">`;

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
