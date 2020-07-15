// all of the data
function getCountriesFromServer() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://restcountries.eu/rest/v2/all",
    }).done(function (countries) {
      resolve(countries);
    });
  });
}


async function init() {
  
  const input = $("#input");
  const inputVal = input.val()

  const button = $("#button");
  const container = $("#cardsContainer");

  const countries = await getCountriesFromServer();
  
  button.on("click", function () {
    
    draw(countries);
  });

  function draw(countries) {
    const cardItems = getCountry(countries);

    container.append(cardItems);
  }

  
  
  // searching inside my own web not searching from the server
  function getCountry(countryData) {
    const singleCountry = countryData.find((e) => e.name === input.val());
    const countryName = singleCountry.name;
    const countryPopulation = singleCountry.population;
    const countryCard = $(`<div class = "card"></div>`).css({ width: "18rem" });
    const countryImgSVGUrl = singleCountry.flag
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
          countryCard.remove()
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
