document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".delete-message").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const messageId = event.target.dataset.id;
      console.log(messageId);

      if (!confirm("Are you sure you want to delete this message?")) {
        return;
      }

      try {
        const response = await fetch(`/messages/${messageId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (response.status !== 204) {
          throw new Error("Failed to delete message.");
        }

        // Remove message from the UI
        event.target.closest(".messageCard").remove();
      } catch (error) {
        console.error(error);
        alert("Error deleting message.");
      }
    });
  });
});
