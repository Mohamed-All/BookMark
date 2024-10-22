document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();
    
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;
    
    const bookmark = {
        name: siteName,
        url: siteUrl
    };

    if (!localStorage.getItem('bookmarks')) {
        localStorage.setItem('bookmarks', JSON.stringify([bookmark]));
    } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('bookmarkForm').reset();
    displayBookmarks();
}

function displayBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarksTableBody = document.querySelector('#bookmarksTable tbody');
    bookmarksTableBody.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const row = bookmarksTableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.name}</td>
            <td><a href="${bookmark.url}" target="_blank">Visit</a></td>
            <td><button onclick="deleteBookmark(${index})">Delete</button></td>
        `;
    });
}

function deleteBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

document.addEventListener('DOMContentLoaded', displayBookmarks);
