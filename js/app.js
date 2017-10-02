"use strict";

const postsPerPage = 10;
const contentList = document.querySelector('.student-list');
const notFound = document.createElement('p');

// create not found message
notFound.innerHTML = 'Sorry, nothing found.';
notFound.style.display = 'none';
contentList.parentNode.appendChild(notFound);

const getItemsList = () => {
  return contentList.querySelectorAll('li:not(.disabled)');
}

const appendPageLinks = itemsList => {
  let count = Math.ceil(itemsList.length / postsPerPage);
  if(itemsList.length > postsPerPage) {
    // generate and add html pagination code
    let pagination = document.createElement('div');
    pagination.className = 'pagination';

    let pageLinksHtml = '<ul>';
    for (let i = 1; i < count + 1; i++) {
        pageLinksHtml += '<li><a href="#page-' + i + '">' + i + '</a></li>';
    }
    pageLinksHtml += '</ul>';
    pagination.innerHTML = pageLinksHtml;
    pagination.querySelector('a').className = 'active';
    contentList.parentNode.appendChild(pagination);

    // add events
    const pageLinks = pagination.querySelectorAll('a');
    for (let i = 0; i < pageLinks.length; i++) {
      pageLinks[i].addEventListener('click', event => {
        // remove active class from the preview active page and add to a new
        let currentPage = pagination.querySelector('.active');
        currentPage.classList.remove('active');
        event.target.className = 'active';
        showPage(event.target);
      });
    }
  }
}

const updatePagination = () => {
  // if we have already pagination we should update it
  let oldPagination = document.querySelector('.pagination');
  if(oldPagination) {
    oldPagination.parentNode.removeChild(oldPagination);
  }
}

const showPage = targetPage => {
  let itemsList = getItemsList();

  let targetPageNumber = parseInt( (targetPage.text) );
  let firstElement = (targetPageNumber - 1) * postsPerPage;
  let lastElement = firstElement + postsPerPage;

  for (let i = 0; i < itemsList.length; i++) {
    if( i >= firstElement && i < lastElement ) {
      itemsList[i].style.display = 'block';
    } else {
      itemsList[i].style.display = 'none';
    }
  }

}

const searchList = (itemsList) => {
  let searchForm = document.createElement('div');
  searchForm.className = 'student-search';
  searchForm.innerHTML = '<input placeholder="Search for students...">';
  searchForm.innerHTML += '<button>Search</button>';
  document.querySelector('.page-header').appendChild(searchForm);

  let searchButton = searchForm.querySelector('button');
  let searchInput = searchForm.querySelector('input');

  searchButton.addEventListener('click', event => {
    let searchQuery = searchInput.value.toLowerCase();
    let isFound = false;

    // if item contains query string, it adds it in array
    const resultList = [];
    for (let i = 0; i < itemsList.length; i++) {
      let itemContent = itemsList[i].querySelector('.student-details').innerText.toLowerCase();

      if(itemContent.indexOf(searchQuery) === -1) {
        itemsList[i].classList.add('hidden');
        itemsList[i].style.display = 'none';
      } else {
        itemsList[i].classList.remove('hidden');
        isFound = true;
        resultList.push(itemsList[i]);
      }

    };

    if( !isFound ) {
      notFound.style.display = 'block';
      updatePagination();
    } else {
      notFound.style.display = 'none';
      // initialization with found items
      init(resultList);
    }

  });

}

const init = itemsList => {
  // show items only for the first page
  for (let i = 0; i < itemsList.length; i++) {
    if(i > postsPerPage - 1) {
      itemsList[i].style.display = 'none';
    } else {
      itemsList[i].removeAttribute('style');
    }
  }
  updatePagination();
  appendPageLinks(itemsList);
}

init( getItemsList() );
searchList( getItemsList() );
