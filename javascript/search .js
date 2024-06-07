// When DOM content is loaded, execute grabUrlParams function
document.addEventListener("DOMContentLoaded", () => {
    grabUrlParams();
});

// Function displays products based on filter parameters
function displayProducts(products, filterParams) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = ''; // Clears products

    // Filter products based on the filter parameters
    const filteredProducts = products.filter(product => {
        let matches = true;
        // check if product's name matches the filter
        if (filterParams.name) {
            matches = matches && product.name.toLowerCase() === filterParams.name.toLowerCase();
        }
        // check if the product's categoryId matches filter
        if (filterParams.categoryId) {
            matches = matches && product.categoryId === parseInt(filterParams.categoryId, 10);
        }
        return matches;
    });

    // Sort the filtered products by product name
    filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));

    console.log("Filtered Products:", filteredProducts);

    // If no products match filter criteria, display message
    if (filteredProducts.length === 0) {
        productsDiv.innerHTML = "<p>No products match the filter criteria.</p>";
    } else {
        // product details for each filtered product
        filteredProducts.forEach(product => {
            const div = document.createElement('div');
            let intPrice = parseInt(product.unitPrice)
            div.innerHTML = `
                <p>Name: ${product.productName}</p>
                <p>Product ID: ${product.productId}</p>
                <p>Price: $${ intPrice.toFixed(2)}</p>
            `;

            // anchor tag for product details page
            let anchor = document.createElement('a');
            anchor.href = `details.html?id=${product.productId}`;
            anchor.text = "See details";
            anchor.style.marginTop = "10px";
            div.appendChild(anchor);

            // Appends div to productsDiv
            productsDiv.appendChild(div);
        });
    }
}

// grab URL parameters and fetch products
function grabUrlParams() {
    const params = new URLSearchParams(window.location.search);// Parse URL parameters

    // Check if URL has filter parameters
    if (params.has("name") || params.has("categoryId")) {
        fetch("http://localhost:8081/api/products")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Decode URL parameters before filtering data
                const name = params.has("name") 
                    ? decodeURIComponent(params.get("name")) 
                    : null;
                const categoryId = params.has("categoryId") 
                    ? decodeURIComponent(params.get("categoryId")) 
                    : null;

                const filterParams = { name, categoryId };
                // Display products based on filter parameters
                displayProducts(data, filterParams);

                // Display the filter criteria
                const resultDiv = document.getElementById("result");
                resultDiv.innerHTML = `
                    <p><strong>Name:</strong> ${name ? name : "N/A"}</p>
                    <p><strong>Category ID:</strong> ${categoryId ? categoryId : "N/A"}</p>`;
            })
            .catch(error => {
                // Log any errors
                console.error("There has been a problem with your fetch operation:", error);
                document.getElementById('result').innerHTML = "Failed to load data";
            });
    }
}

// Event listener (changing the search type)
document.getElementById('searchType').addEventListener('change', function() {
    const searchType = this.value;// Get selected search type
    const categoryDropdown = document.getElementById('categoryDropdown');
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = ''; // Clear 

    if (searchType === 'category') {
        // Show the category dropdown, fetch categories from API
        categoryDropdown.style.display = 'block';
        fetch('http://localhost:8081/api/categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Populate dropdown with fetched categories
                const categories = document.getElementById('categories');
                categories.innerHTML = '<option>Select a category...</option>';
                data.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.categoryId;
                    option.textContent = category.name;
                    categories.appendChild(option);
                });
            })
            .catch(error => {
                // Log any errors
                console.error("There has been a problem with your fetch operation:", error);
                document.getElementById('products').innerHTML = "Failed to load categories";
            });
    } else if (searchType === 'all') {
        // Hide category dropdown fetch all products from API
        categoryDropdown.style.display = 'none';
        fetch('http://localhost:8081/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => displayProducts(data, {}))
            .catch(error => {
                // Log any errors
                console.error("There has been a problem with your fetch operation:", error);
                productsDiv.innerHTML = "Failed to load products";
            });
    } else {
        // Hide dropdown if search type not all/category
        categoryDropdown.style.display = 'none';
    }
});

// Event listener (changing the category selection)
document.getElementById('categories').addEventListener('change', function() {
    const categoryId = this.value;// Get selected category ID
    if (categoryId) {
        fetch(`http://localhost:8081/api/products?categoryId=${categoryId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => displayProducts(data, { categoryId }))
            .catch(error => {
                // Log any errors
                console.error("There has been a problem with your fetch operation:", error);
                document.getElementById('products').innerHTML = "Failed to load products";
            });
    }
});
