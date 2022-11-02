let menuButton = document.querySelector(".menu button")
let menuSidebar = document.getElementsByClassName("menu-sidebar")[0]
let menuOverlay = document.getElementsByClassName("menu-overlay")[0]
let menuLinks = document.getElementsByClassName("menu-links")[0]
let dropdown = document.getElementsByClassName("dropdown")[0]
let select = dropdown.querySelector(".select")


window.addEventListener("load", () => {
    document.body.classList.remove("preload")
})

menuButton.addEventListener("click", () => {
    menuSidebar.classList.add("visible")
})

menuOverlay.addEventListener("click", () => {
    menuSidebar.classList.remove("visible")
    
})

select.addEventListener("click", () => {
    dropdown.classList.toggle("active")
    menuLinks.classList.toggle("scroll")
})