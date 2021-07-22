"use strict";

let bigHex = document.getElementById("bigHex");

function makeGrid() {
  let edgeWidth = 4;
  let stop = 8;
  let startNum = 0;

  //top section
  for (let cols = edgeWidth; cols < stop; cols++) {
    bigHex.appendChild(buildRow(cols, startNum, "top", cols == edgeWidth, false));
    startNum += cols;
  }

  //middle row
  bigHex.appendChild(buildRow(stop, startNum, "middle", false, false));
  startNum += stop;

  for (let cols = stop - 1; cols >= edgeWidth; cols--) {
    bigHex.appendChild(buildRow(cols, startNum, "bottom", false, cols == edgeWidth));
    startNum += cols;
  }
}
//build a single attritube that contains all the data data-neighbours="7,11,4"
function buildRow(cols, startNum, section, isTopEdge, isBottomEdge) {
  let row = document.createElement("div");
  row.classList.add("cellHolder");

  // for (let c = cols; c > 0; c--)
  for (let c = 0; c < cols; c++) {
    let id = c + startNum;

    var cellDiv = document.createElement("div"); //make a div to contain each image and letter
    cellDiv.setAttribute("id", "c" + id);
    cellDiv.classList.add("cellDiv");
    row.appendChild(cellDiv);

    //var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let svg = oneHexagon();
    cellDiv.appendChild(svg);

    let letter = document.createElement("label");
    letter.setAttribute("id", "l" + id);

    letter.classList.add("cellLetter");
    cellDiv.appendChild(letter);

    //empty array to hold the neighbours
    let n = [];

    if (c != 0) {
      // img.setAttribute("data-left",id -1)  // wil be ID number ...do we get rid of code that makes it
      n.push(id - 1);
    }
    // we need to push id+1 into the array
    // img.setAttribute("data-right",id +1)
    if (c < cols - 1) {
      n.push(id + 1);
    }

    //deal with diagonal neighbours

    let isFirstColumn = c == 0;
    let isLastColumn = c == cols - 1;

    if (section == "top") {
      n.push(id + cols); //Below left
      n.push(id + cols + 1); //below Right
      if (!isFirstColumn && !isTopEdge) {
        n.push(id - cols); //Above left
      }
      if (!isLastColumn && !isTopEdge) {
        n.push(id - cols + 1); //Above right
      }
    } else if (section == "middle") {
      if (!isFirstColumn && !isTopEdge) {
        n.push(id - cols); //Above Left
      }
      if (!isLastColumn && !isTopEdge) {
        n.push(id - cols + 1); //Above right
      }
      if (!isFirstColumn && !isTopEdge) {
        n.push(id + cols - 1); //Below Left
      }
      if (!isLastColumn && !isTopEdge) {
        n.push(id + cols); //Below right
      }
    } else if (section == "bottom") {
      n.push(id - cols); //Below left
      n.push(id - cols - 1); //below Right

      if (!isLastColumn && !isBottomEdge) {
        n.push(id + cols); //Below right
      }
      if (!isFirstColumn && !isBottomEdge) {
        n.push(id + cols - 1); //Above right
      }
    }
    //ADD STRING C TO DATA-NEIGHBOURS
    // option 1
    // for(let i=0;i<n.length;i++){
    // 	n[i]="C"+n[i];
    // }
    //option 2
    // n.forEach(function(element, index) {
    // 	n[index] = 'C' + element;
    // });
    //option 3
    n = n.map((i) => "c" + i);

    cellDiv.setAttribute("data-neighbours", n.join(","));
  }
  return row;
}

function oneHexagon() {
  var points = 6;
  // How large should it be
  var radius = 30;
  // 0 to 2PI is a circle, so divide that by the number of points
  // in our object and that's how many radians we should put a new
  // point in order to draw the shape
  var angle = (2 * Math.PI) / points;
  const hex = [];
  const Point = ({ x, y }) => ({
    x: x,
    y: y,
  });
  // For as many vertices in the shape, add a point
  for (let i = 0; i < points; i++) {
    // Add a new point to the object
    hex.push(
      // Radius * Math.cos(number of radians of the point) is the x position
      Point({
        x: radius + radius * Math.cos(angle * i),
        // And the same thing with Math.sin for the y position of the point
        y: radius + radius * Math.sin(angle * i),
      })
    );
  }
  console.log(hex);
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //Ugly 'secret sauce' required for making SVG elements (without it - they don't render properly)
  svg.setAttribute("width", "75px");
  svg.setAttribute("heigth", "75px");
  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon"); //Ugly 'secret sauce' required for making SVG elements (without it - they don't render properly)
  polygon.setAttribute(
    "points",
    `${hex[0].x} ${hex[0].y},${hex[1].x} ${hex[1].y},${hex[2].x} ${hex[2].y},${hex[3].x} ${hex[3].y},${hex[4].x} ${hex[4].y},${hex[5].x} ${hex[5].y}`
  );
  polygon.setAttribute("stroke", "#D2D54C");
  polygon.setAttribute("stroke-width", "3");
  svg.appendChild(polygon);
  return svg;
}

makeGrid();

//let images = document.getElementsByTagName("img")[0];

// attributes()

// let imgs = document.getElementsByTagName('img');  //To the look will give them each an IDThis is to give each hex an ID using IMG //seperate funtion.This will always give any element an ID regardless of its use.
// for (let i = 0, length = imgs.length; i < length; i++) {
// 	imgs[i].setAttribute("id", i);
// }
