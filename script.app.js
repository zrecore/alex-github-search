/* Here's my stuff from scratch. I call it "I-Need-A-Job.js". */

/** App variables **/
let app_page_index = 1; // What page of results are we on
let app_items_per_page = 30; // GitHub User Search API defaults to 30 items per page.

/** DOM event handling **/
let searchForm = document.getElementById('search_form');
let searchQuery = document.getElementById('search_github');

/** App logic **/
let onReady = () => {
  // Automatically select the search query input!
  searchQuery.focus();
  searchQuery.select();
  
  // Set up our search form.
  searchForm.addEventListener('submit', (ev) => {
    let query = 'https://api.github.com/search/users?q=';

    // Grab the user's search query, URI encode it, and append to the base query string.
    query += encodeURIComponent(searchQuery.value);

    Http.get(query, (request) => {
      // Got a request!
      let data = JSON.parse(request.responseText);

      // Alright, update our observable!
      console.log("OK!", data);
    }, (error, request) => {
      // Beep Boop. State changed.
      if (request.status !== 200) {
        console.log("State change!", error, request);
      }
    });
    console.log("I-Need-A-Job sent.");

    ev.preventDefault();
    return false;
  });
  
  // Setup our observable(s)
  let changeHandler = (item) => {
    console.log("changeHandler", item);
  };
  
  let changeObserver = new Observable();
  changeObserver.subscribe(changeHandler);
  changeObserver.run("Change 1");
  changeObserver.unsubscribe(changeHandler);
  changeObserver.run("Change 2");
  changeObserver.subscribe(changeHandler);
  changeObserver.run("Change 3");
  
  console.log("Loaded I-Need-A-Job.", searchQuery);
}

window.document.addEventListener('DOMContentLoaded', onReady);
console.log("Loading...");