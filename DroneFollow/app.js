const {
	cv
} = require('./utils');
const { runVideoFaceDetectionFromCenter } = require('./commons');
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const webcamPort = 0;

function detectFaces(img) {
  const options = {
  	minSize: new cv.Size(100, 100),
  	scaleFactor: 1.2,
  	minNeighbors: 3
  };
  return classifier.detectMultiScale(img.bgrToGray(), options).objects;
}

runVideoFaceDetectionFromCenter(webcamPort, detectFaces);