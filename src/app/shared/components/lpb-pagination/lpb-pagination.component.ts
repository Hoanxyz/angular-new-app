// import {
//   Component,
//   OnInit,
//   Output,
//   EventEmitter,
//   Input,
//   OnChanges,
//   SimpleChanges,
//   ChangeDetectorRef
// } from '@angular/core';
// export class Pagination {
//   itemCount: number;
//   activePage = 1;
//   pageSize: number;
//   pager: Pager;
//   constructor(itemCount: number = 0, activePage: number = 1, pageSize: number = 10) {
//     const paging = new PaginationService();
//     this.itemCount = itemCount;
//     this.activePage = activePage;
//     this.pageSize = pageSize;
//     this.pager = this.getPager(itemCount, activePage, pageSize);
//   }
//
//   getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10): Pager {
//     pageSize = Number(pageSize)
//     const totalPages = Math.ceil(totalItems / pageSize);
//     let startPage: number;
//     let endPage: number;
//     if (totalPages <= 10) {
//       startPage = 1;
//       endPage = totalPages;
//     } else {
//       if (currentPage <= 6) {
//         startPage = 1;
//         endPage = 10;
//       } else if (currentPage + 4 >= totalPages) {
//         startPage = totalPages - 9;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - 5;
//         endPage = currentPage + 4;
//       }
//     }
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
//     const pages = _.range(startPage, endPage + 1);
//     return new Pager(totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages);
//   }
// }
//
// @Component({
//   selector: 'app-lpb-pagination',
//   templateUrl: './lpb-pagination.component.html',
//   styleUrls: ['./lpb-pagination.component.scss']
// })
// export class LpbPaginationComponent implements OnInit, OnChanges {
//   @Input() pagination: Pagination = new Pagination();
//   @Input() pageOptions = [];
//
//   @Input() selected = 10;
//   @Output() evtChangePageSize = new EventEmitter();
//   @Output() evtSetPage = new EventEmitter();
//
//   constructor(private cdr: ChangeDetectorRef) {
//   }
//
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes && changes.pagination) {
//       this.cdr.detectChanges();
//     }
//   }
//
//   ngOnInit(): void {
//   }
//
//   changePageSize(pageSizeValue: number): void {
//     this.evtChangePageSize.emit(pageSizeValue);
//   }
//
//   setPage(pageValue: number): void {
//     this.evtSetPage.emit(pageValue);
//   }
//
// }
