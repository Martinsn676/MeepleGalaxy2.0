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

function cardSection(functionLog,headline){
  return `
    <div id="topLine">
      <div class="flex-cloumn"> 
          <h2>${headline}</h2>
          <div id="showingInfo"></div>
      </div>
      <div id="sortButtonsID" class="sort-buttons flex-row no-wrap">
          ${addSortButton(functionLog,'titleAsc','Title Az')}
          ${addSortButton(functionLog,'titleDesc','Title Za')}
          ${addSortButton(functionLog,'dateAsc','Latest')}
          ${addSortButton(functionLog,'dateDesc','Oldest')}
      </div>
    </div>

    <section id='elements-container' class='flex-row flex-wrap'>
    </section>

    <div id="bottomLine">
        <div id="loadMoreContainer" class="full-width align-column flex-column">
        </div>  
    </div>
  `
}
/* ==== Products ==== */
function productMainClasses(){return `
  card product-card flex-row`;}
function productTemplate(element){return `
    <div class="contain-image" style="background-image: url('${element.images[0].src}')"></div>
    <div class="flex-column info-text">
      <div>${element.name}</div>
      <span>${addAttributes("pc",element)} </span>
      <span>${addAttributes("pt",element)} </span>
      <h6 class="showOnHower">Go to</h6>
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

function addSortButton(log, order, orderName) {
    return `
      <button type="button" disabled="true" id='${order}' onclick="sortButtonClick('${log[0]}', '${log[1]}', '${log[2]}', ${log[3]}, ['${log[4][0]}', ${log[4][1]}, ${log[4][2]}], '${order}')">${orderName}</button>
    `;
}

function sortButtonClick(param1, param2, param3, param4, param5, order) {
  //To prevent button jump on page
  
  const scrollPosition = window.scrollY;
  addElements(param1, param2, param3, param4, param5, [order]);
  window.scrollTo(0, scrollPosition);
}