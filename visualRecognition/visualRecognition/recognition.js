var parameters = {
		"apikey" : "507d8824e898d272961f7b5f7a63ff4de056868e",
		"url" : "https://www.audi.es/dam/nemo/models/model-navigation/my-2018/a8/820x315_navigation_flyout_a8_side.jpg"
};

var watson = require('watson-developer-cloud');
var fs = require('fs');

var http = require('http');

var visual_recognition = new watson.VisualRecognitionV3({
 api_key: parameters.apikey, //SET YOUR API KEY
 version_date: '2016-05-20'
});
visual_recognition.classify(parameters, (err, response) => {
 if (err) {
	 console.log('error:', err);
	 if (typeof callback !== 'undefined' && typeof callback=="function")
		 return callback(err);
 }
 else {
	 console.log(JSON.stringify(response, null,2));
	 if (typeof callback !== 'undefined' && typeof callback=="function")
		 return callback(response);
 }
});