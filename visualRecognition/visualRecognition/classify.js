var watson = require('watson-developer-cloud');
var fs = require('fs');
var visual_recognition = watson.visual_recognition({
 api_key: '507d8824e898d272961f7b5f7a63ff4de056868e',
 version: 'v3',
 version_date: '2016-05-20'
});
var params = {
 images_file: fs.createReadStream('./public/resource/Testing/clips/prueba_30.jpg'),
 classifier_ids: ["ondulines_15_1874105531", "clips_897720982","arandelas_2_15_1176909888","Tornillos_2_15_1150427122", "Clavos_2_15_1517853282"]
};
visual_recognition.classify(params, function(err, res) {
	console.log(res)
	 if (err)
		 console.log(err);
	 else
		 console.log(JSON.stringify(res, null, 2));
});
