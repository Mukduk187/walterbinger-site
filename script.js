document.getElementById("email-link")?.addEventListener("click", (event) => {
  if (!navigator.clipboard) return;
  event.preventDefault();
  navigator.clipboard.writeText("wbinger@gmail.com").then(() => {
    const link = event.currentTarget;
    const original = link.textContent;
    link.textContent = "Copied — wbinger@gmail.com";
    setTimeout(() => {
      link.textContent = original;
    }, 1800);
  });
});
