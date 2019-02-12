/** Import my bare-metal js code **/
import {Http} from './script.http.js';
import {Observable} from './script.observable.js';
import {addClass, removeClass} from './script.helpers.js';
  

/** App variables **/
let app_page_index = 1; // What page of results are we on
let app_items_per_page = 30; // GitHub User Search API defaults to 30 items per page.

/** Observables **/
let queryResultObservable = new Observable();
let appPageIndexObservable = new Observable();

/** DOM event handling **/
let searchForm = document.getElementById('search_form');
let searchQuery = document.getElementById('search_github');
let searchResults = document.getElementById('search_results');

/** App logic **/
let onReady = () => {
  // Automatically select the search query input!
  searchQuery.focus();
  searchQuery.select();
  
  // Subscribe to observables.
  let queryResultHandler = (data) => {
    console.log('queryResultHandler', data);
    console.log('Am-I-Hired-Yet query requested.');
    
    if (data.total_count > 0)
    {
      // Get the search results ready!
      let total_pages = Math.ceil(data.total_count / app_items_per_page);
      let paginator_template = `<a href="#first">First</a> | <a href="#previous">Prev.</a> | ${app_page_index}/${total_pages} | <a href="#next">Next</a> | <a href="#last">Last</a>`;
      let search_records = '';
      
      data.items.forEach((item) => {
        search_records += `<div class="item search_record span-6"><a href="${item.html_url}" target="_blank"><img class="avatar" src="${item.avatar_url}"></a><a href="${item.html_url}" target="_blank">${item.login}</a></div>`;
      });

      searchResults.innerHTML = `<div class="item span-6 search_result_summary">Total pages: ${total_pages} - <em>${app_items_per_page} results per page, ${data.total_count} total results.<em></div>`;
      searchResults.innerHTML += `<div class="item span-6">${paginator_template}</div>`;
      searchResults.innerHTML += search_records;

      let searchResultSummary = document.querySelector('.search_result_summary');
      
      // @TODO finish adding event handlers for pagination controls.
    } else {
      // No results.
      searchResults.innerHTML = '<div class="item span-6 search_result_summary"><em>No Results.</em></div>';
    }
    
    // Show time.
    removeClass(searchResults.classList, 'hide');
  };
  
  let appPageIndexHandler = (data) => {
    console.log('appPageIndexHandler', data);
    console.log(`More-Qualified-Than-A-Potato is ${app_page_index}.`);
  };

  // When a query result comes back, we want to run our query result handler. Subscribe it.
  queryResultObservable.subscribe(queryResultHandler);
  
  // When the app page index changes, we want to run our app page index handler, so let's subscribe.
  appPageIndexObservable.subscribe(appPageIndexHandler);

  // Set up our search form.
  searchForm.addEventListener('submit', (ev) => {
    let query = 'https://api.github.com/search/users?q=';
    
    // Hide the previouse search, clear it out.
    addClass(searchResults.classList, 'hide');
    searchResults.innerHTML = '';
    
    // Grab the user's search query, URI encode it, and append to the base query string.
    query += encodeURIComponent(searchQuery.value);
    query += '&page=' + app_page_index;

    Http.get(query, (request) => {
      // Got a request!
      let data = JSON.parse(request.responseText);

      // Alright, run our observable so subscribers are called!
      console.log("HTTP GET OK!");
      queryResultObservable.run(data);
      
    }, (error, request) => {
      // Beep Boop. State changed.
      if (request.status !== 200) {
        console.log("State change!", error, request);
      } // Meh. We should probably do a bit more handling, but its 3am and I'm tired. I'll get around to it...eventually
    });
    console.log("I-Need-A-Job sent.");

    ev.preventDefault();
    return false;
  });

  console.log("Loaded I-Need-A-Job.", searchQuery);
}

// Run once the document is ready for us.
window.document.addEventListener('DOMContentLoaded', onReady);
console.log("Loading...");