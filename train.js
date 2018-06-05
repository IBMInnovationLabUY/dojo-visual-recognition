var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'TU_APIKEY'
});

var params = {
  name: 'dogs',
  beagle_positive_examples: fs.createReadStream('./beagle.zip'),
  goldenretriever_positive_examples: fs.createReadStream('./golden-retriever.zip'),
  husky_positive_examples: fs.createReadStream('./husky.zip'),
  negative_examples: fs.createReadStream('./cats.zip')
};

visualRecognition.createClassifier(params,
  function (err, response) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(response, null, 2))
  });