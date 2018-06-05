var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'TU_APIKEY'
});

var images_file = fs.createReadStream('./public/resource/prez.jpg')

var params = {
  images_file: images_file
};

visualRecognition.detectFaces(params, function(err, response) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(response, null, 2))
});
