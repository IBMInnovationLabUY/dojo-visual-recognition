/**
 * http://usejsdoc.org/
 */
var watson = require('watson-developer-cloud');
var fs = require('fs');
var StringBuffer = require('stringbuffer');
var classification = null;
var faces = null;
var objects = null;
var http = require('http'); 
var waterfall = require('async-waterfall');
var series = require('async-series')
var params = {
		 api_key: 'b7010ad3c9006babc5b43585db581a82df507795',
		 url : "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/first-family/44_barack_obama%5B1%5D.jpg"
};

var visual_recognition = new watson.VisualRecognitionV3({
	 api_key:  params.api_key, 
	 version_date: '2016-05-20'
	});

waterfall([
	(cb) => {cb(null,params)},
	generateJsonDescription,
	imageDescription], (err,res) => {
	if (err)
		console.log('Error: ',err)
	else
		console.log(String(res))
});
 	

function generateJsonDescription(params,cb){
		visual_recognition.classify(params, (err, response) => {
		 if (err) {
			 console.log('error:', err);
			 if (typeof callback !== 'undefined' && typeof callback=="function") 
				 classification = callback(err);
			 }
		 else {
			 classification = JSON.stringify(response, null, 2);
			 classification = JSON.parse(classification)
			 if (typeof callback !== 'undefined' && typeof callback=="function") 
				 return callback(response);
		 }
		});
		visual_recognition. detectFaces (params, (err, response) => {
			if (err) {
				 console.log('error:', err);
				 if (typeof callback !== 'undefined' && typeof callback=="function") 
					 return callback(err);
			}else {
				faces = JSON.stringify(response, null, 2);
				faces = JSON.parse(faces);
				cb(null,classification,faces)
				if (typeof callback !== 'undefined' && typeof callback=="function") 
					return callback(response);
			}
		})
}


function facesContentDescription(faces, numberOfFaces){
	var n;
	var persons = new StringBuffer();
	var numberOfImage = faces.images.length;
	 for(var j = 0; j < numberOfImage; j++){
     	for(var i = 0; i < numberOfFaces; i++){
     		var face = faces.images[j].faces[i];
     	
            		try {
            		
            			if(!face.hasOwnProperty("identity")){
            				n=i+1;
            				persons.append("\n  -"+ n +":");
            				persons.append("Person can't be identified, but is ");
            				
			    	}
            			else{ 
            				persons.append("\n\t -Is ");
            				persons.append(face.identity.name);
            				
            				persons.append("\n\t -Area of work :");
            				persons.append(faceidentity.type_hierarchy); 
			    		}
            			persons.append(" \n\t -A ");
        				persons.append(face.gender.gender);
        				persons.append("\n\t -And between ");
        				persons.append(face.age.min);
        				persons.append(" and ");
        				persons.append(face.age.max);
        				persons.append(" years old");
		} catch (err) {
			persons.append(err);
		}
     persons.append("\n");
    }
   }
 	return persons;
 }

 /**
  * generate Information of Objects detected 
  * 
	 * @argument objects JsonObjects 
	 * @argument numberobjects is number of objects to process
	 * 
	 * @return StringBuffer a description of objects detected
 */
 function objectContentDescription(objects, numberOfObjects){
  /**
  *  objectdes a text image description 
  */
	var objectdes = new StringBuffer(); 
  /**
  *  get number of images processed
  */
	var numberOfImage = objects.images.length;
	objectdes.append("\n");
	for(var j=0; j<numberOfImage;j++){
		for(var i=0; i<numberOfObjects;i++){      	
	   		try {
	   			objectdes.append("\n \t-" + objects.images[0].classifiers[0].classes[i]['class']);
	    	} catch (err) {
				objectdes.append(err);
			}
	    objectdes.append("\n");
	    } 
	}
	return objectdes;
}
 /**
  * Function to generate image description using the two functions facesContentDescription and objectContentDescription
  * @return StringBuffer a image description
  */

function imageDescription(classification,faces, cb){
 	var imageContentDescription = new StringBuffer()
 	/**
 	 *  to convert classification and faces to JsonObjects
 	 */
 	// faces = JSON.stringify(eval("(" + faces + ")"));
  //  objects=JSON.stringify(eval("(" + classification + ")"));
    var numberOfObjects=classification.images[0].classifiers[0].classes.length;
 	var numberOfFaces = faces.images[0].faces.length;
     
     
     /**
      *  call facesContentDescription function if image contains a persons
      */
     if(numberOfFaces!=0){
     	imageContentDescription.append(numberOfFaces+ " persons :");
     	imageContentDescription.append(facesContentDescription(faces,numberOfFaces));
     	imageContentDescription.append("\n");
     }
     if(numberOfObjects!=0){
       	imageContentDescription.append(numberOfObjects).append(" objects");
       	imageContentDescription.append(objectContentDescription(classification,numberOfObjects));
       }
       
     cb(null,imageContentDescription); 
    
 }

// 	System.out.println("To  display percentage of confidence of these information press any key on keyboard");
// 	Scanner sc = new Scanner(System.in);
// 	String  w=sc.next();
 	//System.out.println("--------- JSON Format ------------");
 	//System.out.println(content.getDetectedFaces());
 	//System.out.println(content.getVisualClassification());		
