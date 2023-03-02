
const noteBody = document.querySelector(".note__body")
const header = document.querySelector(".note__header")


const note = document.querySelectorAll(".note")

note.forEach(el => {
    el.addEventListener("click", () => {
        console.log(el)
    })
})

const noteList = []

function CreateNote(){
    this.setAttribute("disabled", true)
    let newNoteHtml = `
        <div class="note">
            <input type="text" class="note__name-press">
            <div class="note__btn">  
                <button class="note__delete btn__ico">
                    <svg width="24" height="26" viewBox="0 0 24 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.1357 26H5.86387C4.25404 26 2.93885 24.8136 2.85265 23.3198L2.8523 23.3126L1.7352 4.51453H22.2646L21.1464 23.3149C21.0586 24.8147 19.7443 25.9996 18.1357 26H18.1357L18.1357 26ZM3.06473 5.69639L4.10767 23.2487C4.15713 24.1251 4.92465 24.8181 5.8643 24.8182H18.1369C19.0758 24.8182 19.8429 24.1265 19.8934 23.2553L19.8936 23.2511L20.9353 5.69636L3.06473 5.69639ZM24 5.69639H0V4.51455H24V5.69639ZM9.60002 0H14.4C16.0716 0.00203125 17.4261 1.27598 17.4283 2.84799V5.69639H6.57171V2.84819C6.57387 1.27601 7.9284 0.00203125 9.59981 0H9.60002ZM16.1717 4.51455V2.84817C16.1703 1.92842 15.3779 1.18318 14.4001 1.18183H9.59997C8.62206 1.18315 7.8297 1.92839 7.82827 2.84804V4.51453L16.1717 4.51455ZM12.6283 22.0291H11.3717V8.48547H12.6283V22.0291ZM17.4283 22.0291H16.1718V8.48547H17.4283V22.0291ZM7.82827 22.0291H6.57171V8.48547H7.82827V22.0291Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `
    noteBody.innerHTML += newNoteHtml
    Validator(this)
}

function Validator(i){
    const newNoteTitle = document.querySelector(".note__name-press")
    newNoteTitle.focus()

    newNoteTitle.addEventListener("keydown", (e) => {
        if (e.target.value.length >= 3 && e.key === "Enter"){
            let newNote = {
                title: e.target.value,
                text: ""
            }
            noteList.push(newNote)
            DisplayNote()
            i.setAttribute("disabled", false)

        } else if (e.target.value.length < 3 && e.key === "Enter"){
            let newNote = {
                title: "Give me name",
                text: ""
            }
            noteList.push(newNote)
            i.setAttribute("disabled", true)
            DisplayNote()
        }
    })
}

function DeleteNote() {
    let goat = this.closest(".note")
    let el = goat.getAttribute("id")
    noteList.splice(el, 1)
    localStorage.clear()
    SaveDataLS()
    DisplayNote()
}

function DisplayNote() {
    noteBody.innerHTML = ""
    noteBody.style.padding = "0px"

    noteList.forEach((item, idx) => {
        let newNoteHtml = `
        <div class="note" id=${idx}>
            <span class="note__name-input" >${item.title.length <= 16 ? item.title : item.title.substr(0, 16) + "..."}</span>
            <div class="note__btn">  
                <button class="note__delete btn__ico">
                    <svg width="24" height="26" viewBox="0 0 24 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.1357 26H5.86387C4.25404 26 2.93885 24.8136 2.85265 23.3198L2.8523 23.3126L1.7352 4.51453H22.2646L21.1464 23.3149C21.0586 24.8147 19.7443 25.9996 18.1357 26H18.1357L18.1357 26ZM3.06473 5.69639L4.10767 23.2487C4.15713 24.1251 4.92465 24.8181 5.8643 24.8182H18.1369C19.0758 24.8182 19.8429 24.1265 19.8934 23.2553L19.8936 23.2511L20.9353 5.69636L3.06473 5.69639ZM24 5.69639H0V4.51455H24V5.69639ZM9.60002 0H14.4C16.0716 0.00203125 17.4261 1.27598 17.4283 2.84799V5.69639H6.57171V2.84819C6.57387 1.27601 7.9284 0.00203125 9.59981 0H9.60002ZM16.1717 4.51455V2.84817C16.1703 1.92842 15.3779 1.18318 14.4001 1.18183H9.59997C8.62206 1.18315 7.8297 1.92839 7.82827 2.84804V4.51453L16.1717 4.51455ZM12.6283 22.0291H11.3717V8.48547H12.6283V22.0291ZM17.4283 22.0291H16.1718V8.48547H17.4283V22.0291ZM7.82827 22.0291H6.57171V8.48547H7.82827V22.0291Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `

        let newHeadHtml = `
            <button class="create btn" >Create</button>
            <button class="exit btn" style="display: none;">Exit</button>
        `

        header.innerHTML = newHeadHtml
        noteBody.innerHTML += newNoteHtml

        const createBtn = document.querySelector(".create")
        createBtn.addEventListener("click", CreateNote)

        const deleteBtn = document.querySelectorAll(".note__delete")
        deleteBtn.forEach(i => {
            i.addEventListener("click", DeleteNote)
        })

        const note = document.querySelectorAll(".note__name-input")
        note.forEach(el => {
            el.addEventListener("click", () => {
                let currGoat = el.closest(".note").getAttribute("id")
                DisplayNotebook(currGoat)
            })
        })
    })
    SaveDataLS()
}

function SaveDataLS() {
    localStorage.clear()
    noteList.forEach((item, idx) => {
        localStorage.setItem("note " + idx, JSON.stringify(item))
    })
}

function FromLSIntoInt() {
    for(i = 0; i < localStorage.length; i++){
        let el = localStorage.getItem("note " + i)
        let note = JSON.parse(el)
        let newNote = {
            title: note.title,
            text: note.text
        }
        noteList.push(newNote)
    }
    DisplayNote()
}

function DisplayNotebook(goat){
    noteBody.innerHTML = ""
    noteBody.style.padding = "26px 26px 26px 27px"
    let page = noteList[goat]
    console.log(page)
    let newNoteHtml = `
        <div class="note__page">
            <h2 class="page__title">${page.title}</h2>
            
            <textarea name="" id="" cols="52" rows="20" class="note__text">${page.text}</textarea>
        </div>
    `

    let newHeadHtml = `
            <button class="create btn" style="display: none;">Create</button>
            <button class="exit btn"">Exit</button>
    `

    header.innerHTML = newHeadHtml

    noteBody.innerHTML += newNoteHtml

    const exit = document.querySelector(".exit")
    exit.addEventListener("click", () => {
        let input = document.querySelector(".note__text")
        noteList[goat].text = input.value
        DisplayNote()
    })

    const noteText = document.querySelector(".note__text")
    noteText.focus()
}




document.addEventListener("DOMContentLoaded", FromLSIntoInt)
