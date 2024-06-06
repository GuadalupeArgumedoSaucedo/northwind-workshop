document.addEventListener("DOMContentLoaded", () => {
    grabUrlParams();
  });
  
  function displayProducts(products, filterParams) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = ''; // Clear previous content
  
    const filteredProducts = products.filter(product => {
      let matches = true;
      if (filterParams.name) {
        matches = matches && product.name.toLowerCase() === filterParams.name.toLowerCase();
      }
      if (filterParams.categoryId) {
        matches = matches && product.categoryId === parseInt(filterParams.categoryId, 10);
      }
      return matches;
    });
  
    console.log("Filtered Products:", filteredProducts);
  
    if (filteredProducts.length === 0) {
      productsDiv.innerHTML = "<p>No products match the filter criteria.</p>";
    } else {
      filteredProducts.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
          <p>Product ID: ${product.productId}</p>
          <p>Name: ${product.name}</p>
          <p>Price: $${product.price}</p>
        `;
  
        // Creating an anchor tag for details
        let anchor = document.createElement('a');
        anchor.href = `details.html?id=${product.productId}`;
        anchor.text = "See details";
        anchor.style.marginTop = "10px";
        div.appendChild(anchor);
  
        productsDiv.appendChild(div);
      });
    }
  }
  
  function grabUrlParams() {
    const params = new URLSearchParams(window.location.search);
  
    if (params.has("name") || params.has("categoryId")) {
      fetch("http://localhost:8081/api/products")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          // Decode parameters before filtering data
          const name = params.has("name") ? decodeURIComponent(params.get("name")) : null;
          const categoryId = params.has("categoryId") ? decodeURIComponent(params.get("categoryId")) : null;
  
          const filterParams = { name, categoryId };
  
          displayProducts(data, filterParams);
  
          const resultDiv = document.getElementById("result");
          resultDiv.innerHTML = `
            <p><strong>Name:</strong> ${name ? name : "N/A"}</p>
            <p><strong>Category ID:</strong> ${categoryId ? categoryId : "N/A"}</p>`;
        })
        .catch(error => {
          console.error("There has been a problem with your fetch operation:", error);
          document.getElementById('result').innerHTML = "Failed to load data";
        });
    }
  }
  
  document.getElementById('searchType').addEventListener('change', function() {
    const searchType = this.value;
    const categoryDropdown = document.getElementById('categoryDropdown');
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
  
    if (searchType === 'category') {
      categoryDropdown.style.display = 'block';
      fetch('http://localhost:8081/api/categories')
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
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
          console.error("There has been a problem with your fetch operation:", error);
          document.getElementById('products').innerHTML = "Failed to load categories";
        });
    } else if (searchType === 'all') {
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
          console.error("There has been a problem with your fetch operation:", error);
          productsDiv.innerHTML = "Failed to load products";
        });
    } else {
      categoryDropdown.style.display = 'none';
    }
  });
  
  document.getElementById('categories').addEventListener('change', function() {
    const categoryId = this.value;
    if (categoryId) {
      fetch(`http://localhost:8081/api/categories/${categoryId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => displayProducts(data.products, { categoryId }))
        .catch(error => {
          console.error("There has been a problem with your fetch operation:", error);
          document.getElementById('products').innerHTML = "Failed to load products";
        });
    }
  });


  /// details page

<img src="${product.imageURL || 'default_image.png'}" alt="${product.name}" />