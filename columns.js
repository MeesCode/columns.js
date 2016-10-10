
/**
 * @param id    id of div to apply to
 * @param width width of columns
 * @param gap   size of gap between images
 */
function columns(id, width, gap){
  var div = document.getElementById(id);
  var elements = div.getElementsByTagName("img");
  div.style.position = "relative";

  //calculate amount of columns
  var columns = Math.floor((div.offsetWidth + gap) / (width + gap));
  if(columns == 0){
    columns = 1;
  }

  //initialize an array to keep track of heights
  var heights = new Array();
  for(var i = 0; i < columns; i++){
    heights.push(0);
  }

  //apply position changes
  for(var i in elements){
    var curImg = elements[i];
    curImg.style.width = width;
    curImg.style.position = "absolute";
    var column = getLowest(heights);
    curImg.style.left = (column * width + column * gap);
    curImg.style.top = heights[column];
    heights[column] += getImgHeight(curImg.src, width) + gap;
  }
}

//get the height of a particular image after width has been changed
function getImgHeight(path, width){
  var img = new Image();
  img.src = path;
  var resize = width / img.width;
  img.style.width = width;
  return Math.round(img.height * resize);
}

//get index of lowest value of an array
function getLowest(heights){
  var min = Number.MAX_VALUE;
  var index = 0;
  for(var i in heights){
    if(heights[i] < min){
      min = heights[i];
      index = i;
    }
  }
  return index;
}
