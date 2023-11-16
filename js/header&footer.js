document.querySelector("header").innerHTML=`${headerTemplate()}`

if(document.title==="Shop"){
    document.querySelector("#shopLink").classList.add("active")
}
if(document.title==="Meeple Galaxy"){
    document.querySelector("#homeLink").classList.add("active")
}
if(document.title==="Blogs"){
    document.querySelector("#blogLink").classList.add("active")
}
if(document.title==="Contact us"){
    document.querySelector("#contactLink").classList.add("active")
}

const modal = document.querySelector("#modal-container")

if(modal){
    modal.innerHTML=`${modalTemplate()}`
}