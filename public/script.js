const apiUrl = 'http://localhost:5000/api/users';

const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable');
const userIdField = document.getElementById('userId');

async function fetchUsers() {
    const res = await fetch(apiUrl);
    const users = await res.json();
    userTable.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser('${user._id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function saveUser(event) {
    event.preventDefault();
    const id = userIdField.value;
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };

    if (id) {
        await fetch(`${apiUrl}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) });
    } else {
        await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) });
    }

    userForm.reset();
    fetchUsers();
}

async function editUser(id) {
    const res = await fetch(`${apiUrl}/${id}`);
    const user = await res.json();
    userIdField.value = user._id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('age').value = user.age;
}

async function deleteUser(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchUsers();
}

userForm.addEventListener('submit', saveUser);
document.addEventListener('DOMContentLoaded', fetchUsers);
