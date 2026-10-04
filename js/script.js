document.addEventListener("DOMContentLoaded", function() {
    // 1. Get the 'id' from the URL (e.g., ?id=norton-360-deluxe)
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    // 2. Fallback: If no ID is provided, default to the most popular product
    if (!productId) {
        productId = "norton-360-deluxe";
        // Optional: Update URL without reloading so the user sees the correct link
        window.history.replaceState({}, document.title, "?id=" + productId);
    }

    // 3. Find the product in our data array
    const product = productsData.find(p => p.id === productId);

    // 4. If product exists, populate the page
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
        featuresList.innerHTML = ''; // Clear existing
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
            
            // Insert badge into the image placeholder area for visual balance
            const imageContainer = document.getElementById('p-image-text');
            imageContainer.style.position = 'relative';
            badge.style.position = 'absolute';
            badge.style.top = '20px';
            badge.style.right = '20px';
            imageContainer.appendChild(badge);
        }

    } else {
        // 5. Error handling: If ID is invalid, redirect to shop
        console.error("Product not found!");
        window.location.href = "shop.html";
    }
});
