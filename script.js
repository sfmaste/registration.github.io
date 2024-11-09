const users = [
    { username: 'user1', email: 'user1@example.ru',
    password: '123', userID: 1},
    {username: 'user2', email: 'user2@example.ru',
    password: '321', userID: 2}
];

if (localStorage.getItem('currentUser')) {
    displayLogoutButton();
}

document.getElementById('registerButton').addEventListener('click', registerUser);
document.getElementById('loginButton').addEventListener('click', loginUser);
document.getElementById('logoutButton').addEventListener('click', logoutUser);

function registerUser() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registermail').value;
    const password = document.getElementById('registerPassword').value;
    const registerMsg = document.getElementById('registerMsg');

    const userExists = users.find(user => user.username === username && user.password === password)
    if (userExists) {
        registerMsg.textContent = 'Пользователь с такими данными уже существует';
        return;
    }

    const newUser = {
        username,
        email,
        password,
        userID: users.length + 1
    }

    users.push(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    alert(`Регистрация прошла успешно! Добро пожаловать, ${username}`)
    displayLogoutButton();
}

function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginMsg = document.getElementById('loginMsg');

    const user = users.find(user => user.username === username && user.password === password);

    if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Вход успешен! Добро пожаловать, ${username}`)
        displayLogoutButton();
    } else {
        loginMsg.textContent = 'Неверные данные'
    }
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    alert('Вы вышли из системы');
    location.reload()
}

function displayLogoutButton() {
    document.getElementById('logoutButton').classList.remove('hidden');
    document.getElementById('authForm').classList.add('hidden');
}