const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    
    const isDark = document.body.classList.contains('dark-theme-variables');
    localStorage.setItem('darkTheme', isDark);
    
    themeToggler.querySelectorAll('span').forEach(icon => {
        icon.classList.toggle('active');
    });
});

if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-theme-variables');
    themeToggler.querySelector('span:first-child').classList.remove('active');
    themeToggler.querySelector('span:last-child').classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Customer Management (existing code)
    const addCustomerBtn = document.getElementById('add-customer-btn');
    const customerForm = document.getElementById('customer-form');
    const customerModal = document.getElementById('customer-modal');
    const closeModal = document.querySelector('.close-modal');
    const customersList = document.getElementById('customers-list');
    const searchInput = document.getElementById('customer-search');
    
    // Product Management
    const products = JSON.parse(localStorage.getItem('products')) || [
        {
            name: "Organic Vermicompost",
            description: "5kg bags",
            price: "$35",
            stock: "In Stock",
            image: "compost.jpg",
            sku: "ORG-VERMI-001",
            category: "Organic Manures"
        },
        {
            name: "NPK 19:19:19 Fertilizer",
            description: "20kg bags", 
            price: "$12",
            stock: "Low Stock",
            image: "fertilizer.webp",
            sku: "CHEM-NPK-001",
            category: "Chemical Fertilizers"
        }
    ];
    
    const productsGrid = document.querySelector('.products-grid');
    const productForm = document.getElementById('product-form');
    const productModal = document.getElementById('product-modal');
    const addProductBtn = document.querySelector('.primary');
    let currentProductIndex = null;

    // Initialize the app
    initCustomerManagement();
    initProductManagement();
    renderProducts();

    function initCustomerManagement() {
        // Existing customer management code
        addCustomerBtn?.addEventListener('click', function() {
            customerModal.style.display = 'block';
        });
        
        closeModal?.addEventListener('click', function() {
            customerModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === customerModal) {
                customerModal.style.display = 'none';
            }
        });

        customerForm?.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const name = document.getElementById('name').value;
            const business = document.getElementById('business').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            const customerId = '#CUST-' + Math.floor(1000 + Math.random() * 9000);
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${customerId}</td>
                <td>${name}</td>
                <td>${business}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>0</td>
                <td class="success">Active</td>
                <td>
                    <span class="material-symbols-sharp edit-btn">edit</span>
                    <span class="material-symbols-sharp delete-btn">delete</span>
                </td>
            `;
            customersList?.appendChild(newRow);
            customerForm.reset();
            customerModal.style.display = 'none';
            addButtonListeners(newRow);
        });

        searchInput?.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase();
            const rows = customersList?.querySelectorAll('tr') || [];

            rows.forEach(row => {
                const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const business = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || business.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        function addButtonListeners(row) {
            const editBtn = row.querySelector('.edit-btn');
            const deleteBtn = row.querySelector('.delete-btn');

            editBtn.addEventListener('click', function() {
                const cells = row.querySelectorAll('td');
                document.getElementById('name').value = cells[1].textContent;
                document.getElementById('business').value = cells[2].textContent;
                document.getElementById('email').value = cells[3].textContent;
                document.getElementById('phone').value = cells[4].textContent;
                
                customerModal.style.display = 'block';
                row.remove();
            });

            deleteBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this customer?')) {
                    row.remove();
                }
            });
        }
        
        document.querySelectorAll('#customers-list tr').forEach(row => {
            addButtonListeners(row);
        });
    }

    function initProductManagement() {
        // Product modal handling
        addProductBtn?.addEventListener('click', () => {
            currentProductIndex = null;
            productForm.reset();
            document.querySelector('#product-modal .modal-header h2').textContent = 'Add New Product';
            productModal.style.display = 'block';
        });
        
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                productModal.style.display = 'none';
            });
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.style.display = 'none';
            }
        });
        
        productForm?.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newProduct = {
                name: document.getElementById('product-name').value,
                description: document.getElementById('product-description').value,
                sku: document.getElementById('product-sku').value,
                category: document.getElementById('product-category').value,
                price: '$' + document.getElementById('product-price').value,
                stock: document.getElementById('product-stock').value,
                image: "default-product.jpg"
            };
            
            if (currentProductIndex !== null) {
                // Update existing product
                products[currentProductIndex] = newProduct;
            } else {
                // Add new product
                products.push(newProduct);
            }
            
            saveProducts();
            renderProducts();
            productForm.reset();
            productModal.style.display = 'none';
        });
    }

    function renderProducts() {
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="stock-badge ${getStockBadgeClass(product.stock)}">${product.stock}</span>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="text-muted">${product.description}</p>
                    <div class="product-footer">
                        <span class="price">${product.price}</span>
                        <div class="actions">
                            <span class="material-symbols-sharp delete-btn" data-index="${index}">delete</span>
                        </div>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                editProduct(index);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteProduct(index);
            });
        });
    }

    function editProduct(index) {
        currentProductIndex = index;
        const product = products[index];
        
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-sku').value = product.sku;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price.replace('$', '');
        document.getElementById('product-stock').value = product.stock;
        
        document.querySelector('#product-modal .modal-header h2').textContent = 'Edit Product';
        productModal.style.display = 'block';
    }

    function deleteProduct(index) {
        if (confirm('Are you sure you want to delete this product?')) {
            products.splice(index, 1);
            saveProducts();
            renderProducts();
        }
    }

    function getStockBadgeClass(stockStatus) {
        switch(stockStatus) {
            case 'In Stock': return 'success';
            case 'Low Stock': return 'warning';
            case 'Out of Stock': return 'danger';
            default: return '';
        }
    }

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }
});