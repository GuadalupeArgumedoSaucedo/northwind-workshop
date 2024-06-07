// new URLSearchParams object (from the query string) of current URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');// get 'id' parameter from URL

// Check if 'id' parameter is not present in URL
if (!productId) {
    // Display an error message (no product ID specified)
    document.getElementById('error').textContent = "No product ID specified. Redirecting to home page...";
    // Redirect to the home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000); // Redirect after 2 seconds
} else {
    fetch(`http://localhost:8081/api/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Product not found: ${response.statusText}`);
            }
            return response.json();
        })
        .then(product => {
            const productDetails = document.getElementById('productDetails');

            // Define the mapping of category IDs to image filenames
            const categoryImages = {
                1: 'beverages.jpg',
                2: 'condiments.jpg',
                3: 'confections.jpg',
                4: 'dairy.jpg',
                5: 'grains.jpg',
                6: 'meat.jpg',
                7: 'produce.jpg',
                8: 'seafood.jpg'
            };

            // Determine the image filename based on the category ID
            const imageFilename = categoryImages[product.categoryId] || 'default.jpg';

            // Populate with the product information
            let intPrice = parseInt(product.unitPrice)
            productDetails.innerHTML = `
            <div>
                <p>Name: ${product.productName || 'N/A'}</p>
                <p>ID: ${product.productId || 'N/A'}</p>
                <p>Price: $${intPrice.toFixed(2) || 'N/A'}</p>
                <p>Products available: ${product.unitsInStock || 'N/A'}</p>
                <p>Supplier: ${product.supplier || 'N/A'}</p>
                <p>Discontinued? ${product.discontinued || 'N/A'}</p>
            </div>
            <div>
                <img src="/images/${imageFilename}" alt="Category Image">
            </div>
            `;
        })
        .catch(error => {
            // Display error message and redirect to the home page
            document.getElementById('error').textContent = `Error: ${error.message}. Redirecting to home page...`;
            // Redirect to the home page after 2-second delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000); // Redirect after 2 seconds
        });
}
