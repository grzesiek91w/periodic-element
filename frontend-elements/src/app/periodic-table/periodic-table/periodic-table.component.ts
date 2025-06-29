import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { PeriodicElement } from '../../models/periodic-element.model';
import { MockPeriodicElements } from '../../mocks/mock-periodic-elements';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';

@Component({
  selector: 'app-periodic-table',
  standalone: false,
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  isLoading = true;
  filterSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  currentPageSize = 5;
  pageSizeOptions = [5, 10, 25];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private elementsService: MockPeriodicElements,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setupFilter();
    this.loadElements();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupFilter(): void {
    this.filterSubject.pipe(
      debounceTime(2000),
      takeUntil(this.destroy$)
    ).subscribe(filterValue => {
      this.applyFilterInternal(filterValue);
    });
  }

  private applyFilterInternal(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadElements(): void {
    this.isLoading = true;
    this.elementsService.getElements().subscribe({
      next: (elements) => {
        this.dataSource.data = elements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(updatedElement => {

      if (updatedElement) {
        console.log(updatedElement);
        this.updateElement(updatedElement);
      }
    });

  }

  private updateElement(element: PeriodicElement): void {
    this.elementsService.updateElement(element).subscribe({
      next: () => {
        this.loadElements();
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPageSize = event.pageSize;
  }
}