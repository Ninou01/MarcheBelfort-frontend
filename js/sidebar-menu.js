let menuButton = document.querySelector(".menu button")
let menuSidebar = document.getElementsByClassName("menu-sidebar")[0]
let menuOverlay = document.getElementsByClassName("menu-overlay")[0]

window.addEventListener("load", () => {
    document.body.classList.remove("preload")
})

menuButton.addEventListener("click", () => {
    menuSidebar.classList.add("visible")
})

menuOverlay.addEventListener("click", () => {
    menuSidebar.classList.remove("visible")

})