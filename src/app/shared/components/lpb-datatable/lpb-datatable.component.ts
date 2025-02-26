
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {HttpService} from '../../../shared/services/http.service';
import {environment} from 'src/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {Pagination} from "../../pager";
import {SelectionModel} from '@angular/cdk/collections';
import {DatePipe, DecimalPipe, JsonPipe} from '@angular/common';
import {HandleErrorService} from '../../../lpb-services/lpb-water-service/shared/services/handleError.service';
import {CustomNotificationService} from '../../../shared/services/custom-notification.service';
import {Router} from '@angular/router';
import {HIDE_SHOW_TABLE} from '../../../lpb-services/lpb-credit-card-service/shared/constants/credit-card-table';
import {DataResponse} from '../../../shared/models/data-response.model';
import {saveAs} from 'file-saver';
import {LpbEditPopupComponent} from '../lpb-edit-popup/lpb-edit-popup.component';
import { map } from 'rxjs/operators';

export class LpbDatatableConfig {
  filterDefault?: string;
  defaultSort?: string;
  hasSelection?: boolean;
  hasNoIndex?: boolean;
  hasAddtionButton?: boolean;
  hasPaging?: boolean;
  hasSort?: boolean;
  hasRowClick?: boolean;
  hiddenActionColumn?: boolean;
  isHiddenView?: boolean;
  paymentConfig?: any;
  isDisableRow?: (row) => boolean;
  rowBgColor?: (row) => string;
  disableCheck?: boolean;
  hiddenSetting?: boolean;
  hiddenView?: boolean;
  buttonOther?: IButtonOther[];
  cccdPrint?: boolean;
  exportType?: 'EXCEL' | 'PDF' | '';
  enableCRUD?: boolean;
}

export interface IButtonOther {
  icon: string;
  tooltip: string;
  action: (row) => boolean;
  isDisable?: (row) => boolean;
}

export interface ISearchConditions {
  property: string;
  operator: string;
  value: string;
}


export class LpbDatatableColumn {
  headerName?: string;
  headerProperty?: string;
  headerIndex?: number;
  width?: string;
  type?: string;
  className?: string;
  customStyleTick?: ICustomStyleTick;
  tooltipProperty?: string;
  hidden?: boolean;
  bgColor?: (row, columnName) => string;
  innerHtml?: boolean;
  badgeClassName?: (value) => string;
  icon?: string;
  isEdit?: boolean;
  fieldType?: FieldType;
  required?: boolean;
  options?: {key: string; value: string}[];
  apiUrl?: string;
}

export interface ICustomStyleTick {
  property: string;
  valueProperty: IValueProperty[];
}

export interface IValueProperty {
  value: string;
  class: string;
}

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'; // define a constant for the date format
export const DATE_FORMAT_VN_SIMPLE = 'DD/MM/YYYY'; // define a constant for the date format
export const API_CITY = '/lpb-common-service/api/public/redis/city';
export const API_DISTRICT = '/lpb-common-service/api/public/redis/district';
export const API_WARD = '/lpb-common-service/api/public/redis/ward';

export enum FieldType {
  TEXT = 'text',
  DATE = 'date',
  COMBOBOX = 'combobox'
}

@Component({
  selector: 'app-lpb-datatable',
  templateUrl: './lpb-datatable.component.html',
  styleUrls: ['./lpb-datatable.component.scss'],
  providers: [JsonPipe]
})
export class LpbDatatableComponent implements OnInit, AfterViewInit, OnChanges {
  protected readonly HIDE_SHOW_TABLE = HIDE_SHOW_TABLE;
  displayAll = true;
  sortArray: {
    headerProperty: string,
    sort: string
  }[] = [];
  sortValue = '';
  // sortCssClass = 'sortable';
  @Input() pageSizeOptions = [];
  @Input() defaultPageSize = 10;
  @Input() pageIndex = 1;

  @Input() callbackTransformData: (response: any) => any;

  constructor(
    private http: HttpService,
    private matdialog: MatDialog,
    private datepipe: DatePipe,
    private numberPipe: DecimalPipe,
    // private currencyPipe: CurrencyPipe,
    private handleErrorService: HandleErrorService,
    private toastr: CustomNotificationService,
    private router: Router,
    private jsonPipe: JsonPipe
  ) {
  }

  searchFilter = '';
  actions: {
    icon: string;
    actionName: string;
    actionCode: string;
    routerLink: string;
    tabOrder: any;
  }[] = [];
  rowActions: {
    icon: string;
    actionName: string;
    actionCode: string;
    tabOrder: any;
  }[] = [];
  pagination: Pagination = new Pagination();
  isLoading = true;

  // pageSize = 10;
  isDisplayEdit = false;
  isDisplayDelete = false;
  isDisplayCancel = false;
  isDisplayReverse = false;
  isDisplayToggle = false;
  isDisplayApprove = false;
  isDisplayDownload = false;
  isDisplayPrint = false;
  isDisplaySendApprove = false;
  isSelectAll = false;
  startRowOfPage = 1;
  endRowOfPage = 1;
  isChanged = false;
  apiUrlWithoutParam = '';
  @Input() disableCkAll = false;
  @Input() templateOther: TemplateRef<any>;
  @Input() apiServiceURL: string;
  @Input() dataSource = [];
  @Input() columns: LpbDatatableColumn[];
  @Input() clearSelected = false;
  @Input() checkboxConfig: {
    clearSelected: boolean
  };
  @Input() config?: LpbDatatableConfig = {
    filterDefault: '',
    defaultSort: '',
    hasSelection: false,
    hasNoIndex: false,
    hasSort: true,
    hasAddtionButton: true,
    hasPaging: true,
    hasRowClick: false,
    hiddenActionColumn: true,
    hiddenView: false,
    disableCheck: false,
    buttonOther: [],
    enableCRUD: false
  };
  @Output() editAction = new EventEmitter<any>();
  @Input() tableName?: string;
  @Output() deleteAction = new EventEmitter<any>();
  @Output() cancelAction = new EventEmitter<any>();
  @Output() reverseAction = new EventEmitter<any>();
  @Output() viewAction = new EventEmitter<any>();
  @Output() approveAction = new EventEmitter<any>();
  @Output() downloadAction = new EventEmitter<any>();
  @Output() printAction = new EventEmitter<any>();
  @Output() sendApproveAction = new EventEmitter<any>();
  @Output() onClickRowAction = new EventEmitter<any>();
  @Input() isDisabledRowAction?: (actCode: string, row: any) => boolean = (act, row) => false;


  @Output() changeStatusAction = new EventEmitter<any>();
  @Output() changeAction = new EventEmitter<any>();
  @Output() addAction = new EventEmitter<any>();
  @Output() chkClickChange = new EventEmitter<any>();
  @Output() chkAll = new EventEmitter<any>();
  @Output() getRowSelected: EventEmitter<any> = new EventEmitter();
  @Output() getRawData: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTableButtonClick: EventEmitter<any> = new EventEmitter();

  @Input() selection = new SelectionModel<any>(true, []);
  @Input() searchConditions: {
    property: string;
    operator: string;
    value: string;
  }[] = [];

  // @Input() isDisabledDelete?: (row: any) => string = (row) => false;
  @ViewChild('lpbDataTable') lpbDataTable: ElementRef;
  @Input() isDisabledUpdate?: (row: any) => boolean = (row) => false;
  @Input() isDisabledDelete?: (row: any) => boolean = (row) => false;
  @Input() isDisabledCancel?: (row: any) => boolean = (row) => false;
  @Input() isDisabledReverse?: (row: any) => boolean = (row) => false;

  @Input() outputHandleClick = false;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() clickCheckAll = new EventEmitter<any>();
  @Output() clickCheckRow = new EventEmitter<any>();
  @Output() checkAllChange = new EventEmitter<any>();
  @Output() checkRowChange = new EventEmitter<any>();
  @Input() disableCkRow = false;
  @Output() isRefreshChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Input() isRefresh: boolean = false;
  // ngAfterViewInit(): void {
  //
  // }

  ngOnChanges(changes: SimpleChanges): void {
    this.apiUrlWithoutParam = this.apiServiceURL
      ? this.apiServiceURL?.split('?')[0]
      : '';
    if (changes.searchConditions) {
      this.displayButton(this.apiUrlWithoutParam);
      this.search(this.searchConditions);
      this.isChanged = true;
      this.isRefresh = false;
      this.isRefreshChange.emit(this.isRefresh);
    }
    this.getRowSelected.emit(this.selection.selected);
    if (changes.clearSelected && this.clearSelected) {
      this.selection.clear();
      // changes.clearSelected.
    }
    if (changes.checkboxConfig) {
      if (changes.checkboxConfig.currentValue.clearSelected) {
        this.selection.clear();
      }
    }
    if (changes.config && this.config.paymentConfig) {
      // this.dataSource.forEach((row) => this.selection.deselect(row));
      this.displayButton(this.apiUrlWithoutParam);
      this.dataSource.map((row) => {
        this.selection.deselect(row);
        row.disabled = false;
        return row;
      });
      this.disableCkAll = false;
      this.fetchData(this.config.filterDefault);
    }
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    if (!this.isChanged) {
      this.fetchData(this.config.filterDefault);
    }
    this.isRefreshChange.emit(this.isRefresh);
    this.columns.sort((obj1, obj2) => {
      if (obj1.headerIndex > obj2.headerIndex) {
        return 1;
      }

      if (obj1.headerIndex < obj2.headerIndex) {
        return -1;
      }

      return 0;
    });
    this.isDisplayApprove = this.approveAction.observers.length > 0;
    this.isDisplayDownload = this.downloadAction.observers.length > 0;
    this.apiUrlWithoutParam = this.apiServiceURL
      ? this.apiServiceURL?.split('?')[0]
      : '';
    this.displayButton(this.apiUrlWithoutParam);

  }

  search(
    searchConditions: {
      property: string;
      operator: string;
      value: string;
    }[]
  ): any {
    // let searchString = '';
    // searchConditions.forEach(item => {
    //   if (item.value) {
    //     searchString += item.property + '|' + item.operator + '|' + item.value + '&';
    //   }
    // });
    this.pageIndex = 1;
    if (searchConditions?.length && searchConditions.length > 0) {

      searchConditions = searchConditions.map((item) => ({
        ...item,
        value: item.value ? encodeURIComponent(item.value) : '',
      }));
      this.searchFilter = this.handleValueFilter(searchConditions);
      this.fetchData(this.handleValueFilter(searchConditions));
    } else {
      this.searchFilter = '';
      this.fetchData(this.config.filterDefault);
    }

    // this.params.filter += '';
  }

  handleValueFilter(conditions): string {
    const arr = [];
    const arrKeyOl = [];
    let valueKeyOl = '';
    const arrKeyOeq = [];
    let valueKeyOeq = '';
    let keyNin = '';
    const valueKeyNin = [];
    conditions.forEach((item) => {
      if (item.value) {
        switch (item.operator) {
          case 'ol':
            arrKeyOl.push(item.property);
            valueKeyOl = item.value;
            break;
          case 'oeq':
            arrKeyOeq.push(item.property);
            valueKeyOeq = item.value;
            break;
          // case 'in':
          //   keyIn = item.property;
          //   valueKeyIn.push(item.value);
          //   arr.push(`${keyIn}|in|${item.value}`);
          //   break;
          case 'nin':
            keyNin = item.property;
            valueKeyNin.push(item.value);
            break;
          default:
            arr.push(`${item.property}|${item.operator}|${item.value}`);
            break;
        }
      }
    });
    if (arrKeyOl.length > 0) {
      arr.push(`${arrKeyOl.join(',')}|ol|${valueKeyOl}`);
    }
    if (arrKeyOeq.length > 0) {
      arr.push(`${arrKeyOeq.join(',')}|oeq|${valueKeyOeq}`);
    }

    if (keyNin && valueKeyNin.length > 0) {
      arr.push(`${keyNin}|nin|${valueKeyNin.join(',')}`);
    }
    return arr.join('&');
  }

  fetchData(filter): any {
    if (this.apiServiceURL) {
      this.apiUrlWithoutParam = this.apiServiceURL
        ? this.apiServiceURL?.split('?')[0]
        : '';
      this.displayButton(this.apiUrlWithoutParam);
      const table =
        this.lpbDataTable?.nativeElement.querySelector('.table-hover');
      if (this.lpbDataTable) {
        const height = table.offsetHeight;
        table.style.height = height + 'px';
        this.lpbDataTable.nativeElement.style.minHeight = height + 'px';
      }

      this.dataSource = [];
      this.isLoading = true;
      const params = {
        page: `${this.pageIndex - 1}`,
        size: `${this.defaultPageSize}`,
        filter,
        // sort: !this.config.defaultSort ? this.sortValue : this.config.defaultSort,
        sort: this.sortValue ? this.sortValue : this.config.defaultSort,
      };
      this.http
        .get<any>(`http://10.163.72.151:8091${this.apiServiceURL}`, { params })
        .pipe(map(res => {
          if (this.callbackTransformData) {
            return this.callbackTransformData(res);
          }
          return res;
        }))
        .toPromise()
        .then((res) => {
          this.dataSource = res.data;
          this.getRawData.emit(res);
          // replace old selected items with new ones
          const itemsToAdd = this.dataSource.filter((item) => {
            const foundItem = this.selection.selected.find((selectedItem) => {
              return selectedItem.id === item.id;
            });
            if (!foundItem) {
              return;
            }
            // removes item from selection
            this.selection.deselect(foundItem);
            this.selection.select(item);
            return item;
          });

          this.pagination = new Pagination(
            res.meta.total,
            this.pageIndex,
            this.defaultPageSize
          );
        })
        .catch((err) => {
          this.toastr.handleErrors(err);
        })
        .finally(() => {
          this.isLoading = false;
          if (table) {
            table.style.height = '';
            const height = table.offsetHeight;
            this.lpbDataTable.nativeElement.style.minHeight = height + 'px';
          }
        });
    } else {
      this.isLoading = false;
      if (this.config.paymentConfig) {
        this.dataSource = this.dataSource.sort((row1, row2) => {
          const year1 = row1[this.config.paymentConfig.sortBy].split('/');
          const year2 = row2[this.config.paymentConfig.sortBy].split('/');
          const date1 = new Date(year1[0], year1[1], 1).getTime();
          const date2 = new Date(year2[0], year2[1], 1).getTime();
          if (
            this.config.paymentConfig.paymentPeroidType === PaymentPeroidType.FAR_TO_NEAR
          ) {
            return date1 - date2;
          } else if (
            this.config.paymentConfig.paymentPeroidType === PaymentPeroidType.NEAR_TO_FAR
          ) {
            return date2 - date1;
          } else {
            return date1 - date2;
          }
        });
        switch (this.config.paymentConfig.paymentType) {
          case PaymentType.ALL:
            this.dataSource.map((row) => {
              this.selection.select(row);
              row.disabled = true;
              return row;
            });
            this.disableCkAll = true;
            this.chkAll.emit(this.selection.selected);
            break;
          case PaymentType.PART:
            this.dataSource.map((row, index) => {
              if (this.config.paymentConfig.paymentPeroidType !== PaymentPeroidType.ANY) {
                if (index === 0) {
                  this.selection.select(row);
                }
                row.disabled = true;
                this.disableCkAll = true;
              }
              return row;
            });
            this.chkAll.emit(this.selection.selected);
            break;
          case PaymentType.ALL_OR_PART:
            this.chkAll.emit(this.selection.selected);
            break;
          case PaymentType.SAME_TYPE:
            break;
          default:
            break;
        }
      }
    }

  }

  edit($event, row): any {
    $event.stopPropagation();
    if (this.config.enableCRUD) {
      const dialogRef = this.matdialog.open(LpbEditPopupComponent, {
        width: '60%',
        closeOnNavigation: true,
        hasBackdrop: true,
        disableClose: true,
        data: {
          rowData: row,
          columns: this.columns,
          servicePath: this.apiServiceURL
        },
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe(rs => {
          if (rs.reload) {
            this.fetchData(this.config.filterDefault);
          }
        }
      );
    } else {
      this.editAction.emit(row);
    }

  }

  delete($event, row): any {
    $event.stopPropagation();
    this.deleteAction.emit(row);
  }

  cancel($event, row): any {
    $event.stopPropagation();
    this.cancelAction.emit(row);
  }

  reverse($event, row): any {
    $event.stopPropagation();
    this.reverseAction.emit(row);
  }

  view($event, row): any {
    $event.stopPropagation();
    this.viewAction.emit(row);
  }

  approve($event, row): any {
    $event.stopPropagation();
    this.approveAction.emit(row);
  }

  download($event, row): any {
    $event.stopPropagation();
    this.downloadAction.emit(row);
  }

  print($event, row): any {
    $event.stopPropagation();
    this.printAction.emit(row);
  }

  sendApprove($event, row): any {
    $event.stopPropagation();
    this.sendApproveAction.emit(row);
  }

  add(): any {
    this.addAction.emit();
  }

  changePageSize(pageSize: number): void {
    if (this.defaultPageSize < 0) {
      return;
    }
    this.defaultPageSize = pageSize;
    this.pageIndex = 1;
    this.fetchData(
      this.searchFilter ? this.searchFilter : this.config.filterDefault
    );
  }

  async setPage(pageIndex: number): Promise<any> {
    if (pageIndex < 1 || pageIndex > this.pagination.pager.totalPages) {
      return;
    }
    this.pageIndex = pageIndex;
    this.fetchData(
      this.searchFilter ? this.searchFilter : this.config.filterDefault
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  totalSelectedInPage(): number {
    const selectedInPage = this.dataSource.filter((item) => {
      const foundItem = this.selection.selected.find((selectedItem) => {
        return selectedItem.id === item.id;
      });
      if (!foundItem) {
        return;
      }

      return item;
    });
    return selectedInPage.length;
  }

  someComplete(): boolean {
    if (this.dataSource.length <= 0) {
      return false;
    }
    let isExist = false;
    this.dataSource.forEach((item) => {
      if (this.selection.selected.some(t => t.id === item.id)) {
        return isExist = true;
      } else {
        return false;
      }
    });
    const isSelectAll = this.selection.selected.length === this.dataSource.length;
    return isExist && !isSelectAll;
  }

  clearSelectedInPage(): void {
    const selectedInPage = this.dataSource.filter((item) => {
      const foundItem = this.selection.selected.find((selectedItem) => {
        return selectedItem.id === item.id;
      });
      if (!foundItem) {
        return;
      }
      this.selection.deselect(item);
      return item;
    });
  }

  isAllSelected(): any {
    // const numSelected = this.selection.selected.length;
    const numSelected = this.totalSelectedInPage();
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle($event): any {
    this.isAllSelected()
      ? // this.selection.clear() :
      this.clearSelectedInPage()
      : this.dataSource.forEach((row) => {
        this.selection.select(row);
        if ($event?.checked) {
          this.selection.select(row);
        } else {
          this.selection.deselect(row);
        }

        if (this.config?.isDisableRow && this.config?.isDisableRow(row)) {
          this.selection.deselect(row);
        }
      });

    if (this.config.paymentConfig?.paymentType === PaymentType.ALL_OR_PART) {
      this.dataSource.map((item) => {
        if (this.isAllSelected()) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
        return item;
      });
    }
    this.chkAll.emit(this.selection.selected);
  }

  log(): any {
  }

  changeStatus(row): void {
    this.changeAction.emit(row);
  }

  ngAfterViewInit(): void {
  }

  formatData(data, type): string {
    // return '';
    if ('date' === type) {
      return this.datepipe.transform(data, 'dd/MM/yyyy');
    } else if ('currency' === type) {
      return this.numberPipe.transform(data, '1.0-10');
    } else if ('datetime' === type) {
      return this.datepipe.transform(data, 'dd/MM/yyyy HH:mm:ss');
    } else if ('json' === type) {
      if (data) {
        const jsonData = JSON.parse(data);
        return this.jsonPipe.transform(jsonData);
      }
    } else {
      return data;
    }
  }

  // Get all selected row
  getSectionSelect(): any {
    return this.selection.selected;
  }

  // Clear all section
  clearSection(): void {
    this.selection.clear();
    this.selection.deselect();
  }

  handleClick($event, row, rowIndex): any {
    let invalid = false;
    const paymentConfig = this.config.paymentConfig;
    const currentItemSelected = this.selection.isSelected(row);
    const rowSelected = this.selection.selected;
    if (paymentConfig) {
      if ((paymentConfig.paymentType === PaymentType.PART || paymentConfig.paymentType === PaymentType.ALL_OR_PART)
        && paymentConfig.paymentPeroidType === PaymentPeroidType.ANY
      ) {

        if (!currentItemSelected) {
          if (rowSelected.length === 1) {
            invalid = true;
            $event.preventDefault();
          }
          this.disableCkAll = true;
        } else {
          if (paymentConfig.paymentType === PaymentType.ALL_OR_PART) {
            this.disableCkAll = false;
          }
        }
        // this.dataSource.map((item) => {
        //   if (this.isSelectAll) {
        //     item.disabled = true;
        //   } else {
        //     item.disabled = false;
        //   }
        //   return item;
        // });


      } else if ((paymentConfig.paymentType === PaymentType.PART || paymentConfig.paymentType === PaymentType.ALL_OR_PART)
        && paymentConfig.paymentPeroidType === PaymentPeroidType.MULTIPE) {
        if (rowIndex > 0) {
          if (!currentItemSelected) {

            const preItemSelected = this.selection.isSelected(
              this.dataSource[rowIndex - 1]
            );
            if (!preItemSelected) {
              invalid = true;
              $event.preventDefault();
            }
          } else {
            const nextItemSelected = this.selection.isSelected(
              this.dataSource[rowIndex + 1]
            );
            if (nextItemSelected) {
              invalid = true;
              $event.preventDefault();
            }
          }
        } else if (rowIndex === 0) {
          const nextItemSelected = this.selection.isSelected(
            this.dataSource[rowIndex + 1]
          );
          if (nextItemSelected) {
            invalid = true;
            $event.preventDefault();
          }
        }

      } else if ((paymentConfig.paymentType === PaymentType.PART || paymentConfig.paymentType === PaymentType.ALL_OR_PART)
        && (paymentConfig.paymentPeroidType === PaymentPeroidType.NEAR_TO_FAR
          || paymentConfig.paymentPeroidType === PaymentPeroidType.FAR_TO_NEAR)) {
        if (rowIndex > 0) {
          invalid = true;
          $event.preventDefault();
        }

      } else if (paymentConfig.paymentType === PaymentType.SAME_TYPE) {
        if (rowSelected.length > 0) {
          if (rowSelected[0][paymentConfig.type] !== row[paymentConfig.type]) {
            invalid = true;
            $event.preventDefault();
          }
        }
      }

      $event.stopPropagation();
    } else {
      if (currentItemSelected) {
        const nextItemSelected = this.selection.isSelected(
          this.dataSource[rowIndex + 1]
        );
        if (nextItemSelected) {
          invalid = true;
          $event.preventDefault();
        }
      } else {
        $event.stopPropagation();
      }
    }
    if (invalid) {
      let message = 'Báº£n ghi báº¡n chá»n khĂ´ng Ä‘Ăºng quy táº¯c thanh toĂ¡n. Vui lĂ²ng chá»n láº¡i! ';
      if (paymentConfig.paymentType === PaymentType.SAME_TYPE) {
        message = 'Pháº£i chá»n hĂ³a Ä‘Æ¡n cĂ¹ng loáº¡i !';
      }
      if (paymentConfig.paymentPeroidType === PaymentPeroidType.ANY) {
        message = 'Báº¡n chá»‰ Ä‘Æ°á»£c chá»n 1 ká»³ !';
      }

      // this.handleErrorService.openMessageError(message);
      this.toastr.warning('Cáº£nh bĂ¡o', message);
    }
    // this.getRowSelected.emit(this.selection.selected);
  }

  handleChange(row, rowIndex): void {
    let operatorType = 'plus';
    if (this.selection.isSelected(row)) {
      operatorType = 'sub';
    }
    this.chkClickChange.emit({ row, operatorType });
    this.selection.toggle(row);
    this.getRowSelected.emit(this.selection.selected);
  }

  handleChange2(row, rowIndex): void {
    this.selection.toggle(row);
    this.getRowSelected.emit(this.selection.selected);
  }

  handleClassTick(row, column): string {
    const classCt = column.customStyleTick.valueProperty.find((p) => p.value === row[column.customStyleTick.property])?.class;
    return classCt;
  }

  onAdditionButtonClick(routerLink, actionCode): void {
    const rowSelected = this.selection.selected;
    if (routerLink) {
      if (routerLink.includes('{:id}')) {
        // this.router.navigate([routerLink.replace('{:id}', 'tettretretre')]);
        if (rowSelected.length === 1) {
          this.router.navigate([routerLink.replace('{:id}', rowSelected[0].id)]);
        } else {
          // this.router.navigate([routerLink, {id: rowSelected[0].id}]);
          this.toastr.warning('Cáº£nh bĂ¡o', 'Báº¡n pháº£i chá»n duy nháº¥t 1 báº£n ghi');
        }
      } else {
        if (this.config.enableCRUD) {
          const dialogRef = this.matdialog.open(LpbEditPopupComponent, {
            width: '60%',
            closeOnNavigation: true,
            hasBackdrop: true,
            disableClose: true,
            data: {
              columns: this.columns,
              servicePath: this.apiServiceURL
            },
            autoFocus: false,
          });
          dialogRef.afterClosed().subscribe(rs => {
              if (rs.reload) {
                this.fetchData(this.config.filterDefault);
              }
            }
          );
        } else {
          this.router.navigate([routerLink]);
        }

      }
    } else {
      this.onTableButtonClick.emit(actionCode);
    }

  }

  onClickCheckRow(event: any, row: any): void {
    if (this.disableCkRow) {
      return;
    }
    this.clickCheckRow.emit({ origin: event, row });
  }

  onClickCheckAll(event: any): void {
    if (this.disableCkAll) {
      return;
    }
    this.clickCheckAll.emit(event);
  }

  onCheckRowChange(checked: any, row: any): void {
    if (checked) {
      this.selection.select(row);
    } else {
      this.selection.deselect(row);
    }
    this.selectionChange.emit(this.selection);
    this.checkRowChange.emit({ checked, row });
  }

  onCheckAllChange(checked: any): void {
    if (checked) {
      this.selection.select(...this.dataSource);
    } else {
      this.selection.deselect(...this.dataSource);
    }
    this.selectionChange.emit(this.selection);
    this.checkAllChange.emit(checked);
  }

  isSelected(row: any): any {
    return this.selection.isSelected(row);
  }

  isSelectedAll(): any {
    const data = this.dataSource.filter((row) => {
      return this.selection.isSelected(row);
    });
    return this.dataSource.length === data.length;
  }

  isIndeterminate(): any {
    const data = this.dataSource.filter((row) => {
      return this.selection.isSelected(row);
    });
    return data.length > 0 && data.length < this.dataSource.length;
  }

  displayChange(column: any): void {
    column.hidden = !column.hidden;
  }

  someCompleteDisplay(): boolean {
    if (this.columns == null) {
      return false;
    }
    return this.columns.filter(t => t.hidden).length > 0 && this.displayAll;
  }

  setAllDisplay(completed: boolean): void {
    this.displayAll = completed;
    if (this.columns == null) {
      return;
    }
    this.columns.forEach(t => (t.hidden = !completed));
  }

  disableButtonOther(btn: any, row: any): boolean {
    if (typeof btn.isDisable !== 'function') {
      return false;
    }
    return btn.isDisable(row);
  }

  sort(column, i): void {
    if (this.config.hasSort) {
      const isExist = this.sortArray.some(sort => sort.headerProperty === column.headerProperty);
      const className = document.getElementById('colHeader' + i).className;
      const classNameElement = document.getElementById('colHeader' + i);
      if (isExist) {
        const sortVal = this.sortArray.find(sort => sort.headerProperty === column.headerProperty).sort;
        if (sortVal === 'ASC') {
          this.sortArray.find(sort => sort.headerProperty === column.headerProperty).sort = 'DESC';
          classNameElement.className = className.replace('asc', 'desc');
          // this.sortCssClass = 'sortable desc';
        } else if (sortVal === 'DESC') {
          const current = this.sortArray.findIndex(sort => sort.headerProperty === column.headerProperty);
          this.sortArray.splice(current, 1);
          classNameElement.className = className.replace('desc', '');
          // this.sortArray.find(sort => sort.headerProperty === column.headerProperty).sort = '';
        }
      } else {
        this.sortArray.push({
          headerProperty: column.headerProperty,
          sort: 'ASC'
        });
        classNameElement.className = className + ' asc';
      }
      this.sortValue = this.sortArray.map(a => a.headerProperty + ':' + a.sort).join(',');

      this.fetchData(
        this.searchFilter ? this.searchFilter : this.config.filterDefault
      );
    }

  }

  export(): void {
    const params = {
      filter: this.searchFilter,
    };
    this.http.get(`${this.apiServiceURL}/report`, { params }).subscribe((res: DataResponse<any>) => {
      const data = res?.data;
      this.exportExcelFromBase64(data, data?.fileName ? data?.fileName : new Date().getTime() + '.xlsx');
      this.toastr.success('ThĂ´ng bĂ¡o', 'Download thĂ nh cĂ´ng');
    }, (err) => {
      this.toastr.error('ThĂ´ng bĂ¡o', err.message);
    });
  }

  exportExcelFromBase64(base64String: any, fileName: any): void {
    const byteCharacters = atob(base64String.replace(/-/g, '+').replace(/_/g, '/'));
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
  }

  displayButton(apiUrlWithoutParam: string): void {
    if (apiUrlWithoutParam) {
      this.actions = [];

      const actions = JSON.parse(localStorage.getItem('action')).filter((act) => {
        return act.url?.includes(apiUrlWithoutParam);
      });
      actions.forEach((act) => {
        if (act.url === apiUrlWithoutParam && act.method === 'PUT') {
          this.isDisplayEdit = true;
        }
        if (act.url === apiUrlWithoutParam && act.method === 'DELETE') {
          this.isDisplayDelete = true;
        }
        if (act.url === apiUrlWithoutParam + '/status') {
          this.isDisplayToggle = true;
        }
        if (act.url === apiUrlWithoutParam + '/cancel' && act.imagePath === 'ACTION_IN_ROW_CANCEL') {
          this.isDisplayCancel = true;
        }
        if (act.url === apiUrlWithoutParam + '/reverse' && act.imagePath === 'ACTION_IN_ROW_REVERSE') {
          this.isDisplayReverse = true;
        }
        if (act.url === apiUrlWithoutParam + '/print' && act.imagePath === 'ACTION_IN_ROW_PRINT') {
          this.isDisplayPrint = true;
        }
        if (act.url === apiUrlWithoutParam + '/print' && act.imagePath === 'ACTION_IN_ROW_SEND_APPROVE') {
          this.isDisplayPrint = true;
        }
        if (act.url.includes(apiUrlWithoutParam) && act.code.includes('LAST_ROW_ACTION')) {
          this.rowActions.push({
            icon: act.imagePath,
            actionName: act.name,
            tabOrder: act.tabOrder,
            actionCode: act.code
          });
        }
        if (act.feUrl && act.imagePath === 'BUTTON') {
          this.actions.push({
            icon: act.imagePath,
            actionName: act.name,
            routerLink: act.feUrl,
            tabOrder: act.tabOrder,
            actionCode: act.code
          });
        }
      });
      this.actions = this.actions.sort((obj1, obj2) => {
        if (obj1.tabOrder > obj2.tabOrder) {
          return 1;
        }

        if (obj1.tabOrder < obj2.tabOrder) {
          return -1;
        }

        return 0;
      });
    }

  }

  onTableActionClick(actionCode: string): any {
    return this.onClickRowAction.emit(actionCode);
  }
}
