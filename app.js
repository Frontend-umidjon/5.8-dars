const USERS = JSON.parse(localStorage.getItem('users')) || [
    {
        fname: 'Json',
        lname: 'Watson',
        role: 'CEO & Founder',
        university: 'Oxford',
        gender: 'female'
    },
    {
        fname: 'Jon',
        lname: 'Watson',
        role: 'CEO & Founder',
        university: 'Oxford',
        gender: 'male'
    },
    {
        fname: 'Nick',
        lname: 'Watson',
        role: 'CEO & Founder',
        university: 'Oxford',
        gender: 'male'
    },
    {
        fname: 'Joy',
        lname: 'Watson',
        role: 'CEO & Founder',
        university: 'Oxford',
        gender: 'female'
    }
];

const teamEl = document.querySelector('.team');
const modalEl = document.querySelector('.modal');
const modalFormEl = document.querySelector('.modal__form');
function createUserCard(user) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('team__card');
    cardEl.innerHTML = `
        <img src="${user.gender === 'male' ? './assets/man.png' : './assets/woman.png'}" class="team__card-image">
        <h2 class="team__card-name">${user.fname} ${user.lname}</h2>
        <p class="team__card-role">${user.role}</p>
        <p class="team__card-university">${user.university}</p>
        <div class="team__card-social">
            <i class="fab fa-instagram"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-facebook-f"></i>
        </div>
        <button class="team__card-button">Contact</button>
    `;

    teamEl.appendChild(cardEl);
}
function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(USERS));
}
window.addEventListener('load', () => {
    USERS.forEach(user => {
        createUserCard(user);
    });
})

const addNewEl = document.querySelector('.add__new');
addNewEl.addEventListener('click', () => {
    modalEl.style.display = 'flex';
});
modalFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const fname = document.querySelector('#fname').value.trim();
    const lname = document.querySelector('#lname').value.trim();
    const role = document.querySelector('#role').value.trim();
    const university = document.querySelector('#university').value.trim();
    const gender = document.querySelector('#gender').value.trim().toLowerCase();
    if (!fname || !lname || !role || !university || (gender !== 'male' && gender !== 'female')) {
        alert('Please fill in all fields correctly. Gender should be "male" or "female".');
        return;
    }
    const newUser = {
        fname,
        lname,
        role,
        university,
        gender
    };
    USERS.push(newUser);
    saveToLocalStorage();// Ustoz agar ko'rayotgan bo'lsangiz shuni o'tgan safargi vazifani shu funksiya bilan hal qildim kattakon raxmat.
    createUserCard(newUser);
    modalEl.style.display = 'none';
    modalFormEl.reset();
});
