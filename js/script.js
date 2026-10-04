document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. PRODUCT PAGE LOGIC (Only runs on product.html)
    // ==========================================
    if (window.location.pathname.includes("product.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('id');

        // Fallback if no ID is provided
        if (!productId) {
            productId = "norton-360-deluxe";
            window.history.replaceState({}, document.title, "?id=" + productId);
        }

        const product = productsData.find(p => p.id === productId);

        if (product) {
            // Update Page Title
            document.title = product.name + " | Secure Digital";

            // Update Text Content
            document.getElementById('p-title').innerText = product.name;
            document.getElementById('p-price').innerText = product.price;
            document.getElementById('p-price-sticky').innerText = product.price;
            document.getElementById('p-desc').innerText = product.shortDesc;
            document.getElementById('p-image-text').innerHTML = `[ ${product.name} Image ]<br>(Replace with actual image)`;

            // Update Features List
            const featuresList = document.getElementById('p-features');
            featuresList.innerHTML = ''; 
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="check-icon">✓</span> ${feature}`;
                featuresList.appendChild(li);
            });

            // Update Badge (if it exists)
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
            // Redirect to shop if invalid ID
            window.location.href = "shop.html";
        }
    }

    // ==========================================
    // 2. CONTACT PAGE SMART PRE-FILL (Only runs on contact.html)
    // ==========================================
    if (window.location.pathname.includes("contact.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            const product = productsData.find(p => p.id === productId);
            if (product) {
                // Pre-select the product in the dropdown
                const selectBox = document.getElementById('product');
                if (selectBox) {
                    selectBox.value = productId;
                }
                
                // Pre-fill the message box to make it easy for the user
                const messageBox = document.getElementById('message');
                if (messageBox && messageBox.value === "") {
                    messageBox.value = `Hi, I am interested in purchasing the ${product.name} (${product.price}). Please provide more details or let me know the next steps.`;
                }
            }
        }
    }

});
