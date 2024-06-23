// function to get the array of savedBookIds saved in local storage under the key "saved_books"
// if theres nothing under that key, return an ampty array to the user - "savedBookIds"
// if there is something uder that key, return the array or savedBookIds - "savedBookIds"
export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

// function to save an array of savedBookIds in ocal storage under the key, "saved_books"
// if there are elements (bookids) in the array, convert the bookIdArr into a JSON string and save it to local storage under the key "saved_books"
// else if the array is empty, remove the "saved_books" item from local storage. - indicating that there are no saved books on this users account
export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

// function to remove a specific bookId from the array under the 'saved_books' key in local storage
// uses the .filter, to return a copy of the savedBookIds array, minus the bookId that was passed to this function to delete
// then convert that new array into a JSON string and save it back in local storage under the 'saved_books' key
export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
