let banniereDesktop = document.getElementsByClassName("banniere-desktop")[0]
let banniereMobile = document.getElementsByClassName("banniere-mobile")[0]

window.addEventListener("resize", function(event) {
    let widthOfWindow = window.innerWidth
    if (widthOfWindow <= 760) {
        banniereMobile.classList.remove("hide")
        banniereDesktop.classList.add("hide")
    } else {
        banniereDesktop.classList.remove("hide")
        banniereMobile.classList.add("hide")
    }
})