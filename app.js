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

    const addCustomerBtn = document.getElementById('add-customer-btn');
    const customerForm = document.getElementById('customer-form');
    const customerModal = document.getElementById('customer-modal');
    const closeModal = document.querySelector('.close-modal');
    const customersList = document.getElementById('customers-list');
    const searchInput = document.getElementById('customer-search');
    addCustomerBtn.addEventListener('click', function() {
        customerModal.style.display = 'block';
    });
    closeModal.addEventListener('click', function() {
        customerModal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target === customerModal) {
            customerModal.style.display = 'none';
        }
    });


    customerForm.addEventListener('submit', function(e) {
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
        customersList.appendChild(newRow);

        customerForm.reset();
        customerModal.style.display = 'none';

        addButtonListeners(newRow);
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = customersList.querySelectorAll('tr');

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
});


