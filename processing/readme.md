This is a computer vision color tracking program that identifies data points on a physical menstrual calendar. Part of María del Pilar Gomez Ruiz's Thesis Project for the Interactive Telecommunications Program at NYU Tisch School of the Arts

This sketch was built with the help of Sejo Vega Cebrián, using Daniel Shiffman's blob detection algorithm
found in https://github.com/CodingTrain/website/blob/master/Tutorials/Processing/11_video/sketch_11_7_BlobTracking/

This is what it does: 

It scans the picture obtained from a video captured device and answers: 
- Goes pixel by pixel asking: is this red(ish)? (the current value detected from my prototype is RGB (59, 23, 22)
- Detects all discreet data points (blobs of red items in picture)
- Counts how many data points there are (pressing `q` on the keyboard will reveal the number)
- Uses `gridLimitUp`,`gridLimitDown`, `gridLimitLeft`,`gridLimitRight` to define a measurable area and then
- Maps each data point contained within the limits defined by the variables defined above and maps them to temperature values that range from 97 to 99 degrees Farenheit


## Variable Cheatsheet
- `trackcolor` : defines which color the program will be looking out for, here the colors are currently hardcoded
- `threshold` : defines the minimum size of for a data point (an object defined in this program  of the Blob class, defined in the Blob.pde file) to be detected
- `distThreshold` :  defines the minimum space that a data point must be from another so as not to be put into the same Blob object
- `gridLimitUp`,`gridLimitDown`,`gridLimitLeft`,`gridLimitRight` : establish the area of the image the program must read in order to get the values
- `minTemp`,`max Temp` : are the temperature minimum and maximum ranges that will define the values of each data point, including decimals
- `dataPoints`: an array that stores the data points detected in the picture, uses the Blob class defined in the linked file
- `tempValues`: an array that stores the temperature values of each data point detected in the picture

## Keypresses
- `q`: reveals in console the number of data points detected in picture
- `w`: reveals in console the coordinates of each data points detected
- `a`: prints out in console the cycle day and the temperature value
