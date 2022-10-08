const searchResults = document.querySelector("#search");
const button = document.querySelector("#btn");
const div = document.querySelector("#results");
const images = document.querySelector("#images");
const regionName = new Intl.DisplayNames(["en"], { type: "region" });

button.addEventListener("click", (e) => {
  images.innerHTML = "";
  fetch(`https://api.nationalize.io/?name=${searchResults.value}`)
    .then((response) => response.json())
    .then((data) => showResults(data));
});

showResults = (data) => {
  searchResults.value = "";
  const countries = sortCountries(data.country);
  let ol = document.createElement("ol");
  ol.className = "order-list";

  countries.forEach(function (country) {
    let li = document.createElement("li");
    li.textContent = `${regionName.of(country.country_id)} - Probability:  ${(
      country.probability * 100
    ).toFixed(2)} %`;
    ol.appendChild(li);
    fetchFlag(country.country_id);
  });
  div.innerHTML = "";
  div.appendChild(ol);
};

sortCountries = (countries) => {
  sort = countries.sort(function (a, b) {
    if (a.probability > b.probability) {
      return -1;
    } else if (a.probability < b.probability) {
      return 1;
    } else {
      return 0;
    }
  });
  return sort;
};

fetchFlag = (country) => {
  fetch(`https://countryflagsapi.com/png/${country}`)
    .then((response) => response)
    .then((data) => buildFlag(data.url));
};

buildFlag = (url) => {
  let img = document.createElement("img");
  img.src = `${url}`;
  images.appendChild(img);
};
