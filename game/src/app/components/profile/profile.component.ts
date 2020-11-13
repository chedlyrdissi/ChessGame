import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LogInService } from '@auth/log-in/log-in.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	edit: boolean = false;
	username: string = '';
  file;

  constructor(private logInService: LogInService, private httpClient: HttpClient) {
    this.username = this.logInService.getUsername();
  }

  changePictureSubmit(e): boolean {
  	console.log(e);
    e.preventDefault();
    let pic = e.target[1].files[0];
    
    const formData = new FormData();
    formData.append('profilePic', pic, ''+this.logInService.getId()+'.'+pic.type.substring(pic.type.lastIndexOf('/')+1));
    formData.append('id', ''+this.logInService.getId());
    formData.append('username', this.logInService.getUsername());
    formData.append('updatedUsername', this.username);
    
    const body = {
      id: this.logInService.getId(),
      username: this.logInService.getUsername(),
      updatedUsername: this.username,
      profilePic: pic
    };

    this.httpClient.post('http://127.0.0.1:5000/profile', formData).subscribe(
      (data)=>{console.log(data)},
      (error)=>{console.log(error)});

  	return false;
  }

  pickPicture(picture): void {
    picture.click();
  }

  editProfile(e): void {
  	this.edit = true;
  }

  pictureUploaded(event) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.file = event.target.result;
    };
    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  preventSubmit(event): boolean {
    return event.code !== 'Enter';
  }
}
