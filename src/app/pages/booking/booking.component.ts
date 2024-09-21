import { Component, inject } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { IApiResponseModel, IProperty, site } from '../../model/master';
import { MasterService } from '../../services/master.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  siteId: number = 0;
  sites$: Observable<site[]> = new Observable<site[]>();
  propertyList: IProperty[] = [];
  bookingList: any[] = [];
  bookingForm: FormGroup = new FormGroup({});
  currentPropertyId: number = 0;

  mastersrc = inject(MasterService);
  constructor() {
    this.sites$ = this.mastersrc.getALLSite().pipe(map((res: IApiResponseModel) => {
      return res.data;
    }));
    this.initializedForm();
  }


  initializedForm() {
    this.bookingForm = new FormGroup({
      bookingId: new FormControl(0),
      propertyId: new FormControl(this.currentPropertyId),
      bookindDate: new FormControl(''),
      bookingRate: new FormControl(0),
      totalAmont: new FormControl(0),
      custId: new FormControl(0),
      name: new FormControl(''),
      mobile: new FormControl(''),
      emailid: new FormControl(''),
      address: new FormControl(''),
    })
  }

  openModal(data: IProperty) {
    this.currentPropertyId = data.propertyId;
    this.initializedForm();
    const model = document.getElementById('model');

    if (model) {
      model.style.display = 'block';
    }
  }
  closeModal() {
    const model = document.getElementById('model');

    if (model) {
      model.style.display = 'none';
    }
  }

  checkIfPropertyAviable(id: number) {
    const record = this.bookingList.find(m => m.propertyId == id);
    if (record != undefined) {
      return record
    } else {
      return null;
    }
  }

  getProperties(event: Event) {
    this.getAllPropertyBookingBySiteId();
    this.mastersrc.getGetAllPropertyBySiteId(this.siteId).subscribe((res: IApiResponseModel) => {
      this.propertyList = res.data;
    })
  }

  saveBooking() {
    this.mastersrc.saveBooking(this.bookingForm.value).subscribe((res: IApiResponseModel) => {
      if (res.result) {
        alert("Saved Booking");
        this.getAllPropertyBookingBySiteId();
      }
      else {
        alert(res.message);
      }
    })
  }

  getAllPropertyBookingBySiteId() {
    this.mastersrc.getAllPropertyBookingBySiteId(this.siteId).subscribe((res: IApiResponseModel) => {
      this.bookingList = res.data;
    });
  }
}
