{
  'use strict';
  const select = {
    templateOf: {
      books: '#template-book',
    },

    listOf: {
      bookList: '.books-list',
    },

    containerOf: {
      image: '.book__image',
    },

    imageParams: {
      id: '.book-id',
    },

    filtersOf: {
      form: '.filters',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
  const favoriteBooks = [];
  const filters = [];

  function render() {
    for(let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;
      const ratingWidth = book.ratingBgc * 10;
      book.ratingWidth = ratingWidth;
      const generatedHTML = templates.bookTemplate(book);
      const bookDOMElement = utils.createDOMFromHTML(generatedHTML);
      const bookListContainer = document.querySelector(select.listOf.bookList);
      bookListContainer.appendChild(bookDOMElement);
    }
  }

  function initActions() {
    const imageContainer = document.querySelector(select.listOf.bookList);
    imageContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains('book__image')) {
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)) {
          favoriteBooks.push(bookId);
          event.target.offsetParent.classList.add('favorite');
        } else {
          const indexOfbookId = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(indexOfbookId, 1);
          event.target.offsetParent.classList.remove('favorite');
        }
      }
    });
    const filter = document.querySelector(select.filtersOf.form);
    filter.addEventListener('click', function(event){
      const filterValue = event.target.value;
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
        if(event.target.checked) {
          filters.push(filterValue);
        } else {
          const indexOfFilters = filters.indexOf(filterValue);
          filters.splice(indexOfFilters, 1);
          event.target.offsetParent.classList.remove('filterValue');
        }
      }
      filterBooks();
    });
  }

  function filterBooks() {
    for(const book of dataSource.books) {
      let shouldBeHidden = false;
      for(const filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookItem = document.querySelector('.book__image[data-id="'+book.id+'"]');
      if(shouldBeHidden == true){
        bookItem.classList.add('hidden');
      } else {
        bookItem.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating) {
    let background = '';
    if(rating < 6){
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if(rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
    return background;
  }

  render();
  initActions();
}