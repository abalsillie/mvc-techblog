// get post ID
const post_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];

// post update
const updatePostFormHandler = async (event) => {
  event.preventDefault(); // prevent reload
  const title = document.querySelector("#title-update-post").value.trim(); // value from updated title input
  const content = document.querySelector("#content-update-post").value.trim(); // value from updated text input
  if (title && content) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT", // update post with title and content
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard"); // load dashboard once submitted
    } else {
      alert("Error"); // error
    }
  }
};

// delete post
const deletePostFormHandler = async (event) => {
  event.preventDefault(); // prevent reload
  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE", // delete post
  });
  if (response.ok) {
    document.location.replace("/dashboard"); // load dashboard once deleted
  } else {
    alert("Error"); // error
  }
};

// event listeners on buttons
const updatePostButton = document.querySelector("#update-post"); // save button
if (updatePostButton) {
  updatePostButton.addEventListener("click", updatePostFormHandler);
}
const deletePostButton = document.querySelector("#delete-post"); // delete button
if (deletePostButton) {
  deletePostButton.addEventListener("click", deletePostFormHandler);
}
