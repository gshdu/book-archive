// creating common funcitons //

const commonChanges = elementId => document.getElementById(elementId);

const searchStyles = (changeType, elementId, prop, propValue, attType, attN, attV) =>{
   switch(changeType){
    case 'style': return commonChanges(elementId)[changeType][prop] = propValue;
    case 'Attribute': return commonChanges(elementId)[attType + changeType](attN, attV);
    case 'classList': return commonChanges(elementId)[changeType].add(attV);
   }
}

// search bar styles on mouse hover and clicks //
document.getElementById('search-field').addEventListener('mousemove', () => {
    searchStyles('style', 'search-field', 'border', '2px solid black', NaN, NaN, NaN);
    searchStyles('style', 'search-btn', 'backgroundColor', 'black', NaN, NaN, NaN);
})
document.getElementById('search-field').addEventListener('click', () => {
   searchStyles('style', 'search-field', 'border', '2px solid black', NaN, NaN, NaN);
   searchStyles('Attribute', 'search-field', NaN, NaN, 'set', 'placeholder', 'Enter keyword');
   searchStyles('style', 'search-btn', 'backgroundColor', 'black', NaN, NaN, NaN);
   searchStyles('classList', 'search-btn', NaN, NaN, NaN, NaN, 'clicked');
})
document.getElementById('search-field').addEventListener('blur', () => {
   searchStyles('style', 'search-btn', 'backgroundColor', 'brown', NaN, NaN, NaN);
   searchStyles('Attribute', 'search-field', NaN, NaN, 'set', 'placeholder', 'Search for your next book...');
   searchStyles('Attribute', 'search-btn', NaN, NaN, 'remove', 'class', NaN);
})
document.getElementById('search-field').addEventListener('mouseleave', () => {
    searchStyles('style', 'search-field', 'border', '2px solid brown', NaN, NaN, NaN);
    if (searchStyles('Attribute', 'search-btn', NaN, NaN, 'has', 'class', NaN) !== true) {
        searchStyles('style', 'search-btn', 'backgroundColor', 'brown', NaN, NaN, NaN);
    }
})
document.getElementById('search-btn').addEventListener('mouseenter', () => {
   searchStyles('style', 'search-field', 'border', '2px solid black', NaN, NaN, NaN);
   searchStyles('style', 'search-btn', 'backgroundColor', 'black', NaN, NaN, NaN);
})
document.getElementById('search-btn').addEventListener('mouseleave', () => {
    searchStyles('style', 'search-field', 'border', '2px solid brown', NaN, NaN, NaN);
    if (searchStyles('Attribute', 'search-btn', NaN, NaN, 'has', 'class', NaN) !== true) {
        searchStyles('style', 'search-btn', 'backgroundColor', 'brown', NaN, NaN, NaN);
    }
})

// search functionalities //
const searchText = () => {
    loader(true);
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = ``;
    loadData(searchValue);
}
async function loadData(searchValue) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${searchValue}`);
    const data = await res.json();
    if (res) {
        displayData(data);
    }
}

// declaring global variables //
const resultSection = document.getElementById('result-section');
const restultContainer = document.getElementById('result-container');
const div = document.getElementById('result-container');
const resultStat = document.getElementById('result-stat');
const viewMsg = document.getElementById('view-msg');
const noResultText = document.getElementById('no-result-text');
const modalBody = document.getElementById('modal-body');

const displayData = data => {
    loader(false)
    const books = data?.docs;
    console.log(books);

    if (books.length > 0) {
        restultContainer.textContent = ``;
        modalBody.textContent = ``;
        document.getElementById('result-stat').innerHTML = `${books.length} books out of ${data?.numFound} are shown.`;
        document.getElementById('view-msg').innerHTML = "Click on the covers to view larger image.";

        books.forEach(book => {
            if (book?.cover_i) {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
            <div data-modal-target="#modal" id="book-cover" class="book-cover" onclick="modalFunction(event)">
                <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" alt="">
                <i class="fas fa-eye"></i>
            </div>
            <div class="book-details">
                <h2>${book?.title}</h2>
                <hr>
                <h4><span class="author">${(book?.author_name) ? book.author_name[0] : 'No author found'}</span></h4>
                <h4 class="publish-year">(${(book?.first_publish_year) ? book.first_publish_year : 'Publish year not found'})</h4>
            </div>
            `;

                restultContainer.appendChild(bookDiv);
            }

            else {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
            <div class="no-cover">
                <i class="fas fa-book"></i>
                <h1>Cover not found</h1>
            </div>
            <div class="book-details">
                <h2>${book?.title}</h2>
                <hr>
                <h4 class="author">${(book?.author_name) ? book.author_name[0] : 'No author found'}</h4>
                <h4 class="publish-year">(${(book?.first_publish_year) ? book.first_publish_year : 'Publish year not found'})</h4>
            </div>
            `;
                restultContainer.appendChild(bookDiv);
            }
        })
    }
    else {
        noResultText.innerText = "No result found";
    }
}

const openModal = modal => {
    if (modal === null) return;
    else {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}
const modalFunction = (event) => {
    const openModalButton = document.querySelectorAll('[data-modal-target]'); //nodeList
    const closeModalButton = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    const bookModalCover = document.createElement('img');
    bookModalCover.setAttribute('src', `${event.target.src}`);
    bookModalCover.setAttribute('style', 'width: 20.5rem; height: 31.25rem;');

    modalBody.appendChild(bookModalCover);

    openModalButton.forEach(button => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });

    closeModalButton.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal, modalBody);
        })
    })

    const closeModal = (modal) => {
        if (modal === null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
        modalBody.textContent = ``;
    }
    // modal functionalities end //
}

// declaring global variables //
const divContents = div.innerHTML;
const loaderContainer = document.getElementById('loader-container');

const loader = isLoad => {
    if (isLoad == false) {
        loaderContainer.style.display = 'none';
        div.innerHTML = divContents;
    }
    else {
        div.textContent = ``;
        resultStat.textContent = ``;
        viewMsg.textContent = ``;
        noResultText.textContent = ``;
        loaderContainer.removeAttribute("style");
        loaderContainer.style.opacity = '100%';
    }
}