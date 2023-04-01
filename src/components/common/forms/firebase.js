import {
	firebase,
	storage,
	database,
} from "../../../utils/configs/firebaseConfig";
import { v4 as uuid } from "uuid";


export default function FireBase(doc,companyId){
    const storageRef = firebase.storage()
    const stor= storageRef.ref();
	const uploadTask = stor
		.child(`ApplicationForm/${uuid()}`)
		.put(doc);
    console.log(companyId);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
        const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //console.log(percent)
        },
        (err) => console.log(err),
        () => {
      
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {           
        
    const msgToAdd = {
        applicationForm: downloadURL,
    };
    //console.log(msgToAdd);

    console.log(companyId);
    database.collection("CompanyProfile")
        .doc(companyId)
        .update({
                Form: firebase.firestore.FieldValue.arrayUnion({
                    ...msgToAdd,
                })
            
                })
                });
                });        
    console.log(4);     
} 
        
    
    

