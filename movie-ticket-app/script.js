const container = document.querySelector('#container');
const text = document.querySelector('#text');
const filmBtns = document.querySelector('#filmBtns');
const display = document.querySelector('#display');

const films = [
    {
        name: 'Esaretin Bedeli',
        video: 'https://www.youtube.com/embed/87Z98pEFMhs',
        price: 15,
        seat: 46
    },
    {
        name: 'Başlangıç',
        video: 'https://www.youtube.com/embed/YoHD9XEInc0',
        price: 20,
        seat: 32
    },
    {
        name: 'Yeşil Yol',
        video: 'https://www.youtube.com/embed/Ki4haFrqSrw',
        price: 25,
        seat: 20
    }
];

const createFilmButtons = () => {
    let html = '';
    for (let index in films) {
        const film = films[index];
        html += `<button data-index="${index}" value="${film.price}" class="film ${index === '0' ? 'active' : ''} flex-1 bg-[#5B5B5B] rounded-lg text-white h-[50px]">${film.name}</button>`
    }

    filmBtns.innerHTML = html;
}

const createSeats = (seat) => {
    let html = '';
    const filleds = [0, 3, 5, 8];
    for (let i = 0; i < seat; i++) {
        html += `<button class="seat ${filleds.includes(i) ? 'filled' : ''}"></button>`;
    }
    container.innerHTML = html;
}

const getSelectFilm = () => {
    const filmBtnSelected = document.querySelector('.film.active');
    const filmIndex = filmBtnSelected.getAttribute('data-index');
    return films[filmIndex];
}

const calculatePrice = () => {
    const selectedSeats = container.querySelectorAll('.seat.selected').length;
    const film = getSelectFilm();
    const totalPrice = parseFloat(film.price) * selectedSeats;
    if (selectedSeats > 0) {
        text.classList.remove('hidden')
        text.innerHTML = `${film.name} adlı kinoya ${selectedSeats} bilet seçdiniz, toplam məbləğ ${totalPrice} azn`
    }   
    else text.classList.add('hidden')
}

const showFilm = () => {
    const film = getSelectFilm();
    display.src = film.video + '?autoplay=true';
}

container.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains('seat')) {
        element.classList.toggle('selected')
        calculatePrice();
    }
});

filmBtns.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        filmBtns.querySelectorAll('.film').forEach(btn => btn.classList.remove('active'))
        e.target.classList.add('active');
        const film = getSelectFilm();
        showFilm();
        calculatePrice();
        createSeats(film.seat)
    }
})

createFilmButtons();
calculatePrice();
createSeats(getSelectFilm().seat);
showFilm();


