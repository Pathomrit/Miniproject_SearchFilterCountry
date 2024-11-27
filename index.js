const search = document.querySelector(".search");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const container = document.getElementById("container");
const filter = document.getElementById("filter");
const listItems = [];

filter.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase(); 
  listItems.forEach((item) => {
    const name = item.querySelector(".name").innerText.toLowerCase(); 
    if (name.includes(searchValue)) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
});

btn.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});

const getCountries = async () => {
  const url = "https://restcountries.com/v3.1/all";
  const res = await fetch(url);
  const items = await res.json();
  items.forEach((element) => {
    createCard(element);
  });
};

const createCard = (data) => {
  const cardEl = document.createElement("div");
  cardEl.classList.add("countries");
  const contentEl = `
    <div class="img-container">
      <img src="${data.flags.png}" alt="${data.name.common} flag" />
    </div>
    <div class="info">
        <h2 class="name">${data.name.common}</h2>
        <p>เมืองหลวง : <span>${data.capital || "N/A"}</span></p>
        <p>Population : ${formatNumber(data.population)}</p>
    </div>
    `;
  cardEl.innerHTML = contentEl;
  container.appendChild(cardEl);
  listItems.push(cardEl);
};

getCountries();

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
