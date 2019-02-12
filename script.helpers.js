/** A set of helper functions to keep me happy. **/
function removeClass(classList, classMatch)
{
  classList.remove(classMatch);
}

function addClass(classList, className)
{
  console.log('classList is', classList);
  classList.add(className);
}

export {addClass, removeClass};