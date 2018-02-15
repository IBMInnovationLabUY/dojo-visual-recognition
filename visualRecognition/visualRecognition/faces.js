var watson = require('watson-developer-cloud');
var fs = require('fs');
var visual_recognition = watson.visual_recognition({
  api_key: '507d8824e898d272961f7b5f7a63ff4de056868e',
  version: 'v3',
  version_date: '2016-05-20'
});

var params = {
  images_file: fs.createReadStream('./public/resource/prez.jpg')
};

visual_recognition.detectFaces(params,
  function(err, response) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(response, null, 2))
  });