// 간단한 페이드인 효과
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".card, .image-section img");
  elements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transition = "opacity 1s ease";
  });
  setTimeout(() => {
    elements.forEach((el) => (el.style.opacity = 1));
  }, 200);
});
