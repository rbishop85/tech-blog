// New Comment function
const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    // Verify that clicked button has a data-id attribute
    if (event.target.hasAttribute('data-id')) {

        // Note what post the comment is attached to and the comment's content
        const post_id = event.target.getAttribute('data-id');
        const content = document.querySelector("#commentContent").value.trim();
  
        // If there both values exist then submit the new comment
        if (post_id && content) {
          const response = await fetch("/api/comment/new", {
            method: "POST",
            // Include both values in the new comment request's body
            body: JSON.stringify({ post_id, content }),
            headers: { "Content-Type": "application/json" },
          });
      
          if (response.ok) {
            // If new comment is submitted successfully, reload the current blog post page
            document.location.reload();
          } else {
            alert("Failed to post new comment.");
          }
        }
    }
  };

// Comment delete function
const delButtonHandler = async (event) => {
  event.preventDefault();
  
  // Verify that clicked button has a data-id attribute
  if (event.target.hasAttribute('data-id')) {
  
    // Pull the comment id from the clicked button
    const id = event.target.getAttribute('data-id');

    // Send the comment's id in a parameter of the delete request
    const response = await fetch(`/api/comment/delete/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      // If delete request is successful, reload current blog post page
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
    }
  };
  
// When delete confirm modal is Loaded, feed it a unique data-id based on the button that triggered it
var deleteConfirmModal = document.getElementById('deleteConfirmModal')
deleteConfirmModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-id of initial button
  var buttonData = button.getAttribute('data-id')
  // Find the delete button inside the modal
  var deleteButton = deleteConfirmModal.querySelector('#deleteComment')
  // Add a data-id value to the modal's delete button that came from the data-id of the button that triggered the modal
  deleteButton.setAttribute('data-id', buttonData);
})

// When Submit Comment button is clicked, run the new comment function
document
.querySelector("#addComment")
.addEventListener("click", newCommentFormHandler);

// When the comment delete button is clicked, run the delete comment function
document
  .querySelector("#deleteComment")
  .addEventListener("click", delButtonHandler);