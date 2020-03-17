import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/_models/image';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { TicketService } from 'src/app/_services/ticket.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Ticket } from 'src/app/_models/ticket';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-ticket-images',
  templateUrl: './ticket-images.component.html',
  styleUrls: ['./ticket-images.component.css']
})
export class TicketImagesComponent implements OnInit {
  @Input() images: Image[];
  ticket: Ticket;
  userId: number;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private ticketService: TicketService, private alertify: AlertifyService,
              private authService: AuthService) {
    this.userId = parseInt(this.authService.decodedToken.nameid, 10);
    this.ticket = this.ticketService.ticketShare;
    this.uploader = new FileUploader({
      url: this.baseUrl + 'tickets/' + this.ticket.id + '/images',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.hasBaseDropZoneOver = false;

    this.uploader.onSuccessItem = (item, response) => {
      if (response) {
        const res: Image = JSON.parse(response);
        const image = {
          id: res.id,
          publicId: res.publicId,
          ticketId: res.ticketId,
          url: res.url
        };
        this.images.push(image);
      }
    };
  }
  ngOnInit() {

  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  deleteImage(id: number) {
    this.alertify.confirm('Are you sure?', () => {
      this.ticketService.deleteImage(id).subscribe(() => {
        this.images.splice(this.images.findIndex(i => i.id === id), 1);
        this.alertify.success('Image has been deleted');
      }, error => {
        this.alertify.error('Failed to delete image');
      });
    });
  }
}
