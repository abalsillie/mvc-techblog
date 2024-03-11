const newCommentFormHandler = async (event) => { // new comment handler
  event.preventDefault(); // prevent reload
  const post_id = parseInt(window.location.pathname.split('/').pop()); // add new comment to comment string
  const content = document.querySelector('#content-new-comment').value.trim(); // comment data
  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST', // POST the comment content
      body: JSON.stringify({ comment_text: content, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload(); // reload page if successful
    } else {
      alert('Error'); // error if unsuccessful
    }
  }
};

// event listener on comment button
const newCommentForm = document.querySelector('.new-comment-form');
if (newCommentForm) {
  newCommentForm.addEventListener('submit', newCommentFormHandler);
}
