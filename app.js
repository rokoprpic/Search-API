// test code

const form = document.querySelector("#search");
const results = document.querySelector("#results");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchValue = form.elements.query.value;
  let config = {
    params: {
      q: searchValue,
    },
  };
  let queryString = new URLSearchParams(config.params).toString();
  let url = "https://api.tvmaze.com/search/shows?" + queryString;
  get(url).then((data) => {
    results.innerHTML = "";
    for (let i of data) {
      let container = document.createElement("div");
      let title = document.createElement("p");
      let img = document.createElement("img");
      title.textContent = i.show.name;
      img.src = i.show.image.medium;
      container.append(title, img);
      results.append(container);
    }
    form.reset();
  });
});

const get = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("Error in url");
  }
};
