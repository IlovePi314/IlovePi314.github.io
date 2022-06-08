// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var row = 0; row < image.length; row++) {
    for (var col = 0; col < image[col].length; col++) {
      var rgbString = image[row][col]
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers)
      image[row][col] = rgbString
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  var backgroundcolor = image[0][0]
  for (var row = 0; row < image.length; row++) {
    for (var col = 0; col < image[col].length; col++) {
      var rgbString = image[row][col]
      var rgbNumbers = rgbStringToArray(rgbString);
      if (backgroundcolor != rgbString){
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers)
      image[row][col] = rgbString}
    }
  }

}

// TODO 5: Create the keepInBounds function
function keepInBounds(maybe){
    maybe = Math.max(maybe, 0)
    maybe = Math.min(maybe, 255)
    return maybe;
  }


// TODO 3: Create reddify function
function reddify(yes) {
yes[RED] = 200
}

// TODO 6: Create more filter functions
function decreaseBlue(perhaps){
perhaps[BLUE] = keepInBounds(perhaps[BLUE] - 50 );
}
function increaseGreenByBlue(no){
no[GREEN] = keepInBounds(no[BLUE] + no[GREEN])
}
// CHALLENGE code goes below here
