export interface IPropertyType{
     propertTypeId: number,
      propertyType: string
}

export interface IApiResponseModel{
   
       result: string;
       message:string;
       data:any
 }

 export interface IProperty {
      propertyId: number;
      propertyNo: number;
      facing: string;
      totalArea: string;
      rate: number;
      siteId: number;
    }

 export class site{
      
            siteId: number;
            siteTitle: string;
            location: string;
            propertyTypeId: number;
            city: string;
            pincode: string;
            state: string;
            totalProperties: number;
            createdDate: Date;
            lastUpdatedDate: Date;
        constructor(){
            this.siteId=0,
            this.siteTitle='',
            this.location='',
            this.propertyTypeId=0,
            this.city='',
            this.pincode='',
            this.state='',
            this.totalProperties=0,
            this.createdDate=new Date(),
            this.lastUpdatedDate=new Date()
        }
 }