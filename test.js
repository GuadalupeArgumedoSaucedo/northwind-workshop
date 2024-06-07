
  div.innerHTML = `
  <div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5>Name: ${product.productName}</h5>
        <p>Product ID: ${product.productId}</p>
        <p>Price: $${ intPrice.toFixed(2)}</p>
      </div>
    </div>
  </div>
            `;