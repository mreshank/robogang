// Cache DOM elements
const userMatrix = document.getElementById('userMatrix');
const searchInput = document.getElementById('searchInput');

// State
let users = [];

// Fetch users from API
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
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