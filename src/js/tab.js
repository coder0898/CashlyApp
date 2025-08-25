//tab
const TabButtons = document.querySelectorAll(".tab-buttons .tab");
const TabContainers = document.querySelectorAll(" .content");

export function initTabs() {
  //tab functionality
  TabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabid = btn.dataset.tab;

      //removing existing active class from all tabs button
      TabButtons.forEach((btn) => btn.classList.remove("active"));

      TabContainers.forEach((content) => content.classList.remove("active"));

      TabContainers.forEach((content) => {
        const targetContent = content.dataset.tab;

        if (targetContent === tabid) {
          content.classList.add("active");
        }
      });

      btn.classList.add("active");
    });
  });
}
