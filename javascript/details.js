// new URLSearchParams object (from the query string) of current URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');// get 'id' parameter from URL

// Check if 'id' parameter is not present in URL
if (!productId) {
    // Display an error message ((no product ID specified)
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
            // Populate with the product information
            productDetails.innerHTML = `
                <p>ID: ${product.productId || 'N/A'}</p>
                <p>Name: ${product.productName || 'N/A'}</p>
                <p>Price: $${product.unitPrice || 'N/A'}</p>
                <p>Products available: ${product.unitsInStock || 'N/A'}</p>
                <p>Category ID: ${product.categoryId || 'N/A'}</p>
                <p>Supplier: ${product.supplier || 'N/A'}</p>
                <p>Discontinued ? ${product.discontinued || 'N/A'}</p>
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
