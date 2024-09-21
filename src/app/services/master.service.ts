import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IApiResponseModel, IPropertyType, site } from '../model/master';



@Injectable({
  providedIn: 'root'
})
export class MasterService {
  http = inject(HttpClient);

  getAllPropertyType(): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(`${environment.API_URL}GetAllPropertyType`);
  }

  savePropertyType(obj: IPropertyType): Observable<IApiResponseModel> {
    const newObj = [obj];
    return this.http.post<IApiResponseModel>(`${environment.API_URL}AddPropertyType`, newObj);
  }

  updatePropertType(obj: IPropertyType): Observable<IApiResponseModel> {
    return this.http.put<IApiResponseModel>(`${environment.API_URL}UpdatePropertyType`, obj)
  }
  deleteProperType(id: number): Observable<IApiResponseModel> {
    debugger
    return this.http.delete<IApiResponseModel>(`${environment.API_URL}DeletePropertyTypeById?id=${id}`)
  }


  getALLSite(): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(`${environment.API_URL}GetAllSites`);
  }

  saveSites(obj: site): Observable<IApiResponseModel> {
    return this.http.post<IApiResponseModel>(`${environment.API_URL}AddSites`, obj);
  }

  updateSites(obj: site): Observable<IApiResponseModel> {
    return this.http.put<IApiResponseModel>(`${environment.API_URL}UpdateSites`, obj);
  }

  deleteSite(id: number): Observable<IApiResponseModel> {
    return this.http.delete<IApiResponseModel>(`${environment.API_URL}DeleteSitesById?id=${id}`);
  }

  saveProperty(obj: any): Observable<IApiResponseModel> {
    return this.http.post<IApiResponseModel>(`${environment.API_URL}AddPropertyMasters`, obj);
  }

  getAllProperty(): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(`${environment.API_URL}GetAllPropertyMasters`);
  }

  getGetAllPropertyBySiteId(id: number): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(`${environment.API_URL}GetAllPropertyBySiteId?siteid=${id}`);
  }

  saveBooking(obj: any):Observable<IApiResponseModel>{
    return this.http.post<IApiResponseModel>(`${environment.API_URL}AddPropertyBooking`,obj);
  }
  getAllPropertyBookingBySiteId(siteId:number):Observable<IApiResponseModel>{
    return this.http.get<IApiResponseModel>(`${environment.API_URL}GetAllPropertyBookingBySiteId?siteid=${siteId}`)
  }
}
