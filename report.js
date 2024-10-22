document.addEventListener("DOMContentLoaded", function () {
  const frequencies = document.querySelectorAll(".frequency");
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      function updateContent(timeframe) {
        data.forEach((item) => {
          const section = document.getElementById(item.title.toLowerCase());
          if (section) {
            const timeframeData = item.timeframes[timeframe];
            let text;
            if (timeframe === "daily") {
              text = "day";
            } else if (timeframe === "weekly") {
              text = "week";
            } else if (timeframe === "monthly") {
              text = "month";
            }
            if (timeframeData) {
              section.innerHTML = `
              <div class="card__top"></div>
                          <div class="card__content">
                              <p class="content--title">${addSpace(
                                item.title
                              )}</p>
                              <p class="content--dots">...</p>
                              <p class="content--current">${
                                timeframeData.current
                              }hrs</p>
                              <p class="content--prev">Last ${text} - ${
                timeframeData.previous
              }hrs</p>
                          </div>

              `;
            }
          }
        });
      }

      const activeLink = document.querySelector(".frequency.active");
      if (activeLink) {
        const activeLinkText = activeLink.textContent.trim().toLowerCase();
        updateContent(activeLinkText);
      }
      frequencies.forEach((frequency) => {
        frequency.addEventListener("click", function () {
          frequencies.forEach((f) => f.classList.remove("active"));
          this.classList.add("active");
          const activeLinkText = this.textContent.trim().toLowerCase();
          updateContent(activeLinkText);
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function addSpace(text) {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
}
