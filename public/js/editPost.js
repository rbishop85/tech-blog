// What to do when submitting a post edit
const editPostFormHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {

    // Pull post id from the button's data-id attribute
    const id = event.target.getAttribute('data-id');
    // Pull the data about the post title and contents from their respective text boxes
    const title = document.querySelector("#postTitle").value.trim();
    const content = document.querySelector("#postContent").value.trim();

    // If we have all 3 values then submit the edit
    if (id && title && content) {
      // Post ID is attached as a parameter on the route
      const response = await fetch(`/api/post/edit/${id}`, {
        method: "PUT",
        // Title and content are included in the request's body
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // If edit successfully submits, then re-route user back to their dashboard
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update blog post.");
      }
    }
  }
};

// What to do when delete button is pressed (Not the primary button on the page but the delete button on the modal that pops up).
const delButtonHandler = async (event) => {
  event.preventDefault();

  // Only continue function if the button has a data-id value
  if (event.target.hasAttribute('data-id')) {

    // Pull post id from the button's data-id attribute
    const id = event.target.getAttribute('data-id');

    // Include the id as a parameter in the delete request route
    const response = await fetch(`/api/post/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // If delete request successfully submits, then re-route user back to their dashboard
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Add event listener to edit button that points to appropriate function
document
  .querySelector("#editPost")
  .addEventListener("click", editPostFormHandler);

// Add event listener to delete button that points to appropriate function
document
  .querySelector("#deletePost")
  .addEventListener("click", delButtonHandler);