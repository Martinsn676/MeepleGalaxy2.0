const sliderItemWidth = window.innerWidth/150;
const maxSliderElements = 5
const productsUrl = "https://prototype.meeplegalaxy.com/wp-json/wc/store/products";
const perPage = "per_page="

const blogsUrl = "https://prototype.meeplegalaxy.com/wp-json/wp/v2/posts";

let standardOrder = "orderby=title&order=asc";

async function getApi(url,endUrlInfo) {
  let endUrl = "?"
  if(endUrlInfo){
    endUrlInfo.forEach(element => {
      endUrl+=element+"&"
    });
  }
  try {
    const result = await fetch(url + endUrl);
    const json = await result.json();
    const data = await json;
    return data;
  } catch (err) {
    document.querySelector("main").innerHTML = "We are sorry, we couldn't connect with the server";
    console.log("getApi error:" + err +" when trying to load: "+url + endUrl);
  }
}
function checkSlider(id) {
  let sliderItems;
  let sliderContainer = document.querySelector(`#${id}.slider`);
  let showNumber = 0;
  if(sliderContainer){   
    function updateSlider(adjust, items) {
      let count = 0;
      let maxShow = window.innerWidth/150;
      if(showNumber+adjust<items.length-maxShow){
        showNumber += adjust; 
      }else{
        showNumber = 0;
      }
      if(showNumber<0){
        showNumber = items.length-maxShow-1;
      }
      for (let i = 0; i < items.length; i++) {
        items[i].classList.add("hidden-slider");
        if(i > showNumber-1 && count<maxShow && count < maxSliderElements){
            items[i].classList.remove("hidden-slider");
            count++
        }
      }   
    }
    sliderItems = document.querySelectorAll(`#${id} .card`);
    document.querySelector(`#${id} .left-slider`).addEventListener("click", () => updateSlider(-1, sliderItems));
    document.querySelector(`#${id} .right-slider`).addEventListener("click", () => updateSlider(1, sliderItems));
    updateSlider(0, sliderItems)
  }
}

function displayModal(element){
  const modal = document.querySelector("#modal")
  if(modal){
    document.querySelector("#modal-image").innerHTML=`${element.target.outerHTML}`
    modal.classList.remove("hide-modal")
    modal.querySelector("#modal-background").addEventListener("click",()=>{
      modal.classList.add("hide-modal")
    });
  }
}

function addModalClick(item){ 
  item.forEach(element => {
    element.addEventListener("click", (element)=>{
      displayModal(element)
    });
  });
}

function cleanData(data){
  const div = document.createElement('div');
  div.innerHTML=data;
  const cleanData = div.innerText;
  return cleanData
}
