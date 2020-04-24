const {
  cv,
  grabFrames,
  drawBlueRect
} = require('./utils');
const util = require('util')
// const loadFacenet = require('../dnn/loadFacenet');
// const { extractResults } = require('../dnn/ssdUtils');

exports.runVideoFaceDetection = (src, detectFaces) => grabFrames(src, 1, (frame) => {
  console.time('detection time');
  const frameResized = frame.resizeToMax(800);

  // detect faces
  const faceRects = detectFaces(frameResized);
  if (faceRects.length) {
    // draw detection
    faceRects.forEach(faceRect => drawBlueRect(frameResized, faceRect));
  }

  cv.imshow('face detection', frameResized);
  console.timeEnd('detection time');
});

exports.runVideoFaceDetectionFromCenter = (src, detectFaces) => grabFrames(src, 1, (frame) => {
  console.time('detection time');
  const frameResized = frame.resizeToMax(800);

  const drawParams = Object.assign(
    {},
    { thickness: 2 },
    { color: new cv.Vec(255, 255, 0) }
    )

  // detect faces
  var dirX = 0;
  var dirY = 0;
  const faceRects = detectFaces(frameResized);
  if (faceRects.length) {
    // draw detection
    faceRects.forEach(faceRect => 
    {
      drawBlueRect(frameResized, faceRect);
      frameResized.drawLine(new cv.Point(frameResized.cols/2, frameResized.rows/2), new cv.Point(faceRect.x + faceRect.width/2, faceRect.y + faceRect.height/2));
      dirX = (faceRect.x + faceRect.width / 2) - (frameResized.cols / 2);
      dirY = (faceRect.y + faceRect.height / 2) - (frameResized.rows / 2);
    });
  }

  if (dirX > 10) {
    cv.drawTextBox(frameResized, { x: 10, y: 10 }, [{ text: "X: RIGHT", fontSize: 0.5, thickness: 1 }], 0);
  }
  else if (dirX < -10) {
    cv.drawTextBox(frameResized, { x: 10, y: 10 }, [{ text: "X: LEFT", fontSize: 0.5, thickness: 1 }], 0);
  }
  else {
    cv.drawTextBox(frameResized, { x: 10, y: 10 }, [{ text: "X: STAY", fontSize: 0.5, thickness: 1 }], 0);
  }

  if (dirY > 10) {
    cv.drawTextBox(frameResized, { x: 10, y: 60 }, [{ text: "Y: DOWN", fontSize: 0.5, thickness: 1 }], 0);
  }
  else if (dirY < -10) {
    cv.drawTextBox(frameResized, { x: 10, y: 60 }, [{ text: "Y: UP", fontSize: 0.5, thickness: 1 }], 0);
  }
  else {
    cv.drawTextBox(frameResized, { x: 10, y: 60 }, [{ text: "Y: STAY", fontSize: 0.5, thickness: 1 }], 0);
  }

  cv.imshow('face detection', frameResized);
  console.timeEnd('detection time');
});

// function classifyImg(net, img) {
//   // facenet model works with 300 x 300 images
//   const imgResized = img.resizeToMax(300);

//   // network accepts blobs as input
//   const inputBlob = cv.blobFromImage(imgResized);
//   net.setInput(inputBlob);

//   // forward pass input through entire network, will return
//   // classification result as 1x1xNxM Mat
//   let outputBlob = net.forward();
//   // extract NxM Mat
//   outputBlob = outputBlob.flattenFloat(outputBlob.sizes[2], outputBlob.sizes[3]);

//   return extractResults(outputBlob, img);
// }

// exports.makeRunDetectFacenetSSD = function() {
//   const net = loadFacenet();
//   return function(img, minConfidence) {
//     const predictions = classifyImg(net, img);

//     predictions
//     .filter(res => res.confidence > minConfidence)
//     .forEach(p => drawBlueRect(img, p.rect));

//     return img;
//   }
// }
