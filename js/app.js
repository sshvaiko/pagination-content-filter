"use strict";

const postsPerPage = 10;
const contentList = document.querySelector('.student-list');

const getItemsList = () => {
  return contentList.querySelectorAll('li:not(.disabled)');
}
let itemsList = contentList.querySelectorAll('li:not(.disabled)');

const showPage = targetPage => {
  targetPage.className = 'active';

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

const appendPageLinks = itemsList => {
  let count = Math.ceil(itemsList.length / postsPerPage);
  if(itemsList.length > postsPerPage) {
    let pageLinks = document.createElement('div');
    pageLinks.className = 'pagination';

    let pageLinksHtml = '<ul>';
    for (let i = 1; i < count + 1; i++) {
        pageLinksHtml += '<li><a href="#page-' + i + '">' + i + '</a></li>';
    }
    pageLinksHtml += '</ul>';

    pageLinks.innerHTML = pageLinksHtml;
    pageLinks.querySelector('a').className = 'active';
    contentList.parentNode.appendChild(pageLinks);

    return true;
  } else {
    return false;
  }
}

const searchList = () => {
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
    console.log('search');
    const resultList = [];

    for (let i = 0; i < itemsList.length; i++) {
      let itemContent = itemsList[i].querySelector('.student-details').innerText.toLowerCase();

      if(itemContent.indexOf(searchQuery) === -1) {
        itemsList[i].classList.add('disabled');
      } else {
        itemsList[i].classList.remove('disabled');
        isFound = true;
        resultList.push(itemsList[i]);
      }

    };

    if( !isFound ) {
      alert('Nothing found!')
    } else {
      console.log(resultList);
      appendPageLinks(resultList);
    }

  });

}

const initialization = (itemsList) => {
  // show items only for the first page
  for (let i = 0; i < itemsList.length; i++) {
    if(i > postsPerPage - 1) {
      itemsList[i].style.display = 'none';
    }
  }

  // add page links with event handlers if needed pagination
  if( appendPageLinks(itemsList) ) {
    const pageBlock = document.querySelector('.pagination');
    const pageLinks = pageBlock.querySelectorAll('a');

    for (let i = 0; i < pageLinks.length; i++) {
      pageLinks[i].addEventListener('click', event => {
        // remove active class from the current page
        let currentPage = pageBlock.querySelector('.active');
        currentPage.classList.remove('active');
        showPage(event.target);
      });
    }

  }
}

// initialization
initialization( getItemsList() );

// add search form
searchList();
