//
// import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
// import {
//   AbstractControl, ControlValueAccessor,
//   FormArray,
//   FormBuilder,
//   NG_VALIDATORS,
//   NG_VALUE_ACCESSOR,
//   ValidationErrors,
//   Validators
// } from '@angular/forms';
// import {Subscription} from 'rxjs';
// import {FormValidators} from '../../../../../shared/validators/form-validators';
// import {clearFormArray, getTitleFormListItems, removeProperty} from '../../../../../shared/utils/utils';
// import {
//   DATA_TYPES, DEFAULT_PROCESS_CONTENT,
//   DEFAULT_REQUESTER_INFO,
//   E_DATA_CODE_TYPES,
//   FileTypes
// } from '../../../../../shared/constant/common.constant';
// import {FormHelpers} from '../../../../../../../shared/utilites/form-helpers';
// import {LbpValidators} from '../../../../../../../shared/validatetors/lpb-validators';
// import {Pagination} from '../../../../../../../_models/pager';
// import {SelectData} from '../../../../../form/shared/model/form-models';
// import {CustomNotificationService} from '../../../../../../../shared/services/custom-notification.service';
// import {CommonService} from '../../../../../shared/services/common.service';
// import {REQUEST_TYPES} from '../../../constants/request.constant';
// import {
//   CustomConfirmDialogComponent
// } from '../../../../../../../shared/components/custom-confirm-dialog/custom-confirm-dialog.component';
// import {MatDialog} from '@angular/material/dialog';
//
// @Component({
//   selector: 'app-request-content',
//   templateUrl: './request-content.component.html',
//   styleUrls: ['./request-content.component.scss'],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: RequestContentComponent
//     },
//     {
//       provide: NG_VALIDATORS,
//       multi: true,
//       useExisting: RequestContentComponent
//     }
//   ]
// })
// export class RequestContentComponent implements OnInit, ControlValueAccessor, OnDestroy, AfterViewInit {
//
//   onChangeSubs: Subscription[] = [];
//   formData = this.fb.group({
//     requesterInfo: this.fb.array([]),
//     processContent: this.fb.array([]),
//   });
//   @Input() id: any;
//   @Input() mode: any;
//   @Input() canEdit = true;
//   @Input() usersApi: any;
//   @Input() systemsConfigured: SelectData[] = [];
//   @Input() requesterInfoConfig: any;
//   @Input() processContentConfig: any;
//   @Input() key: any;
//   types = DATA_TYPES;
//   pagination: Pagination = new Pagination();
//   pageIndex = 1;
//   pageSize = 10;
//   start = 0;
//   end = 10;
//   defaultColumns = DEFAULT_PROCESS_CONTENT;
//   currentUserName = JSON.parse(localStorage.getItem('userInfo')).userName;
//   currentUserBranch = JSON.parse(localStorage.getItem('userInfo')).branchCode;
//   formHelpers = FormHelpers;
//   requesterInfoConfigFiltered: any;
//   processContentConfigFiltered: any;
//   requestTypes = REQUEST_TYPES;
//
//   onTouched = () => {};
//
//   constructor(
//     private dialog: MatDialog,
//     private fb: FormBuilder,
//     private customNotificationService: CustomNotificationService,
//     private commonService: CommonService,
//     private cdr: ChangeDetectorRef,
//   ) { }
//
//   ngOnInit(): void {
//     this.requesterInfoConfigFiltered =
//       this.requesterInfoConfig.find((i: any) => i.key === this.key).config.filter((j: any) => !j.isDefault);
//     this.processContentConfigFiltered =
//       this.processContentConfig.find((i: any) => i.key === this.key).config.filter((j: any) => !j.isDefault);
//     if (this.requesterInfo.length === 0) {
//       this.requesterInfoConfigFiltered.forEach((i: any) => {
//         this.addRequesterInfo(i);
//       });
//     }
//   }
//
//   get requesterInfo(): FormArray {
//     return this.formData.get('requesterInfo') as FormArray;
//   }
//
//   addRequesterInfo(item ?: any): void {
//     const validators = item.isRequired ? [Validators.required] : [];
//     if (item.type === E_DATA_CODE_TYPES.Date) {
//       validators.push(LbpValidators.isDMYDateFormat, FormValidators.dateExistValidator());
//     }
//     this.requesterInfo.push(this.fb.group({
//       title: [item.title],
//       type: [item.type],
//       isRequired: [item.isRequired],
//       data: [item?.data ? item.data : null, validators],
//     }));
//   }
//
//   get processContent(): FormArray {
//     return this.formData.get('processContent') as FormArray;
//   }
//
//   deleteRow(i: number): void {
//     const confirmDialog = this.dialog.open(CustomConfirmDialogComponent, {
//       width: '30%',
//       autoFocus: false,
//       data: {
//         title: 'XĂC NHáº¬N XĂ“A',
//         message: `Báº¡n cháº¯c cháº¯n muá»‘n xĂ³a dĂ²ng nĂ y?`,
//       },
//     });
//     confirmDialog.afterClosed().subscribe((confirm: boolean) => {
//       if (confirm) {
//         this.processContent.removeAt(i);
//         this.pagination = this.setPagination();
//       }
//     });
//   }
//
//   addRow(item?: any): void {
//     const newRow = {};
//     this.processContentConfigFiltered.forEach(i => {
//       const validators = i.isRequired ? [Validators.required] : [];
//       if (i.type === E_DATA_CODE_TYPES.Date) {
//         validators.push(LbpValidators.isDMYDateFormat, FormValidators.dateExistValidator());
//       }
//       newRow[i.title] = [item ? item[i.title] : null, validators];
//     });
//     this.defaultColumns.forEach(i => {
//       const validators = i.isRequired ? [Validators.required] : [];
//       if (i.code === 'effectiveDate') {
//         validators.push(FormValidators.minDateValidator(), FormValidators.dateExistValidator(), LbpValidators.isDMYDateFormat);
//       }
//       newRow[i.code] = [{
//         value: item ? item[i.code] : null,
//         disabled: this.disableDefaultField(i.code)
//       }, validators];
//     });
//     if (item) {
//       this.commonService.getDetailUserByUserName(item.userName).subscribe(
//         (res: any) => {
//           const user = res.data;
//           const listJobCodesData = [];
//           // for (let i = 0; i < 155; i++) {
//           //   listJobCodesData.push({code: user.jobCode + (i === 0 ? '' : i), name: user.jobName + i});
//           // }
//           listJobCodesData.push({code: user.jobCode, name: user.jobName});
//           newRow[`listJobCodes`] = [listJobCodesData];
//           this.processContent.push(this.fb.group(newRow));
//           this.formData.markAllAsTouched();
//           this.pagination = this.setPagination();
//         },
//         (err: any) => {
//           this.customNotificationService.error('ThĂ´ng bĂ¡o', err?.message);
//         }
//       );
//     } else {
//       newRow[`listJobCodes`] = [null];
//       this.processContent.push(this.fb.group(newRow));
//       this.formData.markAllAsTouched();
//       this.pagination = this.setPagination();
//     }
//   }
//
//   disableDefaultField(code: string): boolean {
//     return ['fullName', 'department', 'phong', 'boPhan'].includes(code);
//   }
//   ngOnDestroy(): void {
//     for (const sub of this.onChangeSubs) {
//       sub.unsubscribe();
//     }
//   }
//
//   registerOnChange(onChange: any): void {
//     const sub = this.formData.valueChanges.subscribe(res => {
//       const data = {
//         requesterInfo: this.formData.getRawValue().requesterInfo,
//         processContent: removeProperty(this.formData.getRawValue().processContent, 'listJobCodes')
//       };
//       onChange(data);
//     });
//     this.onChangeSubs.push(sub);
//   }
//
//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
//
//   writeValue(list: any): void {
//     if (!list) {
//       return;
//     }
//     const requesterInfoData = list.requesterInfo ? JSON.parse(list.requesterInfo) : [];
//     if (this.requesterInfo.length === 0) {
//       this.requesterInfoConfigFiltered.forEach((i: any) => {
//         this.addRequesterInfo(i);
//       });
//     }
//     if (this.requesterInfo.length !== 0) {
//       clearFormArray(this.requesterInfo);
//       requesterInfoData.forEach((j: any) => this.addRequesterInfo(j));
//     }
//     const processContentData = list.metaData ? JSON.parse(list.metaData) : [];
//     processContentData.forEach((k: any) => this.addRow(k));
//   }
//
//   validate(control: AbstractControl): ValidationErrors | null {
//     if (this.formData.invalid) {
//       return {
//         controlError: true
//       };
//     }
//
//     if (this.processContent.length === 0) {
//       return {
//         emptyRow: true
//       };
//     }
//   }
//
//   changePageSize(pageSize: number): void {
//     if (this.pageSize < 0) {
//       return;
//     }
//     this.pageIndex = 1;
//     this.pageSize = pageSize;
//     this.start = 0;
//     this.end = this.pageSize;
//     this.pagination = this.setPagination();
//   }
//
//   setPage(pageIndex: number): void {
//     if (pageIndex < 1 || pageIndex > this.pagination.pager.totalPages) {
//       return;
//     }
//
//     this.pageIndex = pageIndex;
//     this.pagination = this.setPagination();
//     this.start = ((this.pageIndex - 1) * this.pageSize);
//     this.end = this.start + this.pageSize;
//   }
//
//   setPagination(): any {
//     return new Pagination(
//       this.processContent.length,
//       this.pageIndex,
//       this.pageSize
//     );
//   }
//
//   changeUserName(i: number): void {
//     if (!this.processContent.at(i).get('userName').value) {
//       return;
//     }
//     this.commonService.getDetailUserByUserName(this.processContent.at(i).get('userName').value).subscribe(
//       (res: any) => {
//         const user = res.data;
//         this.processContent.at(i).get('fullName').patchValue(user.fullName);
//         this.processContent.at(i).get('department').patchValue(user.tenKhoi);
//         this.processContent.at(i).get('phong').patchValue(user.tenPhong);
//         this.processContent.at(i).get('boPhan').patchValue(user.tenBoPhan);
//         const listJobCodesData = [];
//         // for (let i = 0; i < 155; i++) {
//         //   listJobCodesData.push({code: user.jobCode + (i === 0 ? '' : i), name: user.jobName + i});
//         // }
//         listJobCodesData.push({code: user.jobCode, name: user.jobName});
//         this.processContent.at(i).get('listJobCodes').patchValue(listJobCodesData);
//         this.processContent.at(i).get('jobCode').patchValue(`${user.jobCode}`);
//         this.handleUserData(i, ['fullName', 'department', 'phong', 'boPhan']);
//       },
//       (err: any) => {
//         this.customNotificationService.error('ThĂ´ng bĂ¡o', err?.message);
//         this.processContent.at(i).get('fullName').patchValue(null);
//         this.processContent.at(i).get('department').patchValue(null);
//         this.processContent.at(i).get('phong').patchValue(null);
//         this.processContent.at(i).get('boPhan').patchValue(null);
//         this.processContent.at(i).get('jobCode').patchValue(null);
//         this.processContent.at(i).get('listJobCodes').patchValue(null);
//       }
//     );
//   }
//
//   handleUserData(index: number, controlName: string[]): void {
//     controlName.forEach((i: string) => {
//       if (this.processContent.at(index).get(i).value) {
//         this.disableFormControls(index, [i]);
//       } else {
//         this.enableFormControls(index, [i]);
//       }
//     });
//   }
//
//   disableFormControls(index: number, controlName: string[]): void {
//     controlName.forEach((i: string) => {
//       this.processContent.at(index).get(i).disable();
//     });
//   }
//
//   enableFormControls(index: number, controlName: string[]): void {
//     controlName.forEach((i: string) => {
//       this.processContent.at(index).get(i).enable();
//     });
//   }
//
//   ngAfterViewInit(): void {
//     if (!this.canEdit) {
//       setTimeout(() => {
//         this.formData.disable();
//         this.cdr.detectChanges();
//       }, 500);
//     }
//   }
// }
