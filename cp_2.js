
const api_url = 'https://www.course-api.com/javascript-store-products';
const productContainer = document.getElementById('product-container');

// Reusable error handling function 
function handleError(error) {
    console.error(`An error occured: ${error.message}`);
    productContainer.textContent = '<p class="error">Failed to load products. PLease try again later.</p>';
}

// Function to display products on the page 
function displayProducts(products) {
    productContainer.textContent = '';
    const firstFiveProducts = products.slice(0,5);
    firstFiveProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.textContent = `
        <img src= "${product.fields.image[0].url}" alt="${product.fields.name}">
        <h3>${product.fields.name}</h3>
        <p>$${product.fields.price / 100}</p>      
    `;
    productContainer.appendChild(productCard);
    });
}

// Fetch products using .then()
function fetchProductsThen() {
    fetch(api_url)
    .then(response => {
        if (!response.ok) 
            throw new Error("Network response was not ok");
        return response.json();
    })
    .then(products => {
        products.forEach(product => {
            console.log(`Product (then): ${product.fields.name}`);
        })
    })
    .catch(error => {
        handleError(error);
    });
}

// Fetch products using async/await
async function fetchProductsAsync() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        handleError(error);
    }
}

// Call both functions
fetchProductsThen();

fetchProductsAsync();
