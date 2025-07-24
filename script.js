const usersContainer = document.getElementById('usersContainer');
const sortSelector = document.getElementById('sortSelector');
const searchInput = document.getElementById('searchInput');
const loader = document.getElementById('loader');

let users = []; 

function renderUsers(list) {
  usersContainer.innerHTML = '';
  list.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user-card';
    div.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first}">
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>Yosh: ${user.dob.age}</p>
    `;
    usersContainer.appendChild(div);
  });
}

async function loadUsers() {
  loader.style.display = 'block';
  usersContainer.innerHTML = '';

  try {
    const response = await fetch('https://randomuser.me/api/?results=100');
    const data = await response.json();
    users = data.results;
    renderUsers(users);
  } catch (error) {
    console.error('Xatolik:', error);
  } finally {
    loader.style.display = 'none';
  }
}

function applyFilters() {
  let filtered = [...users];

  const search = searchInput.value.toLowerCase();
  if (search) {
    filtered = filtered.filter(user =>
      user.name.first.toLowerCase().includes(search) ||
      user.name.last.toLowerCase().includes(search)
    );
  }

  const sortBy = sortSelector.value;
  if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.first.localeCompare(b.name.first));
  } else if (sortBy === 'age') {
    filtered.sort((a, b) => a.dob.age - b.dob.age);
  }

  renderUsers(filtered);
}

sortSelector.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

loadUsers();
