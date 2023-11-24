async function infoPageRender(place,type){
  console.log(place,type)
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  let element;
  let template;
  let speedLoadElement = []
  speedLoadElement = JSON.parse(localStorage.getItem('speedLoad'))
  document.querySelector(`#${place}`).classList.add("full-height")
  if(id===JSON.stringify(speedLoadElement.id)){
    console.log('speedLoad')
    element = speedLoadElement
  }else{
    if(type==="blog"){
      element = await getApi(blogsUrl+"/"+id);
    }else if(type==="product"){
      element = await getApi(productsUrl+"/"+id);
    }
  }
  console.log(element)
  if(element){
    if(type==="blog"){
      template = blogPageTemplate(element)
    }else if(type==="product"){
      template = productPageTemplate(element);
    }
    
    renderPage(place,template)

    function renderPage(place,template){
      document.querySelector(`#${place}`).innerHTML=`${template}`;
      addModalClick(document.querySelectorAll(".image"))
    }
  }
}


