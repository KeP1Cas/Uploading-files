import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload'

const firebaseConfig = {
    apiKey: "AIzaSyCLOUAxOKMxHZK_bgogqS6bW9SwL--Yrv8",
    authDomain: "uploading-files-abf9a.firebaseapp.com",
    projectId: "uploading-files-abf9a",
    storageBucket: "uploading-files-abf9a.appspot.com",
    messagingSenderId: "1092629808189",
    appId: "1:1092629808189:web:b765b56766d3ac84fcd654"
  }
  
  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage()
  

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`imahes/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error);
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL ', url);
                })
            })
        })
    } 
})