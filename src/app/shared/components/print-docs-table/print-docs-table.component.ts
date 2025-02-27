// import {Component, Input, OnInit} from '@angular/core';
// import {Pagination} from '../../../../../_models/pager';
// import {FormGroup} from '@angular/forms';
// import {PrintDocumentsService} from '../../services/print-documents.service';
// import {HandleFile, SearchType, TableDataType} from '../../constants/print-documents.constant';
// import {ColumnsModel, IDocument} from '../../models/common';
// import {SharedService} from '../../services/shared.service';
//
// export interface IDocument {
//   id: string;
//   documentCode: string;
//   documentName: string;
//   subsystemCode: string;
//   subsystemName: string;
//   businessCode: string;
//   businessName: string;
// }
//
// export interface ISubsystem {
//   id: string;
//   subsystemName: string;
//   subsystemCode: string;
// }
//
// export interface IBusiness {
//   id: string;
//   businessName: string;
//   businessCode: string;
//   subsystemCode: string;
// }
//
// export interface ISearchListDocuments {
//   subsystemCode?: string;
//   documentCode?: string;
//   documentName?: string;
//   page: number;
//   size: number;
// }
//
// export interface ColumnsModel {
//   headerName: string;
//   headerProperty: string;
//   hidden?: boolean;
//   type?: string;
// }
//
// export enum HandleFile {
//   VIEW = 'VIEW',
//   DOWNLOAD = 'DOWNLOAD'
// }
//
// export const RegexPat = {
//   NOSPECIAL: '^[a-zA-Z0-9 ]+$',
//   NOSPECIALBUTSEMICOLONS: '^[a-zA-Z0-9; ]+$',
//   NOSPECIALBUTDASH: '^[a-zA-Z0-9- ]+$',
//   NOSPECIALBUTDOT: '^[a-zA-Z0-9-.,; ]+$',
//   NOSPECIALNOVN: '^((?![\\\\~`!@#$%^&*()_=+,.?/|\\{\\}\\[\\]]).)*$',
//   NOSPECIALKEEPDOT: /^[a-zA-Z0-9-.# ]+$/,
//   NUMBERKEEPDOT: /^[0-9-.# ]+$/
// };
//
// export enum DateType {
//   yyyymmdd = 'yyyymmdd',
//   yymmdd = 'yymmdd',
//   yyyymmddDash = 'yyyy-mm-dd'
// }
//
// export enum SearchType {
//   params = 'params',
//   body = 'body'
// }
//
// export enum TableDataType {
//   codeToName = 'codeToName',
//   money = 'money'
// }
//
//
// @Component({
//   selector: 'app-print-docs-table',
//   templateUrl: './print-docs-table.component.html',
//   styleUrls: ['./print-docs-table.component.scss']
// })
// export class PrintDocsTableComponent implements OnInit {
//
//   @Input() searchType = SearchType.params;
//   @Input() formSearch: FormGroup;
//   @Input() documentSelected: IDocument;
//   @Input() columns: ColumnsModel[];
//   @Input() codeToValue: [];
//   @Input() notCheckEmpty = ['documentCode', 'transType', 'productCode', 'logo', 'chargeDate'];
//   @Input() useBusinessCode = false;
//   @Input() paramsExport = {};
//   @Input() paramsItemExport = [];
//   @Input() isBase64 = false;
//   displayAll = true;
//   pagination: Pagination = new Pagination();
//   pageIndex = 1;
//   pageSize = 10;
//   listDisbursement: any[] = [];
//   actionFile = HandleFile;
//   search = false;
//   searchEmpty = true;
//   tableDataType = TableDataType;
//   productCode = '';
//
//   constructor(
//     private printDocumentsService: PrintDocumentsService,
//     private sharedService: SharedService
//   ) { }
//
//   ngOnInit(): void {
//   }
//
//   searchDisbursement(fromStartPage = true): void {
//     this.searchEmpty = !Object.keys(this.formSearch.controls).some(formKey => (this.formSearch.controls[formKey].value)
//       && !this.notCheckEmpty.includes(formKey));
//     if (fromStartPage) {
//       this.pageIndex = 1;
//     }
//     if (this.searchEmpty) {
//       this.search = true;
//       this.listDisbursement = [];
//       this.pagination = new Pagination(
//         0,
//         this.pageIndex,
//         this.pageSize
//       );
//       return;
//     }
//     this.search = true;
//     let params: any;
//     const doc = this.documentSelected;
//     if (this.searchType === SearchType.body) {
//       params = this.printDocumentsService.buildSearchCondition(
//         this.formSearch.controls, this.pageSize, this.pageIndex, this.searchType
//       );
//     } else {
//       params = this.printDocumentsService.buildSearchCondition(
//         this.formSearch.controls, this.pageSize, this.pageIndex
//       );
//     }
//
//     const documentType = doc.subsystemCode.toLowerCase();
//     const documentCode = doc.documentCode.toLowerCase();
//     const businessCode = doc.businessCode ? doc.businessCode.toLowerCase() : '';
//     this.printDocumentsService
//       .getDisbursements(params, documentType, documentCode, this.searchType, businessCode, this.useBusinessCode)
//       .subscribe(
//         (res) => {
//           if (res) {
//             this.pagination = new Pagination(
//               res.meta.total,
//               this.pageIndex,
//               this.pageSize
//             );
//             this.listDisbursement = res.data;
//           }
//         },
//         (error) => {
//           this.printDocumentsService.handleErrorApi(error);
//           this.pagination = new Pagination(0, this.pageIndex, this.pageSize);
//           this.listDisbursement = [];
//         }
//       );
//   }
//
//   changePageSize(pageSize: number): void {
//     if (this.pageSize < 0) {
//       return;
//     }
//     this.pageIndex = 1;
//     this.pageSize = pageSize;
//     this.searchDisbursement();
//   }
//
//   setPage(pageIndex: number): void {
//     if (pageIndex < 1 || pageIndex > this.pagination.pager.totalPages) {
//       return;
//     }
//     this.pageIndex = pageIndex;
//     this.searchDisbursement(false);
//   }
//
//   handleFile(row: any, action: any): void {
//     const doc = this.documentSelected;
//     const paramsItemExportObj = {};
//     if (this.paramsItemExport.length !== 0) {
//       this.paramsItemExport.forEach((key) => {
//         if (row[key]) {
//           paramsItemExportObj[key] = row[key];
//         }
//       });
//     }
//     const id = row.id;
//     const documentType = doc.subsystemCode.toLowerCase();
//     const documentCode = doc.documentCode.toLowerCase();
//     const businessCode = doc.businessCode ? doc.businessCode.toLowerCase() : '';
//     this.printDocumentsService.handleFile(
//       {...this.paramsExport, ...paramsItemExportObj, id, action},
//       action, documentType, documentCode, businessCode, this.useBusinessCode, this.isBase64
//     );
//   }
//
//   setAllDisplay(completed: boolean): void {
//     this.displayAll = completed;
//     if (this.columns == null) {
//       return;
//     }
//     this.columns.forEach(t => (t.hidden = !completed));
//   }
//
//   someCompleteDisplay(): boolean {
//     if (this.columns == null) {
//       return false;
//     }
//     return this.columns.filter(t => t.hidden).length > 0 && this.displayAll;
//   }
//
//   displayChange(column: any): void {
//     column.hidden = !column.hidden;
//   }
//
//   getCodeValue(code: string): string {
//     return this.codeToValue[code] || code;
//   }
// }
