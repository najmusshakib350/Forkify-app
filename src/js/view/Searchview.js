import { elements } from "./base.js";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = "";
};
export const clearResults = () => {
  elements.searchResult.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};
// export const highlightSelected = id => {
//     const resultsArr = Array.from(document.querySelectorAll('.results__link'));
//     resultsArr.forEach(el => {
//         el.classList.remove('results__link--active');
//     });
//    document.querySelector(`a[href*="${id}"]`) .classList.add('results__link--active');
// };

//pasta with tomato and spinach
const limitRecipeTitle = (title, limit = 17) => {
  let newTitle = [""];
  if (title.length > limit) {
      let a1 = title.split(" "); //a1=['pasta','with','tomato','and','spinach']
        a1.reduce((accumulator, current) => {
            if (accumulator + current.length <= limit) {
              newTitle.push(current);
            }
            return accumulator + current.length;
        }, 0);
        
      return `${newTitle.join(" ")}....`;
  } else {
    return title;
  }
};
const renderRecipe = (recipe) => {
  const markup = `<li>
   <a class="results__link" href="#${recipe.recipe_id}">
       <figure class="results__fig">
           <img src="${recipe.image_url}" alt="Test">
       </figure>
       <div class="results__data">
           <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
           <p class="results__author">${recipe.publisher_url}</p>
       </div>
   </a>
  </li>`;
  elements.searchResult.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === "prev" ? "left" : "right"
            }"></use>
        </svg>
    </button>
`;
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Only button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Both buttons
    button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `;
  } else if (page === pages && pages > 1) {
    // Only button to go to prev page
    button = createButton(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of currente page
 
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};
