const newPostFormHandler = async (event) => { // new post handler
  event.preventDefault(); // prevent reload
  const title = document.querySelector('#title-new-post').value.trim(); // title value
  const content = document.querySelector('#content-new-post').value.trim(); // post content value
  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST', // POST title and content
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard'); // load dashboard if successful
    } else {
      alert('Error'); // error if unsuccessful
    }
  }
};

// event listener on post submit button
const newPostForm = document.querySelector('.new-post-form');
if (newPostForm) {
  newPostForm.addEventListener('submit', newPostFormHandler);
}
