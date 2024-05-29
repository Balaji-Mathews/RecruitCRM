document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
    });

    if (res.ok) {
        alert('User registered successfully');
    } else {
        alert('Registration failed');
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        alert('Login successful');
    } else {
        alert('Login failed');
    }
});

document.getElementById('candidateForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('candidateFirstName').value;
    const lastName = document.getElementById('candidateLastName').value;
    const email = document.getElementById('candidateEmail').value;
    const token = localStorage.getItem('token');

    const res = await fetch('/api/candidate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email }),
    });

    if (res.ok) {
        alert('Candidate added successfully');
    } else {
        alert('Adding candidate failed');
    }
});

document.getElementById('protectedButton').addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('/api/protected', {
        method: 'POST',
        headers: {
            'Authorization': token,
        },
    });

    if (res.ok) {
        alert('Accessed protected route');
    } else {
        alert('Access denied');
    }
});
