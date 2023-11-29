//console.log("product.js")
 
async function addElements(place,headline,itemType,displayQuantity,type,order) {
    
   
    let loadExtra = 0;
    let apiUrl
    let urlOrder
    let orderName
    let addNumber
    let secondLoadNumber
    let maxElements = 999
    let allElements
    let products = false;
    let blogs = false;
    let wideBlogs = false;
    let slider = false;
    let loadMore = false;

    if(itemType==="products"){products=true;}
    if(itemType==="blogs"){blogs=true;}
    if(itemType==="wide-blogs"){wideBlogs=true;}
    if(type[0]==="slider"){slider=true;}
    if(type[0]==="loadMore"){loadMore=true;}

    //missing info and errorhandling
    if(!type){type=["",999,999]}
    if(!order){order=["",""]}
  
    const functionLog = [place,headline,itemType,displayQuantity,type,order]
    const  mainContainer = document.querySelector(`#${place}`)
    mainContainer.innerHTML = `${cardSection(functionLog)}`;
    const container = mainContainer.querySelector("#elements-container")
    
    // alpha, mobile version instead
    if(slider && window.innerWidth<900){
        type = ["loadMore",12]
        slider = false;
        loadMore = true;
        displayQuantity = 6
        console.log("mobile version")
        window.addEventListener("resize", ()=> {
            resizeCheck("mobile",window.innerWidth)
        }); 
        mainContainer.classList.add("display-section","mobile")
    }else{
        window.addEventListener("resize", ()=> {
            resizeCheck("pc",window.innerWidth)
        }); 
        mainContainer.classList.add("display-section","pc")
    }

    // handling template absed on product type
    if(products){
        mainTemplate = productMainClasses();
        apiUrl = productsUrl;
        
    }
    if(blogs){
        mainTemplate = blogMainClasses();
        apiUrl = blogsUrl;
    }
    if(wideBlogs){
        mainTemplate = wideBlogMainClasses();
        apiUrl = blogsUrl;
    }
    mainContainer.querySelector("#sortButtonsID").innerHTML+=`
        ${addSortButton(functionLog,[['titleAsc','Title Az'],['titleDesc','Title Za'],['dateDesc','Newest'],['dateAsc','Oldest']])}
    `;

    // handling sorting
    if(order[0]===""){
        orderName = standardSort
    }else{
        orderName = order[0]
    }
    if(order[1]==="hide"){
        mainContainer.querySelector(".sort-buttons").classList.add("hide")
    }
    // marking the selected sort
    const selectedSort = mainContainer.querySelector(`#${orderName}`)
    if(selectedSort){selectedSort.classList.add("selected-sort")}

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
    if(type[0]==="loadMore"){
        secondLoadNumber = type[1];
        loadMore=true;
    }
    if(slider && window.innerWidth> document.body.clientWidth + 50){
        container.classList.add("slider")
        loadExtra = document.body.clientWidth/150
        slider=true;
        maxElements = displayQuantity
        apiLoadQuantity = type[1]

    // add loading-templates    
        for(let i = 0 ; i < loadExtra && i < maxElements ; i++){
            container.innerHTML+=`<div class="loading-card ${mainTemplate}"></div>`;
        }
    }else{
        apiLoadQuantity=displayQuantity
        for(let i = 0 ; i < displayQuantity ; i++){
            container.innerHTML+=`<div class="loading-card ${mainTemplate}"></div>`;
        }
    }
    // api call what is first viewed
    const elements = await getApi(apiUrl,[perPage+displayQuantity,urlOrder]);
    if(elements){
        // reset container ebfore adding the real data
        if(slider){
            container.innerHTML=`${sliderButtonsTemplate()}`;
        }else{
            container.innerHTML=""
        } 
        renderElements(elements,(elements.length),itemType)

        // add slider funcitons and load more button, including loading extra elements
        addFunctions()

        // mark container as fully loaded
        mainContainer.classList.add("fully-loaded")
    }
    
    async function renderElements(elements,quantity,itemType,skipNumber,searching){
        let inSearch = false;
        let elementName

        if(searching && searching[0]==="searching"){
            inSearch = true
            searchResultContainer = document.querySelector("#search-container")
            searchResultContainer.innerHTML=""
            searchResultContainer = document.querySelector("#search-container")

        }
        if(!skipNumber){skipNumber=0;}
        addNumber=skipNumber

        
        for (let i = skipNumber; i < quantity   ; i++) {
       

            if(slider && addNumber===elements.length){
                addNumber = 0;
            }
            const element = elements[addNumber];
            if(!element){
                break;
            }
            if(inSearch){
                if(searching[1]===""){
                    break;
                }
                if(products){
                        elementName = element.name
                    }else{
                        elementName = element.title.rendered
                    }
                
                if(searchSkipCheck(element,elementName,searching[1])){
                    addNumber++
                    continue;
                }

            }
            
            
            const card = document.createElement('div');
            if(products){
                card.className = productMainClasses();
                card.innerHTML = productTemplate(element)
            }
            if(blogs){
                card.className = blogMainClasses();
                card.innerHTML = blogTemplate(element)
            }
            if(wideBlogs){
                card.className = wideBlogMainClasses();
                card.innerHTML = wideBlogTemplate(element);
                
            }
            // add mouse click function
            card.addEventListener('click',()=>goToPage(itemType,element))
            // add keyboard click
            card.setAttribute('tabindex', '0');

            card.addEventListener('keydown', function (event) {
                if (event.keyCode === 13) {
                    goToPage(itemType,element)
                }
            });
            card.addEventListener('focus', function() {
                quickView(element);
                window.scrollTo(0, 0);
            });
            
                
            if(inSearch){
                console.log("b")
                searchResultContainer.appendChild(card);
            }else{
                container.appendChild(card);
            }
            addNumber++
            // hide load-more button if showing all
            if(loadMore){
                if(!elements[addNumber] && skipNumber >0){
                    mainContainer.querySelector("#loadMoreContainer").innerHTML=""
                }
                //mainContainer.querySelector("#showingInfo").innerHTML=`Showing ${addNumber} of `
            }
           
                
            
            
        }
    }
    async function addFunctions(){
        
        if(slider){
            allElements = await getApi(apiUrl,[perPage+apiLoadQuantity,urlOrder]);
            renderElements(allElements,(allElements.length+loadExtra),itemType,addNumber)
            checkSlider(mainContainer.id,maxElements,type[2])
        }
        if(loadMore){  
            const loadMoreContainer = mainContainer.querySelector("#loadMoreContainer")
            allElements = await getApi(apiUrl,[perPage+secondLoadNumber,urlOrder]);
            if(allElements.length>addNumber){
                const skipNumber = addNumber
                loadMoreContainer.innerHTML=""
                loadMoreContainer.innerHTML=`<button id="loadMoreButton" >load more</button> `
                mainContainer.querySelector("#loadMoreButton").addEventListener("click",()=>renderElements(allElements,allElements.length,itemType,skipNumber))
            }
        }
        //To keep sort buttons disabled to after load
        allButons = mainContainer.querySelectorAll("button");
        allButons.forEach(element => {
            element.disabled=false;
        });
         
        if(searchField){
            function updateSearch(allElements,search){
                
                renderElements(allElements,allElements.length,itemType,0,['searching',search])
            }  
            document.querySelector("#search-input").addEventListener('keyup', function (){
                const scrollPosition = window.scrollY;
                
                updateSearch(allElements,this.value)
                window.scrollTo(0, scrollPosition);
            });
        }
    }

}
function goToPage(itemType,element){
    localStorage.setItem('speedLoad', JSON.stringify(element));
    if(itemType==="blogs" || itemType==="wide-blogs"){  
        location.href=`blogPage.html?id=${element.id}`;
    }else if(itemType==="products"){
        quickView(element)
        
    }
}
function resizeCheck(changeFrom,width){
    if(changeFrom==="mobile" && width>900){
        console.log("change to pc")
        location.reload();
    }
    if(changeFrom==="pc" && width<900){
        console.log("change to mobile")
        location.reload();
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

function quickView(element) {
    const quickViewContainer = document.querySelector(".quickView-container")
    if(quickViewContainer){
        
        quickViewContainer.innerHTML = `${quickViewTemplate(element)}`;
        quickViewContainer.scrollIntoView({
          });
        addModalClick(document.querySelectorAll(".big-card .image"))
    }else{
        location.href=`productPage.html?id=${element.id}`;
    }

}
function searchSkipCheck(elementName,search){
                if(elementName.toLowerCase().includes(search.trim().toLowerCase())){
                    return false;
                }else{
                    return true;
                }
            }