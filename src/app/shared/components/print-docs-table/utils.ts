// import { saveAs } from 'file-saver';
// import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
// const ImageFileType = {
//   svg: 'image/svg+xml',
//   gif: 'image/gif',
//   jpg: 'image/jpeg',
//   jpeg: 'image/jpeg',
//   png: 'image/png',
//   tif: 'image/tiff',
//   tiff: 'image/tiff',
//   webp: 'image/webp',
//   avif: 'image/avif',
// };
//
// const FileType = {
//   xls: 'application/vnd.ms-excel',
//   xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//   csv: 'text/csv',
//   doc: 'application/msword',
//   docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//   gz: 'application/gzip',
//   xml: 'application/xml',
//   pdf: 'application/pdf',
//   ppt: 'application/vnd.ms-powerpoint',
//   pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//   rar: 'application/vnd.rar',
//   tar: 'application/x-tar',
//   zip: 'application/zip',
//   ...ImageFileType,
// };
// export class FilesHelper {
//   static async openPdfFromBlob(
//     blob,
//     {
//       onLoading,
//       onError,
//       completed,
//     }: {
//       onLoading?: () => void;
//       onError?: (reason: any) => void;
//       completed?: () => void;
//     } = {}
//   ): Promise<void> {
//     try {
//       if (onLoading) {
//         onLoading();
//       }
//       const file = new Blob([blob], {type: FileType.pdf});
//       const fileURL = window.URL.createObjectURL(file);
//       const a = document.createElement('a');
//       a.href = fileURL;
//       a.target = '_blank';
//       a.click();
//     } catch (error) {
//       if (onError) {
//         onError(error);
//       }
//     } finally {
//       if (completed) {
//         completed();
//       }
//     }
//   }
//
//   static async downLoadFromBlob(
//     {
//       blob,
//       name = 'download',
//     }: {
//       blob: Blob;
//       name?: string;
//     },
//     {
//       onLoading,
//       onSuccess,
//       onError,
//       completed,
//     }: {
//       onLoading?: () => void;
//       onSuccess?: (blob: Blob) => void;
//       onError?: (reason: any) => void;
//       completed?: () => void;
//     } = {}
//   ): Promise<void> {
//     try {
//       if (onLoading) {
//         onLoading();
//       }
//
//       await saveAs(blob, name);
//
//       if (onSuccess) {
//         onSuccess(blob);
//       }
//     } catch (error) {
//       if (onError) {
//         onError(error);
//       }
//     } finally {
//       if (completed) {
//         completed();
//       }
//     }
//   }
//   static CustomRequiredValidator(
//     lcNumber: string = '', t24TransactionNumber: string = ''
//   ): ValidatorFn {
//     return (group: FormGroup): ValidationErrors => {
//       if (lcNumber !== '' && t24TransactionNumber !== '') {
//         if (
//           (group.get(lcNumber).value == null || group.get(lcNumber).value === '') &&
//           (group.get(t24TransactionNumber).value == null || group.get(t24TransactionNumber).value === '')
//         ) {
//           return { lcNumber: true, t24TransactionNumber: true };
//         }
//       } else {
//         if (lcNumber !== '') {
//           if (group.get(lcNumber).value === null || group.get(lcNumber).value === '') {
//             return { lcNumber: true};
//           }
//         }
//
//         if (t24TransactionNumber !== '') {
//           if (group.get(t24TransactionNumber).value === null || group.get(t24TransactionNumber).value === '') {
//             return { t24TransactionNumber: true};
//           }
//         }
//         return null;
//       }
//     };
//   }
//
//   static async openPdfFromBase64(
//     b64Data: string,
//     onError?: () => void
//   ): Promise<void> {
//     try {
//       const pdfFileBlob = await this.base64ToBlob({
//         b64Data,
//         contentType: FileType['pdf'],
//         fileName: '',
//       });
//
//       const fileURL = window.URL.createObjectURL(pdfFileBlob);
//       const a = document.createElement('a');
//       a.href = fileURL;
//       a.target = '_blank';
//       a.click();
//     } catch (error) {
//       onError();
//     }
//   }
//
//   static async base64ToBlob(
//     {
//       b64Data,
//       contentType,
//       fileName,
//     }: {
//       b64Data: string;
//       contentType?: string;
//       fileName: string;
//     }): Promise<Blob> {
//     const url = this.base64ToUrl({
//       b64Data,
//       contentType,
//       fileName,
//     });
//
//     const res = await fetch(url);
//     const blob = await res.blob();
//
//     return blob;
//   }
//
//   static base64ToUrl(
//     {
//       b64Data,
//       contentType,
//       fileName,
//     }: {
//       b64Data: string;
//       contentType?: string;
//       fileName?: string;
//     }): string {
//     let fileType = '';
//
//     if (!contentType) {
//       const fileExts: string[] = fileName?.split('.');
//       if (fileExts?.length > 1) {
//         fileType = fileExts.slice(-1).pop();
//       }
//     }
//     return `data:${
//       contentType || FileType[fileType] || fileType
//     };base64,${b64Data}`;
//   }
//
//   static async downLoadFromBase64(
//     {
//       b64Data,
//       contentType,
//       fileName,
//     }: {
//       b64Data: string;
//       contentType?: string;
//       fileName: string;
//     },
//     {
//       onLoading,
//       onSuccess,
//       onError,
//       completed,
//     }: {
//       onLoading?: () => void;
//       onSuccess?: (blob: Blob) => void;
//       onError?: (reason: any) => void;
//       completed?: () => void;
//     } = {}
//   ): Promise<void> {
//     try {
//       if (onLoading) {
//         onLoading();
//       }
//       const blob = await this.base64ToBlob({
//         b64Data,
//         contentType: contentType || '',
//         fileName,
//       });
//
//       await saveAs(blob, `${fileName}`);
//
//       if (onSuccess) {
//         onSuccess(blob);
//       }
//     } catch (error) {
//       if (onError) {
//         onError(error);
//       }
//     } finally {
//       if (completed) {
//         completed();
//       }
//     }
//   }
// }
