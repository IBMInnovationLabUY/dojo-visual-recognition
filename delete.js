var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'TU_APIKEY'
});

visualRecognition.deleteClassifier({
  classifier_id: 'ID_CLASIFICADOR'
});