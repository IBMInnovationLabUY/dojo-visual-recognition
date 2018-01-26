
/**
 * package name
 */
package visualRecognition;

/**
 * input output package for manage files
 */
ivmport java.io.File;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ibm.watson.developer_cloud.visual_recognition.v3.VisualRecognition;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ClassifyImagesOptions;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.DetectedFaces;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.VisualClassification;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.VisualRecognitionOptions;
//to convert visualCalassification and DetectedFaces object to JsonObject
//Classto use VisualRecognition service and its routine


/**
 * The ImageContentDescription class implements an application that
 * displays image content description of an input image.
 */

public class ImageContentDescription {
	/**
	 * file to load image 
	 */
	private  File image=null;
	/**
	 * DetectesFaces object used to storage faces description
	 */
	private  DetectedFaces faces=null;
	/**
	 * VisualClassification object used to storage faces description
	 */
	private  VisualClassification classification=null;
	
    
	/**
	 * Empty Class constructor
	 */
	public ImageContentDescription(){
		
	}
	/**
	 * function set image to attribute image 
	 */
	public void setImage(File image){
		this.image=image;
	}
	 /**
	  * Function to get classification object
	  * @return classification
	  */
	public VisualClassification getVisualClassification() { return classification;}
    
	/**
	 * Function to get  VisualClassification object
	 * @return DetectedFaces object
	 */
	public DetectedFaces getDetectedFaces() {return faces;}
    
	/**
	 * generateJsonDescription function uses the both routines of VisualRecognition service to generate 
	 * Information of faces detected and to Identify faces celebrity
	 * objects classification
	 * 
	 * @argument filename is a String that represents path of image file  will be processed
	 */
    
    public void generateJsonDescription(String filename){

    	
    	/**
    	 *  Image file will be processed
    	 */
    	image = new File(filename);
    	
    	/**
    	 * Instantiate VisualRecognition service
    	 */
    	VisualRecognition service = new VisualRecognition(VisualRecognition.VERSION_DATE_2016_05_20);
    	/**
    	 * Below you should add your Api-key obtained by creation of visualRecognition service on Bluemix
    	 * Something like 5e6ab7ec53fa58ca8592f6691ba760c18ff895e5
    	 */
 	    service.setEndPoint("https://gateway-a.watsonplatform.net/visual-recognition/api");
 	    service.setApiKey("57dee0529bc9ec013b1412401114e3d7c72f4caf");
 	    
 	    /**
 	     * Instantiate ClassifyImageOptions argument that will be used as argument of classify function of VisualRecogniton class
 	     */
 	    ClassifyImagesOptions classifyImagesOptions = new ClassifyImagesOptions.Builder().images(image).build();
 	    
 	    /**
 	     * Instantiate VisualRecognitionOptions that will be used as argument of detectFaces function of VisualRecogniton class
 	     */
        VisualRecognitionOptions recognitionOptions = new VisualRecognitionOptions.Builder().images(image).build();
        
        /**
         * Call function classify to generate classification object
         */
        this.classification = (VisualClassification)service.classify(classifyImagesOptions).execute();
        
        /**
         * Call function classify to generate classification object
         */
        this.faces = (DetectedFaces)service.detectFaces(recognitionOptions).execute();  
       
    }
    
    
    /**
     * generate Information of faces detected and Identify faces celebrity
     * 
	 * @argument faces JsonObjects 
	 * @argument  numberfaces number of faces to process
	 * @return StringBuffer a description of faces detected
	 * 
    */
    public StringBuffer facesContentDescription(JsonObject faces, int numberfaces){
    

    	int n;
        /**
         * persons a StringBuffer image description  
         */
        StringBuffer persons=new StringBuffer("");
        
        /**
         *  get number of images processed
         */
        int numberimage=faces.get("images").getAsJsonArray().size(); 
       
        for(int j=0; j<numberimage;j++){
        	for(int i=0; i<numberfaces;i++){
        		JsonObject face = faces.get("images").getAsJsonArray().get(j).getAsJsonObject().get("faces").getAsJsonArray().get(i).getAsJsonObject();
        	
               		try {
               		
               			if(!face.has("identity")){
               				n=i+1;
               				persons.append("\n  -"+ n +":");
               				persons.append("Person can't be identified, but is ");
               				
			    	}
               			else{ 
               				persons.append("\n\t -Is ");
               				persons.append(face.get("identity").getAsJsonObject().get("name").getAsString());
               				
               				persons.append("\n\t -Area of work :");
               				persons.append(face.get("identity").getAsJsonObject().get("type_hierarchy").getAsString()); 
			    		}
               			persons.append(" \n\t -A ");
           				persons.append(face.get("gender").getAsJsonObject().get("gender").getAsString());
           				persons.append("\n\t -And between ");
           				persons.append(face.get("age").getAsJsonObject().get("min").getAsString());
           				persons.append(" and ");
           				persons.append(face.get("age").getAsJsonObject().get("max").getAsString());
           				persons.append(" years old");
		} catch (Exception e) {
			persons.append(e.getMessage());
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
    public StringBuffer objectContentDescription(JsonObject objects, int numberobjects){
    	
    	    
        /**
         *  objectdes a text image description 
         */
        StringBuffer objectdes=new StringBuffer("");
        
        /**
         *  get number of images processed
         */
        int numberimage=objects.get("images").getAsJsonArray().size(); 
                
        for(int j=0; j<numberimage;j++){
        	for(int i=0; i<numberobjects;i++){      	
               		try {
			    		objectdes.append(" \n\t -").append(objects.get("images").getAsJsonArray().get(0).getAsJsonObject().get("classifiers").getAsJsonArray().get(0).getAsJsonObject().get("classes").getAsJsonArray().get(i).getAsJsonObject().get("class").getAsString());
           	
               		 }catch (Exception e) {
						objectdes.append(e.getMessage());
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

    public StringBuffer imageDescription(){
    	    	StringBuffer imageContentDescription=new StringBuffer();
    	
    	/**
    	 *  to convert classification and faces to JsonObjects
    	 */
    	JsonParser parser = new JsonParser();
    	
        JsonObject faces=parser.parse(this.getDetectedFaces().toString()).getAsJsonObject();
        
        JsonObject objects=parser.parse(this.getVisualClassification().toString()).getAsJsonObject();
        
        int numberfaces=faces.get("images").getAsJsonArray().get(0).getAsJsonObject().get("faces").getAsJsonArray().size();
        
        int numberobjects=objects.get("images").getAsJsonArray().get(0).getAsJsonObject().get("classifiers").getAsJsonArray().get(0).getAsJsonObject().get("classes").getAsJsonArray().size();
        
        /**
         *  call facesContentDescription function if image contains a persons
         */
        if(numberfaces!=0){
        	imageContentDescription.append(numberfaces+ " persons :");
        	imageContentDescription.append(this.facesContentDescription(faces,numberfaces));
        	imageContentDescription.append("\n");
        }
        if(numberobjects!=0){
        	imageContentDescription.append(numberobjects).append(" objects");
        	imageContentDescription.append(this.objectContentDescription(objects,numberobjects));
        }
    return imageContentDescription;
    }
    /**
     * main function 
     * 
     */ 
    public static void main(String[] args){
    	String imagepath="prez.jpg";
    	ImageContentDescription content=new ImageContentDescription();
    	content.generateJsonDescription(imagepath);
    	System.out.println(content.imageDescription());
    	
//    	System.out.println("To  display percentage of confidence of these information press any key on keyboard");
//    	Scanner sc = new Scanner(System.in);
//    	String  w=sc.next();
    	System.out.println("--------- JSON Format ------------");
    	System.out.println(content.getDetectedFaces());
    	System.out.println(content.getVisualClassification());

    	}  		
}

