/*
Blob Object
This object was adapted from Daniel Shiffman's Processing blob detection algorithm
found in https://github.com/CodingTrain/website/blob/master/Tutorials/Processing/11_video/sketch_11_7_BlobTracking/Blob.pde
*/

function Blob(x,y) {

  //the variables below where added to detect the center of each data point

    this.minX = x;
    this.minY = y;
    this.maxX = x;
    this.maxY = y;


  this.show = function() {
    stroke(255,255,0);
    noFill();
    strokeWeight(2);
    rectMode(CORNERS);
    rect(this.minX, this.minY, this.maxX, this.maxY);
  };

  this.addPixels = function(x,y) {
    this.minX = min(this.minX, x);
    this.minY = min(this.minY, y);
    this.maxX = max(this.maxX, x);
    this.maxY = max(this.maxY, y);
    this.centerX=((this.minX+this.maxX)/2);
    this.centerY=((this.minY+this.maxY)/2);

  };

  this.size = function() {
    return (this.maxX-this.minX)*(this.maxY-this.minY);
  };

  this.isNear = function(x, y) {
    let cX = (this.minX + this.maxX) / 2;
    let cY = (this.minY + this.maxY) / 2;

    //var d = distSq(cX, cY, x, y);
    var d =(cX-x)*(cX-x) + (cY-y)*(cY-y);


    //console.log(d);
    if (d < distThreshold*distThreshold) {
      return true;
    } else {
      return false;
    }
  };
}
