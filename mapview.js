const items = [
    "Central Park", "Times Square", "Empire State Building", "Statue of Liberty", "Brooklyn Bridge", 
    "Metropolitan Museum of Art", "Broadway", "Rockefeller Center", "9/11 Memorial", "High Line", 
    "Chrysler Building", "One World Trade Center", "Grand Central Terminal", "Ellis Island", 
    "Bryant Park", "Madison Square Garden", "Fifth Avenue", "Soho", "Wall Street", "New York Public Library"
];

const itemsPerPage = 10;
let currentPage = 1;

function displayItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    const list = document.getElementById('dynamicList');
    list.innerHTML = '';

    paginatedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

function setupPagination(totalItems, itemsPerPage) {
    const paginationControls = document.getElementById('paginationControls');
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    paginationControls.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('pagination-btn');
        if (i === currentPage) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', function() {
            currentPage = i;
            displayItems(currentPage);
            setupPagination(items.length, itemsPerPage);
        });

        paginationControls.appendChild(btn);
    }
}

function filterList() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();

    const filteredItems = items.filter(item => item.toLowerCase().includes(filter));
    
    currentPage = 1;
    displayItems(currentPage, filteredItems);
    setupPagination(filteredItems.length, itemsPerPage);
}

// Initial display
displayItems(currentPage);
setupPagination(items.length, itemsPerPage);
