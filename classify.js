var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');
var visual_recognition = new VisualRecognitionV3({
	version: '2018-03-19',
	iam_apikey: 'TU_APIKEY'
  });
var images_file= fs.createReadStream('./public/resource/dogs.jpg');
var  classifier_ids = ['ID_CLASSIFICADOR']
var threshold = 0.6;

var params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold,
	//url : "https://www.audi.es/dam/nemo/models/model-navigation/my-2018/a8/820x315_navigation_flyout_a8_side.jpg"
};

visual_recognition.classify(params, function(err, res) {
	console.log(res)
	 if (err)
		 console.log(err);
	 else
		 console.log(JSON.stringify(res, null, 2));
});
