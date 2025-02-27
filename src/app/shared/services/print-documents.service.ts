// import {HttpService} from '../../../../shared/services/http.service';
// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';
// import {environment} from '../../../../../environments/environment';
// import {HttpClient} from '@angular/common/http';
// import {NotificationService} from '../../../../_toast/notification_service';
// import {FilesHelper} from "../components/print-docs-table/utils";
// import {HandleFile, DateType, SearchType} from '../constants/print-documents.constant';
// import {FilterOperator} from '../../../../shared/constants/filter-operator';
// import * as moment from 'moment';
// import {ultis} from '../../../../shared/utilites/function';
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class PrintDocumentsService {
//   // apiLocal = 'http://localhost:8080';
//   apiLocal = `${localStorage.getItem('apiUrl') ? 'http://' + localStorage.getItem('apiUrl') : 'https://uniform-gateway-test-t24.lpbank.com.vn'}`;
//   useLocal = false;
//
//   private url = this.useLocal ? `${this.apiLocal}` : `${environment.apiUrl}`;
//   constructor(
//     private http: HttpService,
//     private httpClient: HttpClient,
//     private notificationService: NotificationService
//   ) {}
//
//   getListDocuments(params: any): Observable<any> {
//     return this.http.get<any>(`${this.url}/print-doc-service/printDoc/listAll`, {params});
//   }
//
//   getSubsystems(): Observable<any> {
//     return this.http.get<any>(`${this.url}/print-doc-service/printDoc/listSubsystem`, {});
//   }
//
//   getBusiness(params: any): Observable<any> {
//     return this.http.get<any>(`${this.url}/print-doc-service/printDoc/listBusiness`, {params});
//   }
//
//   getDisbursements(params: any, documentType: string, documentCode: string, type: string = SearchType.params,
//                    businessCode: string, useBusinessCode = false): Observable<any> {
//     const urlPart = useBusinessCode ?
//       `${documentType}/${businessCode}/${documentCode}` : `${documentType}/${documentCode}`;
//     if (type === SearchType.body) {
//       return this.http.post<any>(
//         `${this.url}/print-doc-service/${urlPart}/findAll`,
//         params,
//         {}
//       );
//     } else {
//       return this.http.get<any>(
//         `${this.url}/print-doc-service/${urlPart}/findAll`,
//         {params}
//       );
//     }
//   }
//
//   exportPDF(params: any, documentType: string, documentCode: string, businessCode: string, useBusinessCode = false): Observable<any> {
//     const urlPart = useBusinessCode ?
//       `${documentType}/${businessCode}/${documentCode}` : `${documentType}/${documentCode}`;
//     return this.httpClient.post<any>(
//       `${this.url}/print-doc-service/${urlPart}/export`,
//       {},
//       {
//         params, observe: 'response', responseType: 'blob' as 'json'
//       }
//     );
//   }
//   exportPDFTF(params: any, documentType: string, documentCode: string): Observable<any> {
//     return this.httpClient.post<any>(
//       `${this.url}/print-doc-service/${documentType}/${documentCode}/exportTF`,
//       {},
//       {
//         params, observe: 'response',
//       }
//     );
//   }
//
//   handleErrorApi(responseStatus?): void {
//     if (responseStatus?.success === false) {
//       if (responseStatus?.codes?.length) {
//         responseStatus.codes.forEach((code) => {
//           this.notificationService.showError(
//             code.msg || 'CĂ³ lá»—i xáº£y ra. Xin vui lĂ²ng thá»­ láº¡i',
//             'ThĂ´ng bĂ¡o',
//           );
//         });
//       }
//       return;
//     }
//     if (responseStatus.message) {
//       this.notificationService.showError(
//         responseStatus.message,
//         'ThĂ´ng bĂ¡o',
//       );
//       return;
//     }
//     this.notificationService.showError(
//       'CĂ³ lá»—i xáº£y ra. Xin vui lĂ²ng thá»­ láº¡i',
//       'ThĂ´ng bĂ¡o',
//     );
//   }
//
//   handleFile(params, action, documentType, documentCode, businessCode: string, useBusinessCode = false, isBase64 = false): void {
//     if (isBase64) {
//       this.exportPDFTF(params, documentType, documentCode).subscribe(
//         (res) => {
//           if (res?.body?.data.length > 0) {
//             if (action === HandleFile.DOWNLOAD) {
//               res.body.data.forEach((item) => {
//                 FilesHelper.downLoadFromBase64(
//                   {
//                     b64Data: item.fileContent,
//                     contentType:
//                       'application/pdf',
//                     fileName: item.name,
//                   },
//                 );
//               });
//
//             } else {
//               res.body.data.forEach((item) => {
//                 FilesHelper.openPdfFromBase64(
//                   item.fileContent, () => {
//                     this.notificationService.showError(
//                       'ThĂ´ng bĂ¡o',
//                       'CĂ³ lá»—i xáº£y ra xin vui lĂ²ng thá»­ láº¡i',
//                     );
//                   }
//                 );
//               });
//             }
//           } else {
//             this.notificationService.showError(
//               'ThĂ´ng bĂ¡o',
//               'KhĂ´ng tĂ¬m tháº¥y file.',
//               // this.override
//             );
//           }
//         },
//         (error) => {
//           this.handleErrorApi(error);
//         }
//       );
//     } else {
//       this.exportPDF(params, documentType, documentCode, businessCode, useBusinessCode).subscribe(
//         (res) => {
//           let fileName = 'file-document.pdf';
//           const contentDisposition = res.headers.get('content-disposition');
//           if (contentDisposition) {
//             const substring = contentDisposition.split('=')[1];
//             fileName = substring.replace(/\\/g, '').replace(/"/g, '');
//           }
//           if (action === HandleFile.DOWNLOAD) {
//             FilesHelper.downLoadFromBlob(
//               {blob: res.body, name: fileName},
//               {
//                 onSuccess: () => {
//                   this.notificationService.showSuccess(
//                     'ThĂ´ng bĂ¡o',
//                     'Táº£i xuá»‘ng thĂ nh cĂ´ng'
//                   );
//                 },
//                 onError: (error) => {
//                   this.notificationService.showError(
//                     'ThĂ´ng bĂ¡o',
//                     error.message,
//                   );
//                 },
//               }
//             );
//           } else {
//             if (res && res.body) {
//               FilesHelper.openPdfFromBlob(
//                 res.body,
//                 {
//                   onError: (error) => {
//                     this.notificationService.showError(
//                       'ThĂ´ng bĂ¡o',
//                       error.message,
//                       // this.override
//                     );
//                   },
//                 }
//               );
//             }
//           }
//         },
//         (error) => {
//           this.handleErrorApi(error);
//         }
//       );
//     }
//   }
//
//   buildSearchCondition(formControl: any, pageSize: number, pageIndex: number, type: string = SearchType.params, role: string = ''): any {
//     const condition = [];
//     const params = {
//       page: pageIndex - 1,
//       size: pageSize
//     };
//     Object.keys(formControl).forEach(key => {
//       if (type === SearchType.body) {
//         params[key] = formControl[key].value;
//       } else {
//         let operator = FilterOperator.EQUAL;
//         let value = formControl[key].value;
//         let propertyKey = key;
//         if (formControl[key].value) {
//           if (key === 'fromDate') {
//             operator = FilterOperator.GREATER_THAN_EQUAL;
//             propertyKey = 'date';
//             value = formControl[key].value ? moment(formControl[key].value, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00' : '';
//           } else if (key === 'toDate') {
//             operator = FilterOperator.LESSER_THAN_EQUAL;
//             propertyKey = 'date';
//             value = formControl[key].value ? moment(formControl[key].value, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59' : '';
//           }
//           condition.push({
//             property: propertyKey,
//             operator,
//             value
//           });
//         }
//       }
//     });
//
//     if (type === SearchType.body) {
//       return params;
//     } else {
//       return  {
//         filter: ultis.handleValueFilter(condition),
//         page: pageIndex - 1,
//         size: pageSize,
//         role
//       };
//     }
//   }
//
//   formatDateForSearch(date: string, type: string): string {
//     let formatDate = '';
//     switch (type) {
//       case DateType.yyyymmdd:
//         formatDate = date.split('/').reverse().join('');
//         break;
//       case DateType.yymmdd:
//         formatDate = date.split('/').reverse().join('').substring(2);
//         break;
//       case DateType.yyyymmddDash:
//         formatDate = date.split('/').reverse().join('-');
//         break;
//     }
//     return formatDate;
//   }
//
//   ctaeCt21GetSwift(): Observable<any> {
//     return this.http.get<any>(`${this.url}/print-doc-service/ctae/ct21a/get-type`, {});
//   }
// }
