
let imagesToShow = [...document.getElementsByClassName("image-to-show")]
let slides = [...document.getElementsByClassName("slide")]
let slideContainer = document.getElementsByClassName("slide-container")[0]
let nextButton = document.getElementsByClassName("next")[0]
let prevButton = document.getElementsByClassName("prev")[0]

if (slides.length <= 4) {
    [nextButton, prevButton].forEach(button => {
        button.classList.add("hide")
    })
} else {
    slides[0].classList.add("move")
    slides[3].classList.add("move")
}

function resize_slide() {
    for (let i = 0; i < slides.length; i++){
        const slide = slides[i]
        slide.style.left = 0 + "px";
        slide.style.left = (slide.offsetWidth + 8)* i + "px";
        slide.style.height = slide.offsetWidth
    }
}

const showSlide = (targetSlide, index, activeSlide) => {
    activeSlide.classList.remove("active")
    targetSlide.classList.add("active")

    const activeImage = imagesToShow.filter(image => image.classList.contains("active"))[0]
    const targetImage = imagesToShow[index]

    activeImage.classList.remove("active")
    targetImage.classList.add("active")
}

const showHideButton = (index) => {
    if (index === slides.length - 1) {
        nextButton.classList.add("hide")
    }
    else if(index !== 0 && index !== slides.length - 1) {
        nextButton.classList.remove("hide")
        prevButton.classList.remove("hide")
    }
    else if (index === 0) {
        prevButton.classList.add("hide")
    }
}

const moveContainer = (container, distance, direction) => {
    container.style.transform = `translateX(-${(distance)}px)`;
    container.querySelectorAll(".move").forEach(slide => {
        slide.classList.remove("move")
        if (direction == "next") {
            slide.nextElementSibling.classList.add("move")
        } else {
            slide.previousElementSibling.classList.add("move")
        }
    })
}

resize_slide()

window.addEventListener("resize", resize_slide)

slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
        const activeSlide = slides.filter(slide => slide.classList.contains("active"))[0]
        showSlide(slide, index, activeSlide)
    })
})

nextButton.addEventListener("click", () => {
    const activeSlide = slides.filter(slide => slide.classList.contains("active"))[0]
    const targetSlide = activeSlide.nextElementSibling
    const index = slides.indexOf(targetSlide)
    showSlide(targetSlide, index, activeSlide)
    showHideButton(index)

    // move container by (width of slides)px to the right        
    if (document.getElementsByClassName("move")[1] === activeSlide) {
        const distance = (activeSlide.offsetWidth + 8) * (index - 3)
        moveContainer(slideContainer, distance, "next")

        // slideContainer.style.transform = `translateX(-${(activeSlide.offsetWidth + 8) * (index - 3)}px)`;
        // slideContainer.querySelectorAll(".move").forEach(slide => {
        //     slide.classList.remove("move")
        //     slide.nextElementSibling.classList.add("move")
        // })
    }
})

prevButton.addEventListener("click", () => {
    const activeSlide = slides.filter(slide => slide.classList.contains("active"))[0]
    const targetSlide = activeSlide.previousElementSibling
    const index = slides.indexOf(targetSlide)
    showSlide(targetSlide, index, activeSlide)
    showHideButton(index)

    // move container by (width of slides)px to the left
    if (document.getElementsByClassName("move")[0] === activeSlide) {
        const distance = (activeSlide.offsetWidth + 8) * (index)
        moveContainer(slideContainer, distance, "previous")
        
        // slideContainer.style.transform = `translateX(-${(activeSlide.offsetWidth + 8) * (index)}px)`;
        // slideContainer.querySelectorAll(".move").forEach(slide => {
        //     slide.classList.remove("move")
        //     slide.previousElementSibling.classList.add("move")
        // })
    }
})





