
/**
 * Call this on your div to change the layout of the elements within.
 * You can also set at most one parameter to be null,
 * that one will then be generated automatically.
 * @param id        id of div to apply to
 * @param width     width of columns
 * @param gap       size of gap between images
 * @param columns   amount of columns
 */
function columns(id, width, gap, columns){

  var div = document.getElementById(id);
  var elements = div.getElementsByTagName("img");
  div.style.position = "relative";

  //calculate missing values
  if(width == null){
    var width = (div.offsetWidth - gap * (columns - 1)) / (columns);
  }
  if(gap == null){
    var gap = (div.offsetWidth - columns * width) / (columns - 1);
  }
  if(columns == null){
    var columns = Math.floor((div.offsetWidth + gap) / (width + gap));
    if(columns <= 0){
      columns = 1;
    }
    width = (div.offsetWidth - gap * (columns - 1)) / (columns);
  }

  //initialize an array to keep track of heights
  var heights = new Array();
  for(var i = 0; i < columns; i++){
    heights.push(0);
  }

  //apply position changes
  for(var i in elements){
    var curImg = elements[i];
    curImg.style.width = width + "px";
    curImg.style.position = "absolute";
    var column = getLowest(heights);
    curImg.style.left = (column * width + column * gap) + "px";
    curImg.style.top = heights[column] + "px";
    heights[column] += getImgHeight(curImg.src, width) + gap;
  }

  //get the height of a particular image after width has been changed
  function getImgHeight(path, width){
    var img = new Image();
    img.src = path;
    var resize = width / img.width;
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
}
