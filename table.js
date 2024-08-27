// scripts.js
const data = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, price: 3.99, history: [{ date: '2020-01-05', customerId: '11091700', amount: 3 }, { date: '2020-01-02', customerId: 'Anonymous', amount: 1 }] },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, price: 4.99, history: [{ date: '2020-02-15', customerId: '10109823', amount: 2 }] },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0, price: 3.79, history: [{ date: '2020-01-09', customerId: '11091700', amount: 1 }, { date: '2020-01-05', customerId: 'Anonymous', amount: 2 }] },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, price: 2.5, history: [{ date: '2020-01-01', customerId: '11091700', amount: 2 }, { date: '2020-01-03', customerId: 'Anonymous', amount: 1 }] },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, price: 1.5, history: [{ date: '2020-02-10', customerId: '11091700', amount: 3 }, { date: '2020-02-12', customerId: 'Anonymous', amount: 2 }] },
];

let currentPage = 1;
const rowsPerPage = 3;

function renderTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const pageData = data.slice(startIdx, endIdx);

  pageData.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td><button class="collapsible-btn" onclick="toggleRow(this)">+</button></td>
          <td>${row.name}</td>
          <td class="right">${row.calories}</td>
          <td class="right">${row.fat}</td>
          <td class="right">${row.carbs}</td>
          <td class="right">${row.protein}</td>
      `;
      tableBody.appendChild(tr);

      const collapsibleContent = document.createElement('tr');
      collapsibleContent.classList.add('collapsible-content');
      collapsibleContent.innerHTML = `
          <td colspan="6">
              <strong>Info</strong>
              <table class="inner-table">
                  <thead>
                      <tr>
                          <th>Start Location</th>
                          <th>End Location</th>
                          <th>Duration</th>
                          <th>Distance(KM)</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${row.history.map(history => `
                          <tr>
                              <td>${history.date}</td>
                              <td>${history.customerId}</td>
                              <td>${history.amount}</td>
                              <td>${history.amount}</td>
                          </tr>
                      `).join('')}
                  </tbody>
              </table>
          </td>
      `;
      tableBody.appendChild(collapsibleContent);
  });

  updatePagination();
}

function toggleRow(button) {
  const tr = button.parentElement.parentElement.nextElementSibling;
  tr.classList.toggle('collapsible-open');
  button.textContent = tr.classList.contains('collapsible-open') ? '-' : '+';
}

function updatePagination() {
  const pageInfo = document.getElementById('pageInfo');
  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(data.length / rowsPerPage)}`;
}

function prevPage() {
  if (currentPage > 1) {
      currentPage--;
      renderTable();
  }
}

function nextPage() {
  if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      currentPage++;
      renderTable();
  }
}

function searchTable() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const filteredData = data.filter(item => item.name.toLowerCase().includes(input));
  
  renderTable(filteredData);
}

renderTable();
