// Cache DOM elements
const userMatrix = document.getElementById('userMatrix');
const searchInput = document.getElementById('searchInput');
const userLoader = document.getElementById('userLoader');

// State
let users = [];

// Fetch users from API
async function fetchUsers() {
    try {
        showLoader();
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        showNoResults('Failed to load users. Please try again later.');
    } finally {
        hideLoader();
    }
}

// Show loading state
function showLoader() {
    userLoader.style.display = 'flex';
    userMatrix.style.display = 'none';
}

// Hide loading state
function hideLoader() {
    userLoader.style.display = 'none';
}

// Show no results state
function showNoResults(message) {
    userMatrix.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <p>${message}</p>
        </div>
    `;
    userMatrix.style.display = 'flex';
}

// Create user card HTML
function createUserCard(user) {
    return `
        <div class="user-card">
            <img 
                src="https://robohash.org/${user.id}?set=set2&size=200x200" 
                alt="${user.name}"
                class="user-image"
                loading="lazy"
            >
            <div class="user-info">
                <h2 class="user-name">${user.name}</h2>
                <div class="user-details">
                    <p><i class="fas fa-envelope"></i> ${user.email}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${user.address.city}, ${user.address.street}</p>
                    <p><i class="fas fa-phone"></i> ${user.phone}</p>
                </div>
            </div>
        </div>
    `;
}

// Display users in the grid
function displayUsers(usersToDisplay) {
    if (!usersToDisplay.length) {
        showNoResults('No users found matching your search.');
        return;
    }

    userMatrix.style.display = 'flex';
    userMatrix.innerHTML = usersToDisplay.map(createUserCard).join('');
}

// Filter users based on search input
function filterUsers(searchTerm) {
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayUsers(filteredUsers);
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    filterUsers(e.target.value);
});

// Initialize the app
fetchUsers();
