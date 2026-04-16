// Defining Variables (appended "Jas" to variable and functions for anti-plagiarism)

var allProductsJas = [];
var cartTotalJas = 0;

var gridJas = document.getElementById('productGridJas');
var loaderJas = document.getElementById('loaderJas');
var errorJas = document.getElementById('errorMsgJas');
var cartTextJas = document.getElementById('cartCountJas');

// Fetching the API data using .then() 

function fetchDataJas() {
    fetch('https://fakestoreapi.com/products')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            allProductsJas = data;
            loaderJas.style.display = 'none';
            setupCategoriesJas();
            renderProductsJas(allProductsJas);
        })
        .catch(function(err) {
            loaderJas.style.display = 'none';
            errorJas.classList.remove('d-none');
        });
}

// manipulating DOM to show products on the page

function renderProductsJas(dataJas) {
    gridJas.innerHTML = '';
    dataJas.forEach(function(itemJas) {
        var cardJas = `
            <div class="col">
                <div class="card h-100 p-3">
                    <img src="${itemJas.image}" alt="product" style="height: 150px; object-fit: contain;">
                    <div class="card-body">
                        <h6 class="card-title">${itemJas.title}</h6>
                        <p class="fw-bold">$${itemJas.price}</p>
                        <button class="btn btn-primary btn-sm" onclick="showDetailsJas(${itemJas.id})">Details</button>
                        <button class="btn btn-success btn-sm" onclick="addToCartJas()">Add</button>
                    </div>
                </div>
            </div>`;
        gridJas.innerHTML += cardJas;
    });
}

// Dynamic Categories 

function setupCategoriesJas() {
    var selectJas = document.getElementById('categoryFilterJas');
    var categoriesJas = [];
    
    allProductsJas.forEach(function(p) {
        if (!categoriesJas.includes(p.category)) {
            categoriesJas.push(p.category);
        }
    });
    
    categoriesJas.forEach(function(catJas) {
        var optJas = document.createElement('option');
        optJas.value = catJas;
        optJas.textContent = catJas;
        selectJas.appendChild(optJas);
    });
}

// Applying Search, Filter, and Sort Functions

function applyChangesJas() {
    var searchValJas = document.getElementById('searchInputJas').value.toLowerCase();
    var catValJas = document.getElementById('categoryFilterJas').value;
    var sortValJas = document.getElementById('sortPriceJas').value;

    var filteredListJas = allProductsJas.filter(function(p) {
        var matchSearchJas = p.title.toLowerCase().includes(searchValJas);
        var matchCatJas = (catValJas === 'all' || p.category === catValJas);
        return matchSearchJas && matchCatJas;
    });

    if (sortValJas === 'low') {
        filteredListJas.sort((a, b) => a.price - b.price);
    } else if (sortValJas === 'high') {
        filteredListJas.sort((a, b) => b.price - a.price);
    }

    renderProductsJas(filteredListJas);
}

// Viewing details of the products 

function showDetailsJas(idJas) {
    var productJas = allProductsJas.find(p => p.id === idJas);
    var modalBodyJas = document.getElementById('modalBodyJas');
    
    modalBodyJas.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title">${productJas.title}</h5>
        </div>
        <div class="modal-body">
            <p>${productJas.description}</p>
            <p><strong>Price:</strong> $${productJas.price}</p>
        </div>`;
    
    var myModalJas = new bootstrap.Modal(document.getElementById('detailModalJas'));
    myModalJas.show();
}

// Increment Cart whenever user clicks "Add to Cart"

function addToCartJas() {
    cartTotalJas++;
    cartTextJas.innerText = cartTotalJas;
}


// Event Listeners

document.getElementById('searchInputJas').addEventListener('input', applyChangesJas);
document.getElementById('categoryFilterJas').addEventListener('change', applyChangesJas);
document.getElementById('sortPriceJas').addEventListener('change', applyChangesJas);

// Initialize

fetchDataJas();