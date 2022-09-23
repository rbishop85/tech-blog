const newCommentFormHandler = async (event) => {
    event.preventDefault();

    console.log("Hello world")
  
    if (event.target.hasAttribute('data-id')) {

        const post_id = event.target.getAttribute('data-id');
        const content = document.querySelector("#commentContent").value.trim();

        console.log(post_id, content);
  
        if (post_id && content) {
          const response = await fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ post_id, content }),
            headers: { "Content-Type": "application/json" },
          });
      
          if (response.ok) {
            document.location.reload();
          } else {
            alert("Failed to post new comment.");
          }
        }
    }
  };
  
  document
    .querySelector("#addComment")
    .addEventListener("click", newCommentFormHandler);
  