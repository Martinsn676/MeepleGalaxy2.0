document.querySelector("header").innerHTML=`${headerTemplate()}`

if(document.title==="Shop"){
    document.querySelector(".shopLink").classList.add("active")
}
if(document.title==="Meeple Galaxy"){
    document.querySelector(".homeLink").classList.add("active")
}
if(document.title==="Blogs"){
    document.querySelector(".blogLink").classList.add("active")
}
if(document.title==="Contact us"){
    document.querySelector(".contactLink").classList.add("active")
}

const modal = document.querySelector("#modal-container")

if(modal){
    modal.innerHTML=`${modalTemplate()}`
}

 const searchField = document.querySelector('#search')

if(searchField){
            searchField.innerHTML= `<div class="flex-column">
                <input id="search-input"></input>
                <section id="search-container" class="flex-row flex-wrap"></section> 
                </div>
            `;
searchContainer = document.querySelector("#search-container")
                searchContainer.innerHTML =""
                searchInput = document.querySelector("#search-input")
        

}

document.querySelector("#showMneu").addEventListener("click",()=>document.querySelector("#header .mobile").classList.toggle("hide"))