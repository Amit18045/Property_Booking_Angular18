import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IApiResponseModel, IProperty, IPropertyType, site } from '../../model/master';
import { map, Observable } from 'rxjs';
import { MasterService } from '../../services/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PropertyRead } from '@angular/compiler';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {


  propertyForm: FormGroup = new FormGroup({});
  mastersrv = inject(MasterService);
  isFormView = signal<boolean>(true);
  propertType$: Observable<IPropertyType[]> = new Observable<IPropertyType[]>;
  siteList: any[] = [];
  @ViewChild('propertyModel') model: ElementRef | undefined;
  currentSideId: number = 0;

  propertyList: IProperty[] = [];

  constructor() {
    this.propertType$ = this.mastersrv.getAllPropertyType().pipe(
      map((item: IApiResponseModel) => {
        return item.data
      })
    );
    this.initializedForm();
  }
  ngOnInit(): void {
    this.getSite();
  }
  initializedForm() {
    this.propertyForm = new FormGroup({
      propertyId: new FormControl(0),
      propertyNo: new FormControl(''),
      facing: new FormControl(''),
      totalArea: new FormControl(''),
      rate: new FormControl(''),
      siteId: new FormControl(this.currentSideId)
    })
  }
  formObj: site = new site();

  toggleView() {
    this.isFormView.set(!this.isFormView());
  }

  openModal(data: site) {

    this.currentSideId = data.siteId;
    this.initializedForm();
    this.getALlProperty();
    if (this.model) {
      this.model.nativeElement.style.display = 'block';
    }
  }
  closeModal() {
    if (this.model) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  getSite() {
    this.mastersrv.getALLSite().subscribe((res: IApiResponseModel) => {
      this.siteList = res.data;
    })
  }

  onSAVE() {
    debugger
    this.mastersrv.saveSites(this.formObj).subscribe((res: IApiResponseModel) => {
      if (res.result) {
        alert("saved Site");
        this.toggleView();
        this.getSite();
      } else {
        alert(res.message);
      }
    })
  }
  onEdit(data: site) {
    this.formObj = data;
    this.toggleView();
  }

  onUpdateSite() {
    this.mastersrv.updateSites(this.formObj).subscribe((res: IApiResponseModel) => {
      if (res.result) {
        alert("Update Site");
        this.getSite();
        this.toggleView();
      } else {
        alert(res.message);
      }
    })
  }
  onDelete(data: any) {
    const isDeleted = confirm("Are you want to delete this");
    if (isDeleted) {
      this.mastersrv.deleteSite(data.siteId).subscribe((res: IApiResponseModel) => {
        if (res.result) {
          alert("deleted site");
          this.getSite();

        }
        else {
          alert(res.message);
        }
      })
    }
  }

  onSaveProperty() {
    this.mastersrv.saveProperty(this.propertyForm.value).subscribe((res: IApiResponseModel) => {
      if (res.result) {
        alert("data saved");
        this.getALlProperty();
      }
      else {
        alert(res.message);
      }
    })
  }


  getALlProperty() {
    this.mastersrv.getAllProperty().subscribe((res: IApiResponseModel) => {
      this.propertyList = res.data.filter((m: any) => m.siteId == this.currentSideId);
    })
  }


}
