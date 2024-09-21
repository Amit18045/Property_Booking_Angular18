import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { IApiResponseModel, IPropertyType } from '../../model/master';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent implements OnInit {
  form: FormGroup = new FormGroup({


  });

  mastersrc=inject(MasterService);
gridList:IPropertyType[]=[];


ngOnInit(): void {
  debugger
  this.gridDATA();
}

  constructor(){
    this.initializeForms();
  }


  gridDATA(){
    this.mastersrc.getAllPropertyType().subscribe((res:IApiResponseModel)=>{
this.gridList=res.data;
    })
  }

  initializeForms(item?: IPropertyType) {
    this.form = new FormGroup({
      propertTypeId: new FormControl<number>(item ? item.propertTypeId : 0),
      propertyType: new FormControl<String>(item ? item.propertyType : '',[Validators.required,Validators.minLength(3)])
    })
  }
  onEdit(item:IPropertyType){
   this.initializeForms(item);
}
  onSave(){
    this.mastersrc.savePropertyType(this.form.value).subscribe((res:IApiResponseModel)=>{
      if(res.result){
        alert("saved property");
        this.gridDATA();
      }
      else{
        alert(res.message);
      }
    })
  }

  onUpdateProperty(){
    this.mastersrc.updatePropertType(this.form.value).subscribe((res:IApiResponseModel)=>{
      if(res.result){
        alert("update Property");
        this.gridDATA();
      }
      else{
        alert(res.message);
      }
    })
  }
 

  deletePropertyByID(id :number){
    debugger
const isdelete=confirm("Are You want to delete this property");
if(isdelete){
  this.mastersrc.deleteProperType(id).subscribe((res:IApiResponseModel)=>{
    if(res.result){
      alert("Delete Successfully");
      this.gridDATA();
    }else{
      alert(res.message);
    }
  })
}
  }
}
