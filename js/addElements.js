//console.log("product.js")

async function addElements(place,headline,itemType,displayQuantity,type,order) {
    let loadMore = false;
    let slider = false;
    let loadExtra = 0;
    let apiUrl
    let urlOrder
    let orderName
    
    const  mainContainer = document.querySelector(`#${place}`)
    let secondLoadNumber
    let maxElements = 999
    mainContainer.innerHTML=""
    loadNumber = displayQuantity;
    mainContainer.classList.add("topline-added")
    //missing info and errorhandling
    if(!type){
        type=["",999,999]
    }
    if(!order){
        order=["",""]
    }
    if(window.innerWidth<900){
        type = ["loadMore",12]
        displayQuantity = 6
        console.log("mobile version")
        window.addEventListener("resize", ()=> {
            resizeCheck("mobile",window.innerWidth)
        }); 
    }
    const functionLog = [place,headline,itemType,displayQuantity,type,order]

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

    mainContainer.innerHTML += `${cardSection(functionLog,headline)}`
    
    
    if(type[0]==="loadMore"){
        secondLoadNumber = type[1];
        loadMore=true;

    }
    if(order[0]===""){
        orderName = standardSort
    }else{
        orderName = order[0]
    }
    if(order[1]==="hide"){
        mainContainer.querySelector(".sort-buttons").classList.add("hide")
    }
    mainContainer.querySelector(`#${orderName}`).classList.add("selected-sort")
    if(orderName === "titleAsc"){
        urlOrder = titleAsc
    }else if(orderName ==="titleDesc"){
        urlOrder = titleDesc
    }
    else if(orderName ==="dateAsc"){
        urlOrder = dateAsc
    }
    else if(orderName ==="dateDesc"){
        urlOrder = dateDesc
    }

    let container = mainContainer.querySelector("#elements-container")
    if(type[0]==="slider" && window.innerWidth> document.body.clientWidth + 50){
        container.classList.add("slider")
        loadExtra = document.body.clientWidth/150
        slider=true;
        maxElements = displayQuantity
        apiLoadQuantity = type[1]
        
        for(let i = 0 ; i < loadExtra && i < maxElements ; i++){
            container.innerHTML+=`<div class="loading-card ${mainTemplate}"></div>`;
        }
    }else{
        apiLoadQuantity=displayQuantity
        for(let i = 0 ; i < displayQuantity ; i++){
            container.innerHTML+=`<div class="loading-card ${mainTemplate}"></div>`;
        }
    }
    let loadMoreElements
    let addNumber
    const elements = await getApi(apiUrl,[perPage+displayQuantity,urlOrder]);


        

    if(slider){
        container.innerHTML=`${sliderButtonsTemplate()}`;
    

    }else{
        container.innerHTML=""
    }  
    renderElements(elements,(elements.length),itemType)
    if(slider){
        const allElements = await getApi(apiUrl,[perPage+apiLoadQuantity,urlOrder]);
        
        renderElements(allElements,(allElements.length+loadExtra),itemType,displayQuantity)
    }

    addFunctions()
    mainContainer.classList.add("fully-loaded")

    async function renderElements(elements,quantity,itemType,skipNumber){
        if(!skipNumber){skipNumber=0;}
        console.log(itemType,elements.length)
        addNumber=skipNumber
        for (let i = skipNumber; i < quantity + skipNumber  ; i++) {
            const card = document.createElement('div');
            card.setAttribute('tabindex', '0');
            if(slider && addNumber===elements.length){
                addNumber = 0;
            }
            const element = elements[addNumber];
            if(!element){
                break;
            }
            if(itemType==="products"){
                card.className = productMainClasses();
                card.innerHTML = productTemplate(element)
                //card.addEventListener("click", () => quickView(element));
            }
            if(itemType==="blogs"){
                card.className = blogMainClasses();
                card.classList.add("tabindex='0'")
                card.innerHTML = blogTemplate(element)
                
            }
            if(itemType==="wide-blogs"){
                card.className = wideBlogMainClasses();
                card.innerHTML = wideBlogTemplate(element);
                
            }
            
            container.appendChild(card);
            addNumber++
            if(!elements[addNumber] && loadMore && skipNumber >0){

                mainContainer.querySelector("#loadMoreContainer").innerHTML=""
            }
            card.addEventListener('click',()=>goToPage(itemType,element))
            card.addEventListener('keydown', function (event) {
                if (event.keyCode === 13) {
                    goToPage(itemType,element)
                }
            });
        }
    }
    async function addFunctions(){
        if(slider){
            checkSlider(mainContainer.id,maxElements,type[2])
        }

        if(loadMore){  
            const loadMoreContainer = mainContainer.querySelector("#loadMoreContainer")
            
            if(!loadMoreElements){
                loadMoreElements = await getApi(apiUrl,[perPage+secondLoadNumber,urlOrder]);
            }

            if(loadMoreElements.length>addNumber){
                loadMoreContainer.innerHTML=""
                loadMoreContainer.innerHTML=`<button id="loadMoreButton" >load more</button> `
                mainContainer.querySelector("#loadMoreButton").addEventListener("click",()=>renderElements(loadMoreElements,displayQuantity,itemType,addNumber))
            }
        }
        //To keep sort buttons disabled to after load
        allButons = mainContainer.querySelectorAll("button");
        allButons.forEach(element => {
            element.disabled=false;
        });
        mainContainer.classList.add("loaded")
    }
}
function goToPage(itemType,element){
    localStorage.setItem('speedLoad', JSON.stringify(element));
    if(itemType==="blogs" || itemType==="wide-blogs"){  
        location.href=`blogPage.html?id=${element.id}`;
    }else if(itemType==="products"){
        location.href=`productPage.html?id=${element.id}`;
    }
}
function resizeCheck(changeFrom,width){
    if(changeFrom==="mobile" && width>900){
        console.log("change to pc")
    }
}
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
                newHtml=`<a href='${element.terms[0].name}' target='_blank'><img class="link-logo" src='https://prototype.meeplegalaxy.com/wp-content/uploads/2023/11/BoardGameGeek_Logo.svg_.png'></a>`
            }
        }
    });
    return newHtml;
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
