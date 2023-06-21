import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  allFiles: File[] = [];

  constructor(private http: HttpClient) {}


  droppedFiles(allFiles: File[]): void {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = allFiles[i];
      this.allFiles.push(file);
    }
    this.uploadFiles(allFiles);
  }

  uploadFiles(files: File[]): void {
    const formData = new FormData();
  
    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  
    // Make the HTTP request to upload the files
    this.http.post('http://localhost:3000/user', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if(event?.loaded && event.total){
            const percentDone = Math.round((100 * event.loaded) / event.total);
            console.log(`Upload progress: ${percentDone}%`);
          }
          
          
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload complete');
          // Handle the response after the upload is complete
        }
      });
  }

  uploadImage(file: File): void {
    const formData = new FormData();
    formData.append('image', file);
  
    // Make the HTTP request to upload the image
    this.http.post('http://localhost:3000/user', formData)
      .subscribe(response => {
        // Handle the response after the upload is complete
        console.log('Upload complete', response);
      });
  }
  
  
}
