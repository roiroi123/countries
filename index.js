$(function () {
  let countryData = "";
  $("#button").on("click", () => {
    if (countryData === "") {
      alert(" Please insert the API URL  ");
    }
  });
  var $input = $("#input");
  var apiInput = $("#dataApi").val();
  var apiBtn = $("#btnApi");
  apiBtn.on("click", () => {
    $.ajax({
      type: "GET",
      url: apiInput,
      success: function (countries) {
        return (countryData = countries);
      },
      error: function () {
        alert("error");
      },
    });

    console.log(countryData);
    const input = $("#input");

    const button = $("#button");
    const container = $("#cardsContainer");

    button.on("click", function () {
      draw(countryData);
    });

    function draw(countryData) {
      const cardItems = getCountry(countryData);

      container.append(cardItems);
    }

    function getCountry(countryData) {
      const singleCountry = countryData.find((e) => e.name === input.val());

      const countryName = singleCountry.name;
      const countryPopulation = singleCountry.population;
      const countryCard = $(`<div class = "card"></div>`).css({
        width: "18rem",
      });
      const countryImgSVGUrl = singleCountry.flag;
      const countryImg = $(
        `<img class = "card-img-top" src =${countryImgSVGUrl}></img>`
      );
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
        countryCard.fadeOut("slow", () => {
          countryCard.remove();
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
  });
});
