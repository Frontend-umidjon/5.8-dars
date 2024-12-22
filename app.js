const BASE_URL = 'http://localhost:3000';
const team = document.querySelector('.team')
 const addNew = document.querySelector('.add__new')
 const modal = document.querySelector('.modal')
 const modalForm = document.querySelector('.modal__form')
 const fname = document.querySelector('#fname')
 const lname = document.querySelector('#lname')
 const role = document.querySelector('#role')
 const university = document.querySelector('#university')
 const gender = document.querySelector('#gender')

async function fetchData() {
    const response = await fetch(`${BASE_URL}/users`)
    
    response 
        .json()
        .then(res => {
            createUserCards(res)
        })
        .catch(err => console.log(err))
}

window.onload = () => {
    fetchData()
}

addNew.addEventListener('click', () => {
    modal.style.display = 'flex'
})
addNew.addEventListener('blur', () => {
    modal.style.display = 'none'
})

function createUserCards(users) {
    users.forEach(user => {
        const card = document.createElement('div')
        card.classList.add('team__card')
        card.innerHTML = `
            <button name="delete" class="team__card-delete" data-id="${user.id}">X</button>
            <img src="${user.gender === 'male' ? './assets/man.png' : './assets/woman.png'}" class="team__card-image">
            <h2 class="team__card-name">${user.fname} ${user.lname}</h2>
            <p class="team__card-role">${user.role}</p>
            <p class="team__card-university">${user.university}</p>
            <div class="team__card-social">
                <i class="fab fa-facebook"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
            </div>
        `
        team.appendChild(card)
    })
}

modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newUser = {
        fname: modalForm.fname.value,
        lname: modalForm.lname.value,
        role: modalForm.role.value,
        university: modalForm.university.value,
        gender: modalForm.gender.value,
    }
    fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(res => res.json())
        .then(res => {
            createUserCards(res)
            modalForm.innerHTML= null
            modal.style.display = 'none'
        })
        .catch(err => console.log(err))
    }
)

team.addEventListener('click', (e) => {
    if (e.target.name === ( 'delete')) {
       let id = e.target.dataset.id
       fetch(`${BASE_URL}/users/${id}`, {
           method: 'DELETE',
           headers: {
               'Content-Type': 'application/json'
           }
       })
       }
    }
)