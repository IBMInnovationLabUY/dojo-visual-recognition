var watson = require('watson-developer-cloud');
var fs = require('fs');
var visual_recognition = watson.visual_recognition({
 api_key: '507d8824e898d272961f7b5f7a63ff4de056868e',
 version: 'v3',
 version_date: '2016-05-19'
});
var params = {
	name: 'dog',
	beagle_positive_examples: fs.createReadStream('./public/resource/beagle.zip'),
	husky_positive_examples: fs.createReadStream('./public/resource/husky.zip'),
	golden_retriever_positive_examples: fs.createReadStream('./public/resource/golden-retriever.zip'),
	negative_examples: fs.createReadStream('./public/resource/cats.zip')
};
visual_recognition.createClassifier(params,function(err, response) {
	if (err)
			console.log(err);
	else
			console.log(JSON.stringify(response, null, 2));
});