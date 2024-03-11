const deletePost = async (post_id) => { // delete post
  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.reload(); // reload page once post deleted
  } else {
    alert("Error"); // error if unsuccessful
  }
};

const deletePostHandler = (event) => { // event handler for deleted post
  if (event.target.matches(".delete-post")) {
    const post_id = event.target.getAttribute("data-post-id");
    deletePost(post_id);
  }
};

document.addEventListener("click", deletePostHandler); // event listener on delete post button
