var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'TU_APIKEY'
});

var params = {
  name: 'dogs',
  beagle_positive_examples: fs.createReadStream('./public/resource/beagle.zip'),
  goldenretriever_positive_examples: fs.createReadStream('./public/resource/golden-retriever.zip'),
  husky_positive_examples: fs.createReadStream('./public/resource/husky.zip'),
  negative_examples: fs.createReadStream('./public/resource/cats.zip')
};

visualRecognition.createClassifier(params,
  function (err, response) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(response, null, 2))
  });








  