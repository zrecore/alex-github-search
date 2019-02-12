/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

let searchForm = document.getElementById('search_form');
let searchQuery = document.getElementById('search_github');

searchQuery.focus();
searchQuery.select();

searchForm.addEventListener('submit', (ev) => {
  console.log("Potato sent.");
  
  ev.preventDefault();
  return false;
});

console.log("Loaded Potato.", searchQuery);