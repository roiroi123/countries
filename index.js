
function getCountriesFromServer() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://restcountries.eu/rest/v2/all",
    }).done(function (data) {
      resolve(data);
    });
  });
}
function searchCountriesFromServer(name) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("in server....");
      const result = countries.filter((p) => p.country === name);
      if (!result.length) rej(`no result for the relevant search ${name}`);
      res(result);
    }, 10000);
  });
}
async function init() {
  const input = $("#input");

  const button = $("#button");
  const container = $("#cardsContainer");

  const countries = await getCountriesFromServer();
  button.on("click", function () {
    // console.log(countries);
    draw(countries);
  });

  function draw(countries) {
    const cardItems = getCountry(countries);

    container.append(cardItems);
  }

  function getCountry(countryData) {
    const singleCountry = countryData.filter((e) => e.name === input.val());
    const countryName = singleCountry[0].name;
    const countryPopulation = singleCountry[0].population;
    const countryCard = $(`<div class = "card"></div>`).css({ width: "18rem" });
    const countryImgSVGUrl = singleCountry[0].flag
    const countryImg = $(`<img class = "card-img-top" src =${countryImgSVGUrl}></img>`);
    const cardBody = $(`<div class="card-body"></div>`);
    const cardTitle = $(`<h5 class="card-title">${countryName}</h5>`);
    const cardText = $(
      `<p class="card-text">${countryName} is the best country in the World</p>`
    );
    const cardPopulation = $(
      `<p class="text-muted"> Number of citizens : ${countryPopulation} </p>`
    );
    const deleteBtn = $(`<input type="button" id ="delete"  >`)
      .addClass("btn btn-danger")
      .val("X")
      .css({ display: "block" });
      deleteBtn.click(() => {
        countryCard.fadeOut("slow" , ()=>{
          this.remove()
        });
      });

    countryCard.append(deleteBtn);
    countryCard.append(countryImg);
    countryCard.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(cardPopulation);

    return countryCard;
  }
}
init();
