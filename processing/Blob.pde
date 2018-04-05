/*
Blob Class

This Class is part of Daniel Shiffman's blob detection algorithm
found in https://github.com/CodingTrain/website/blob/master/Tutorials/Processing/11_video/sketch_11_7_BlobTracking/Blob.pde
*/

class Blob {
  float minx;
  float miny;
  float maxx;
  float maxy;
  //the variables below where added to detect the center of each data point
  float centerx;
  float centery;

  Blob(float x, float y) {
    minx = x;
    miny = y;
    maxx = x;
    maxy = y;
  }

  void show() {
    stroke(255,255,0);
    noFill();
    strokeWeight(2);
    rectMode(CORNERS);
    rect(minx, miny, maxx, maxy);
  }

  void add(float x, float y) {
    minx = min(minx, x);
    miny = min(miny, y);
    maxx = max(maxx, x);
    maxy = max(maxy, y);
    centerx=((minx+maxx)/2);
    centery=((miny+maxy)/2);
    
  }
  
  float size() {
    return (maxx-minx)*(maxy-miny); 
  }

  boolean isNear(float x, float y) {
    float cx = (minx + maxx) / 2;
    float cy = (miny + maxy) / 2;

    float d = distSq(cx, cy, x, y);
    if (d < distThreshold*distThreshold) {
      return true;
    } else {
      return false;
    }
  }
}
