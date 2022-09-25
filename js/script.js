// error
/* 
At first click, it skips openModalButton.forEach();
At second click, it iterates once.
At the third click, it iterates twice.
So, it goes like (number of clicks + iteration) whereas initial iteration is 0.
*/

// search bar styles on mouse hover and clicks //
document.getElementById('search-field').addEventListener('mousemove', () => {
    document.getElementById('search-field').style.border = '2px solid black';
    document.getElementById('search-btn').style.backgroundColor = 'black';
})
document.getElementById('search-field').addEventListener('click', () => {
    document.getElementById('search-field').style.border = '2px solid black';
    document.getElementById('search-field').setAttribute('placeholder', "Enter keyword");
    document.getElementById('search-btn').style.backgroundColor = 'black';
    document.getElementById('search-btn').classList.add('clicked');
})
document.getElementById('search-field').addEventListener('blur', () => {
    document.getElementById('search-btn').style.backgroundColor = 'brown';
    document.getElementById('search-field').setAttribute('placeholder', 'Search for your next book...');
    document.getElementById('search-btn').removeAttribute('class');
})
document.getElementById('search-field').addEventListener('mouseleave', () => {
    // debugger;
    document.getElementById('search-field').style.border = '2px solid brown';
    if (document.getElementById('search-btn').hasAttribute('class') !== true) {
        document.getElementById('search-btn').style.backgroundColor = 'brown';
    }
})
document.getElementById('search-btn').addEventListener('mouseenter', () => {
    document.getElementById('search-field').style.border = '2px solid black';
    document.getElementById('search-btn').style.backgroundColor = 'black';
})
document.getElementById('search-btn').addEventListener('mouseleave', () => {
    document.getElementById('search-field').style.border = '2px solid brown';
    if (document.getElementById('search-btn').hasAttribute('class') !== true) {
        document.getElementById('search-btn').style.backgroundColor = 'brown';
    }
})

// search functionalities
const searchText = () => {
    // debugger;
    loader(true);
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = ``;
    loadData(searchValue);
}

/*
const loadData = searchValue => {
    fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
    .then(res => res.json())
    .then(function (data) {
            if (data) {
                displayData(data);
            }
        });
}
*/
async function loadData(searchValue) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${searchValue}`);
    const data = await res.json();
    if (res) {
        displayData(data);
    }
}

const modalBody = document.getElementById('modal-body');

// declaring global variables //
const resultSection = document.getElementById('result-section');
const restultContainer = document.getElementById('result-container');
const div = document.getElementById('result-container');
const resultStat = document.getElementById('result-stat');
const viewMsg = document.getElementById('view-msg');
const noResultText = document.getElementById('no-result-text');

const displayData = data => {
    loader(false)
    const books = data?.docs;
    console.log(books);

    if (books.length > 0) {
        restultContainer.textContent = ``;
        modalBody.textContent = ``;
        document.getElementById('result-stat').innerHTML = `${books.length} books out of ${data?.numFound} are shown.`;
        document.getElementById('view-msg').innerHTML = "Click on the covers to view larger image.";
        // debugger;
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
                // console.log(restultContainer);
                restultContainer.appendChild(bookDiv);

                // const bookCoverId = document.getElementById('book-cover');
                // bookCoverId.addEventListener('click', (event) => {
                //     showImage(event);
                // });

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
                // bookDiv.textContent = ``;
            }
        })
    }
    else {
        console.log('Sorry! No result found.');
        noResultText.innerText = "No result found";
    }
}

// const showImage = event => {
//     // debugger;

// }


// debugger;
// modal functionalities

// debugger;

// const addToModalBody = bookModalCover =>{
//     const modalBody = document.getElementsByClassName('modal-body');
//     modalBody.appendChild(bookModalCover);
// }
const openModal = modal => {
    // debugger;
    console.log('modal opened');
    if (modal === null) return;
    else {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}
const modalFunction = (event) => {
    // debugger;
    const openModalButton = document.querySelectorAll('[data-modal-target]'); //nodeList
    const closeModalButton = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    console.log(event.target);
    console.log(typeof (event.target));
    const bookModalCover = document.createElement('img');
    bookModalCover.setAttribute('src', `${event.target.src}`);
    bookModalCover.setAttribute('style', 'width: 20.5rem; height: 31.25rem;');
    // debugger;
    modalBody.appendChild(bookModalCover);
    // debugger;
    console.log(openModalButton);

    openModalButton.forEach(button => {
        // console.log(openModalButton);
        console.log('clicked');
        console.log(button);
        // debugger;
        // button.addEventListener('click', () => {
        console.log('entered');
        // console.log(openModalButton);
        console.log(button + 'clicked');
        // debugger;
        const modal = document.querySelector(button.dataset.modalTarget);
        // debugger;
        openModal(modal);
        // setTimeout(()=>openModal(modal), 2000);
        // })
    });

    /*
    const promise = new Promise((resolve, reject) => {
        if(event.target) {
            resolve();
        }
        else {
            reject('failure');
        }
    })
    promise.then(()=>{
        openModalButton.forEach(button => {
            // debugger;
            button.addEventListener('click', () => {
                console.log(openModalButton);
                console.log(button + 'clicked');
                // debugger;
                const modal = document.querySelector(button.dataset.modalTarget);
                // debugger;
                openModal(modal);
                // setTimeout(()=>openModal(modal), 2000);
            })
        })
    }).catch(err => {
        console.log(err);
    })
    */
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
    // modal functionalities end
}

// console.log(bookCoverId);

// load animation //
/*
const div = document.getElementById('result-container');
const resultStat = document.getElementById('result-stat');
const viewMsg = document.getElementById('view-msg');
*/
const divContents = div.innerHTML;
const loaderContainer = document.getElementById('loader-container');

const loader = isLoad => {
    if (isLoad == false) {
        // loaderContainer.style.opacity = '0';
        loaderContainer.style.display = 'none';
        div.innerHTML = divContents;
    }
    else {
        div.textContent = ``;
        resultStat.textContent = ``;
        viewMsg.textContent = ``;
        // resultSection.textContent = ``;
        noResultText.textContent = ``;
        loaderContainer.removeAttribute("style");
        loaderContainer.style.opacity = '100%';
        // loaderContainer.style.display = 'block';
    }
}