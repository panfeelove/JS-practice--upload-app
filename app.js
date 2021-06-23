import {upload} from './upload.js';
import firebase from 'firebase/app'
import 'firebase/storage'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDsBCm9UmrkWxbzV3KVFM8Vo7R6_BTGD08",
    authDomain: "practice-upload.firebaseapp.com",
    projectId: "practice-upload",
    storageBucket: "practice-upload.appspot.com",
    messagingSenderId: "720025428679",
    appId: "1:720025428679:web:71ca0ce0a3fa444e8ed4e2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const storage = firebase.storage();

upload('#file' , {
    multi:true,
    accept:['.png','.jpg','.jpeg','.gif'],
    onUpload(files,blocks){
        files.forEach((file,index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file);

            task.on('state_changed',snapshot => {
                const percentage = ((snapshot.bytesTransferred/snapshot.totalBytes)*100).toFixed(0) + '%';
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage;
                block.style.width = percentage;
            }, error=>{
                console.error(error);
            },()=>{
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log(url);
                })
            })
        });
    }
});