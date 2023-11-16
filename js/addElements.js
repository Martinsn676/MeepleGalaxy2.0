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
    let slider = false;
    let loadExtra = 0;
    let apiUrl
    let container = document.querySelector(`${place}`)
    let secondLoadNumber = 20;
    loadNumber = quantity;
    if(!order){
        order=standardOrder
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
    if(type==="slider"){
        document.querySelector(`#${container.id}`).classList.add("slider")
        loadExtra = window.innerWidth/150
        slider=true;
        for(let i = 0 ; i < loadExtra && i < maxSliderElements ; i++){
            container.innerHTML+=`<div class="loading-card ${mainTemplate}"></div>`;
        }
    }else{
        for(let i = 0 ; i < quantity; i++){
            container.innerHTML+=`<div class="loading-card ${mainTemplate}"></div>`;
        }
    }
    
   
    const elements = await getApi(apiUrl,[perPage+quantity,order]);

    if(slider){
        container.innerHTML=`${sliderButtonsTemplate()}`;
    }else{
        console.log("add prev content")
        container.innerHTML=""
    }
    let startSkip = 0
    let newSkip = 0

    renderElements(elements,0)

    async function renderElements(elements,skipNumber){
        let addNumber = skipNumber;
        const loadMore = document.querySelector("#loadMore")
        for (let i = skipNumber; i < quantity + loadExtra +skipNumber ; i++) {
            console.log(i,quantity + loadExtra +skipNumber)
            if(addNumber===elements.length && type==="slider"){
                addNumber = 0;
            }
            const card = document.createElement('div');
            const element = elements[addNumber];
            if(!elements[addNumber]){
                loadMore.classList.add("hideThis")
                console.log("break")
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
        checkSlider(container.id)
        window.addEventListener("resize", () => {checkSlider(container.id)});
        newSkip = startSkip+addNumber
        
        if(loadMore){
            const loadMoreElements = await getApi(apiUrl,[perPage+secondLoadNumber,order]);
            loadMore.innerHTML=`<button id="loadmoreButton">Load more</button>`
            loadmoreButton.addEventListener("click",()=>renderElements(loadMoreElements,newSkip))
        }
            
        
    }
}