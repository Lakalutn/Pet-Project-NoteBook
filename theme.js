const themeChange = document.querySelectorAll(".theme__img")
const themeBurger = document.querySelector(".theme__burger")

themeChange.forEach((i) => {
    i.addEventListener("click", () => {
        let id = i.getAttribute("id")
        document.querySelector(".video__media").src = `theme/${id}.mp4`
    })
})

themeBurger.addEventListener("click", () => {
    const theme = document.querySelector(".theme__list")
    if (theme.style.display !== "grid"){
        theme.style.display = "grid"
    }
    else {
        theme.style.display = "none"
    }
})
