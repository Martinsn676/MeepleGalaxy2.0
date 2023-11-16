async function infoPageRender(place,type){
  
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  let element;
  let template;
  let speedLoadElement = []
  speedLoadElement = JSON.parse(localStorage.getItem('speedLoad'))

  if(id===JSON.stringify(speedLoadElement.id)){
    element = speedLoadElement
    if(type==="blog"){
      template = blogPageTemplate(element)
      renderPage(place,template)
    }else if(type==="product"){
      template = productPageTemplate(element);
      renderPage(place,template)
    }else{
      document.querySelector(`#${place}`).innerHTML=`type of "${type} is unknown`
    }
  }else{
    if(type==="blog"){
      element = await getApi(blogsUrl+"/"+id);
      template = blogPageTemplate(element)
      renderPage(place,template)
    }else if(type==="product"){
      element = await getApi(productsUrl+"/"+id);
      template = productPageTemplate(element);
      renderPage(place,template)
    }else{
      document.querySelector(`#${place}`).innerHTML=`type of "${type} is unknown`
    }
  }
  function renderPage(place,template){
    document.querySelector(`${place}`).innerHTML=`${template}`;
    addModalClick(document.querySelectorAll(".image"))
  }

}


