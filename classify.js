var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');
var visual_recognition = new VisualRecognitionV3({
	version: '2018-03-19',
	iam_apikey: 'TU_APIKEY'
  });
var images_file= fs.createReadStream('./public/resource/dogs.jpg');
var  classifier_ids = ['ID_CLASIFICADOR']
var threshold = 0.6;

var params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold,
	//url : "http://www.kutya-tar.hu/kutyak1/golden-retriever/golden-retriever.jpg"
};

visual_recognition.classify(params, function(err, res) {
	console.log(res)
	 if (err)
		 console.log(err);
	 else
		 console.log(JSON.stringify(res, null, 2));
});






