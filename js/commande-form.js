let form = document.getElementsByTagName("form")[0]
let quantité = form.querySelector('input[type="number"]')
let price = document.getElementById("price")
let totalPrice = document.getElementById("total-price")
let wilayat = document.getElementById("wilaya")
let communes = document.getElementById("commune")
let errorsBox = document.querySelector(".errors-box")

fetch("https://raw.githubusercontent.com/Ninou01/MarcheBelfort-frontend/main/js/Wilaya_Of_Algeria.json")
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
    fetch("https://raw.githubusercontent.com/Ninou01/MarcheBelfort-frontend/main/js/algeria_cities.json")
    .then((result) => result.json())
    .then(data => {
        let wilayaCode = +wilayat.selectedOptions[0].getAttribute("data-wilaya-code")
        
        // sort communes by alphabetic order
        data = data.filter(element => parseInt(element["wilaya_code"]) === wilayaCode)
        data.sort((a,b) => a.commune_name_ascii < b.commune_name_ascii ? -1 : a.commune_name_ascii < b.commune_name_ascii ? 1 : 0)
        communes.innerHTML = ""

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
// changing price by changing quantity with arrows
quantité.addEventListener("change", () => {
    totalPrice.textContent = +price.textContent * +quantité.value
})
// changing price by changing quantity with keyboard
quantité.addEventListener("keyup", () => {
    totalPrice.textContent = +price.textContent * +quantité.value
})


form.addEventListener("submit", (e) => {
    
    // quantity validator
    let formValide = true;
    if (quantité.value <= 0) {
        formValide = false
        let error = document.createElement("li")
        error.textContent = "quantité invalide"
        errorsBox.append(error)
        errorsBox.classList.add("visible")
    }
    
    // phone number validator
    const reg=  /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
    const phone_number = form.querySelector("#phone_number")
    const phone_number2 = form.querySelector("#phone_number2")
    if (!reg.test(phone_number.value.trim()) || 
    (!reg.test(phone_number2.value.trim()) && phone_number2.value !=="")) {
        formValide = false
        let error = document.createElement("li")
        error.textContent = "numero de telephone invalide"
        errorsBox.append(error)
        errorsBox.classList.add("visible")
    }

    // delete error messages after 10s
    if (formValide == false) {
        e.preventDefault()
    } else {
        insertPopup()
        e.preventDefault()
    }
    setTimeout(() => {
        errorsBox.innerHTML = ""
        errorsBox.classList.remove("visible")
        
      }, "10000")
})

const insertPopup = () => {
    let popup = document.createElement("div")
    popup.classList.add("popup")
    popup.innerHTML = `
        <div class="popup-card">
        <span class="check-icon">
        <img src="images/check.png" alt="check-icon">
        </span>
        <p class="popup-message">
            <span>
            تمت العملية بنجاح 
            </span>
            سيتصل بك احد اعواننا لتأكد من معلومات و اعطائك تفاصيل اكثر
        </p>
        <button class="btn popup-close" onClick="deletePopup()">إغلاق</button>
        </div>
    `
    let footer = document.getElementsByTagName("footer")[0]
    footer.before(popup)
    popup.classList.add("fade-in")
    document.body.style.overflow = "hidden"
    document.body.style.height = "100vh"
}
const deletePopup = () => {
    const popup = document.getElementsByClassName("popup")[0]
    popup.classList.add("fade-out")
    form.reset()
    setTimeout(() =>{ 
        popup.remove()
        document.body.style.overflow = ""
        document.body.style.height = ""
    }, "200")
}

// for more information about what's going on here check:
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const commandeButton = document.getElementsByClassName("commande-button")[0]
const options = {
    root: null,
    rootMargin: '0px',
    threshold: .5,
}

const handleINtersect = function (entries, observer) {
    if (entries[0].intersectionRatio < 0.5 || 
        entries[0].intersectionRatio > 1.3) {
        commandeButton.classList.add("fadein")
        commandeButton.classList.remove("fadeout")
        
    } else {
        commandeButton.classList.remove("fadein")
        commandeButton.classList.add("fadeout")
    }
}

const observer = new IntersectionObserver(handleINtersect, options)
observer.observe(document.getElementById("form"))


