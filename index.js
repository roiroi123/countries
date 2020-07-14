const input = $("#input")
const button = $("#button")

function getCountriesFromServer () {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://restcountries.eu/rest/v2/all",
        }).done(function (data) {
            resolve(data)
        })
    })
}
function searchCountriesFromServer (name) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("in server....")
            const result = countries.filter(p => p.country === name)
            if (!result.length) rej(`no result for the relevant search ${name}`)
            res(result)
        }, 10000)
    })

}
async function init () {

    const input = $("#input")
    const button = $("#button")
    const container = $("#cardsContainer")

    button.on("click", async function () {
       
        console.log("hey");
        //resolve =>>> then
        // reject =>>> catch

        try {
            const result = await searchCountriesFromServer(input.val())

            console.log("this is blocked!!!!!!!")
            draw(result)
        } catch (err) {
            alert(err)
            container.empty()
        }
        console.log("search end")
    })

    const countries = await getCountriesFromServer()
    draw(countries)

console.log(countries);




    function draw (countries) {
        container.empty()
        const cardItems = countries.map((country) => {
            return getCountry(countries)
        })
        container.append(...cardItems)
    }

    function getCountry (countryData) {
        const filterdCountries = []
        // console.log(countryData);
       
        
        const countryName  = countryData.name
        const countryCard = $(`<div class = "card"></div>`).css({"width" : "18rem"})
        const countryImg = $(`<img class "card-img-top" = "></img>`)
        const cardBody = $(`<div class="card-body"></div>`)
        const cardTitle = $(`<h5 class="card-title">${countryName}</h5>`)
        const cardText = $(`<p class="card-text">${countryName} is the best country in the World</p>`)

        countryCard.append(countryImg)
        countryCard.append(cardBody)
        cardBody.append(cardTitle)
        cardBody.append(cardText)

        
        return countryCard
    }

}
init()

