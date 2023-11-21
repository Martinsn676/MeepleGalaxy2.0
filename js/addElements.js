//console.log("product.js")

function addAttributes(type,element){
let newHtml = "" 
element.attributes.forEach(element => {
    if(element.name.toLowerCase()===type){
        if(type==="pc"){
            if(!element.terms[1].name){
                end = ` player`
            }else{
                end = `-${element.terms[1].name} players`
            }
            newHtml+=`${element.terms[0].name+end}`
        }
        if(type==="pt"){
                if(!element.terms[1].name){
                end = ` min`
            }else{
                end = `-${element.terms[1].name} min`
            }
            newHtml+=`${element.terms[0].name+end}`
        }
        if(type==="dg"){
            newHtml="Designers: "
            element.terms.forEach(element => {
                newHtml+=`<a href="#${element.name}">${element.name}</a> `
            });
        }
        if(type==="bgg"){
            console.log(element.terms)
            newHtml=`<a href='${element.terms[0].name}' target='_blank'><img class="link-logo" src='https://prototype.meeplegalaxy.com/wp-content/uploads/2023/11/BoardGameGeek_Logo.svg_.png'></a>`
        }
    }
});
return newHtml
}

function quickView(product) {
    //displayModal(product)
    const quickViewContainer = document.querySelector(".quickView-container")
    if(quickViewContainer){
        quickViewContainer.innerHTML = `${quickViewTemplate(product)}`;
    }else{
       localStorage.setItem('speedLoad', JSON.stringify(product));
       location.href=`productPage.html?id=${product.id}`;
    }
}

async function addElements(place,itemType,quantity,type,order) {
    console.log(place,itemType,quantity,type,order)
    let slider = false;
    let loadExtra = 0;
    let apiUrl
    let urlOrder
    let orderName
    let  mainContainer = document.querySelector(`${place}`)
    let secondLoadNumber
    let maxElements = 999
    mainContainer.innerHTML=""
    loadNumber = quantity;
    if(!type){
        type=["",999,999]
    }
    
    if(itemType==="products"){
        mainTemplate = productMainClasses()
        apiUrl = productsUrl  
    }
    if(itemType==="blogs"){
        mainTemplate = blogMainClasses();
        apiUrl = blogsUrl
    }
    if(itemType==="wide-blogs"){
        mainTemplate = wideBlogMainClasses();
        apiUrl = blogsUrl;
    }
    mainContainer.innerHTML += `
    <div class="sort-buttons flex-row no-wrap">
        <button id='titleAsc' onclick="addElements('${place}','${itemType}',${quantity},['${type[0]}',${type[1]},${type[2]}],'titleAsc')">Title asc</button>
        <button id='titleDesc' onclick="addElements('${place}','${itemType}',${quantity},['${type[0]}',${type[1]},${type[2]}],'titleDesc')">Title desc</button>
        <button id='dateAsc' onclick="addElements('${place}','${itemType}',${quantity},['${type[0]}',${type[1]},${type[2]}],'dateAsc')">Date acc</button>
        <button id='dateDesc' onclick="addElements('${place}','${itemType}',${quantity},['${type[0]}',${type[1]},${type[2]}],'dateDesc')">Date desc</button>
    </div>
    `;
    mainContainer.innerHTML+="<section id='elements-container' class='flex-row flex-wrap'></section>"
    if(type[0]==="loadMore"){
        mainContainer.innerHTML+=`<div id="loadMoreContainer"></div> `; 
        secondLoadNumber = type[1];
    }
    if(!order){
        orderName = standardSort
    }else{
        orderName = order
    }
    if(orderName==="hide"){
        mainContainer.querySelector(".sort-buttons").classList.add("hide")
        urlOrder=titleAsc
    }else{
        if(orderName === "titleAsc"){
            order = titleAsc
            urlOrder = titleAsc
        }else if(orderName ==="titleDesc"){
            urlOrder = titleDesc
        }
        else if(orderName ==="dateAsc"){
            urlOrder = dateAsc
        }
        else if(orderName ==="titleDesc"){
            urlOrder = dateDesc
        }
        mainContainer.querySelector(`#${orderName}`).classList.add("selected-sort")
    }
    
    let container = mainContainer.querySelector("#elements-container")
    if(type[0]==="slider" && window.innerWidth> 900){
        container.classList.add("slider")
        loadExtra = 800/150
        slider=true;
        maxElements = type[1]
    }
  
    for(let i = 0 ; i < loadExtra && i < maxElements ; i++){
            container.innerHTML+=`<div class="loading-card ${mainTemplate}"></div>`;
    }
    
    const loadMoreContainer = mainContainer.querySelector("#loadMoreContainer")
    const elements = await getApi(apiUrl,[perPage+quantity,urlOrder]);

    
    if(slider){
        container.innerHTML=`${sliderButtonsTemplate()}`;
    }else{
        container.innerHTML=""
    }
    // let startSkip = 0
    // let newSkip = 0
    renderElements(elements,0)
    async function renderElements(elements,skipNumber){
        let addNumber = skipNumber;
        let moreToLoad = true
        
        for (let i = skipNumber; i < quantity + skipNumber + loadExtra -1 ; i++) {
            const card = document.createElement('div');
            if(addNumber===elements.length && slider){
                addNumber = 0;
            }
            const element = elements[addNumber];
            if(!element){
                moreToLoad=false;
                break;
            }
            
            if(itemType==="products"){
                card.className = productMainClasses();
                card.innerHTML = productTemplate(element)
                card.addEventListener("click", () => quickView(element));
            }
            if(itemType==="blogs"){
                card.className = blogMainClasses();
                card.innerHTML = blogTemplate(element)
                card.addEventListener("click", () => {
                    localStorage.setItem('speedLoad', JSON.stringify(element));
                    location.href=`blogPage.html?id=${element.id}`;
                });
            }
            if(itemType==="wide-blogs"){
                card.className = wideBlogMainClasses();
                card.innerHTML = wideBlogTemplate(element);
                card.addEventListener("click", () => {
                    localStorage.setItem('speedLoad', JSON.stringify(element));
                    location.href=`blogPage.html?id=${element.id}`;
                });
            }

        container.appendChild(card);
        addNumber++
        }
        if(slider){
            checkSlider(mainContainer.id,maxElements,type[2])
            //newSkip = startSkip+addNumber
        }
        if(loadMoreContainer){
            loadMoreContainer.innerHTML=""
            if(moreToLoad){
                loadMoreContainer.innerHTML=`<button id="loadMoreButton">load more</button> `
                const loadMoreElements = await getApi(apiUrl,[perPage+secondLoadNumber,order]);
                mainContainer.querySelector("#loadMoreButton").addEventListener("click",()=>renderElements(loadMoreElements,addNumber))
            }
        }
    }
}

function resizeCheck(container){


}