/* ==== Header ==== */
function headerTemplate(){return `
<div class="links-passive flex-row align-row lazy-margin">    
    <a href="index.html">
      <img class="link-logo" src="https://prototype.meeplegalaxy.com/wp-content/uploads/2023/11/logo_wide_b73121fc-20a9-4cbc-b723-f7f21b51c4ee.png">
    </a>
    <div class="headerLinks">
      <a id="homeLink" href="index.html">Home</a>
      <a id="shopLink" href="shop.html">Shop</a>
      <a id="blogLink" href="blogs.html">Blogs</a>
      <a id="contactLink" href="contactUs.html">Contact</a>
    </div>
</div>
  `;}

/* ==== Products ==== */
function productMainClasses(){return `
  card product-card flex-row`;}
function productTemplate(element){return `
    <div class="contain-image" style="background-image: url('${element.images[0].src}')"></div>
    <div>
    <h6>${element.name}</h6>
    <div>${addAttributes("pc",element)} </div>
    <div>${addAttributes("pt",element)} </div>
    </div>
  `;}

function quickViewTemplate (element){return `
    <div class="card big-card">
        <div class="contain-image grid1" style="background-image: url('${element.images[0].src}')">
        </div>
        <div class="grid2">
          <h6>${element.name}</h6>
          <h6>${addAttributes("dg",element)}</h6>
          <h6>${addAttributes("pc",element)} </h6>
          <h6>${addAttributes("pt",element)} </h6>
        </div>
        <div class="grid3">
          ${addAttributes("bg",element)}
        </div>
        <div class="scroll grid4">
          ${element.description}  
        </div>
    </div>
    `;}

function productPageTemplate(element){return `
    <div class="flex-row">
      <div class="contain-image blog-image image" style="background-image: url('${element.images[0].src}')"></div>  
      <h1>${element.name}</h1>
    </div>
    <p>
      ${cleanData(element.description)}
    </p>
  `;}

/* ==== Blogs ==== */
function blogMainClasses(){return`
  card blog-card flex-column`;}
function blogTemplate(element){return `
    <div>
      <h6>${cleanTime(element.date)}</h6>
      <h6>${element.title.rendered}</h6>
    </div>
      <div class="contain-image" style="background-image: url('${element.jetpack_featured_media_url}')">
    </div>
  `;}

function wideBlogMainClasses(){return`card wide-blog-card flex-column`;}
function wideBlogTemplate(element){return`
    <div class="flex-row">
      <h6>${element.title.rendered}</h6><h6>(${cleanTime(element.date)})</h6>
    </div>
    <div class="flex-row">
      <div class="contain-image image" style="background-image: url('${element.jetpack_featured_media_url}')"></div>
      <div>
        <div class="text">${cleanData(element.content.rendered)}</div>
        <div >Read more</div> 
      </div>   
    </div>
  `;}

function blogPageTemplate(element){return `
    <div class="flex-row">
      <div class="contain-image blog-image image" style="background-image: url('${element.jetpack_featured_media_url}')"></div>  
      <div cless="flex-colum">
        <h2>${cleanTime(element.date)}</h2>
        <h1>${element.title.rendered}</h1>
      </div>
    </div>
    <p>
      ${element.content.rendered}
    </p>
  `;}

function sliderButtonsTemplate(){return`
    <button class="left-slider slider-buttons"></button>
    <button class="right-slider slider-buttons"></button>
  `;}

function modalTemplate(){return`
    <div id="modal" class="hide-modal">
    <div id="modal-background"></div>
    <div id="modal-image"></div>
    </div>
    `}

function addSortButton(log,order,orderName){
    return`
      <button id='${order}' onclick="addElements('${log[0]}','${log[1]}','${log[2]}',${log[3]},['${log[4][0]}',${log[4][1]},${log[4][2]}],['${order}'])">${orderName}</button>
    `
}