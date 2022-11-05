let form = document.getElementsByTagName("form")[0]
let quantité = form.querySelector('input[type="number"]')
let price = document.getElementsByClassName("produit-price")[0]
let totalPrice = document.getElementById("price")
let wilayat = document.getElementById("wilaya")
let communes = document.getElementById("commune")
let errorsBox = document.querySelector(".errors-box")

fetch("/js/Wilaya_Of_Algeria.json" || "https://raw.githubusercontent.com/Ninou01/MarcheBelfort-frontend/main/js/Wilaya_Of_Algeria.json")
.then((result) => result.json())
.then(data => {
    for (let i = 0; i < data.length; i++) {
        d = data[i]
        let option = document.createElement("option")
        option.textContent = `${d["code"]}-${d["name"]}`
        option.value = d["name"]
        option.setAttribute("data-wilaya-code", d["code"])
        wilayat.append(option)
    }
})

wilayat.addEventListener("change", function () {
    let myArr = []
    fetch("/js/algeria_cities.json" || "https://raw.githubusercontent.com/Ninou01/MarcheBelfort-frontend/main/js/algeria_cities.json")
    .then((result) => result.json())
    .then(data => {
        let wilayaCode = +wilayat.selectedOptions[0].getAttribute("data-wilaya-code")
        data = data.filter(element => parseInt(element["wilaya_code"]) === wilayaCode)
        for (let i = 0; i < data.length; i++) {
            d = data[i]
            let option = document.createElement("option")
            option.textContent = d["commune_name_ascii"]
            option.value = d["commune_name_ascii"]
            communes.append(option)
        }
    })
})

totalPrice.textContent = price.textContent
quantité.addEventListener("change", () => {
    totalPrice.textContent = +price.textContent * +quantité.value
})


form.addEventListener("submit", (e) => {
    const reg=  /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
    const phone_number = form.querySelector("#phone_number")
    const phone_number2 = form.querySelector("#phone_number2")
    if (!reg.test(phone_number.value.trim()) || 
    (!reg.test(phone_number2.value.trim()) && phone_number2.value !=="")) {
        e.preventDefault()
        let error = document.createElement("li")
        error.textContent = "numero de telephone invalide"
        errorsBox.append(error)
        errorsBox.classList.add("visible")
        setTimeout(() => {
            errorsBox.innerHTML = ""
            errorsBox.classList.remove("visible")
            
          }, "10000")
    }
})

