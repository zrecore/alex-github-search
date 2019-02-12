/** ... HTTP Request utility **/
// Gleaned from https://medium.freecodecamp.org/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa
let Http = function () {};

Http.get = function(url, callback, stateHandler) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  
  request.onreadystatechange = (e) => {
    // A successful request! HTTP 200, and the request is marked as complete.
    if (request.readyState == 4 && request.status == 200 && typeof callback != 'undefined') {
      callback(request);
    } else {
      // ...Ah, seems we had a state change.
      if (typeof stateHandler != 'undefined') {
        stateHandler(e, request);
      }
    }
  };
};
