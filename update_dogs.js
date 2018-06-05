var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'TU_APIKEY'
});

var params = {
  classifier_id: 'ID_CLASIFICADOR',
  dalmatian_positive_examples: fs.createReadStream('./dalmatian.zip'),
  negative_examples: fs.createReadStream('./more-cats.zip')
};

visualRecognition.updateClassifier(params,
  function (err, response) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(response, null, 2))
  });