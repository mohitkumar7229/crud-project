import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormSyntax } from './model/Employee';
import { DialogComponent } from './src/components/dialog/dialog.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from "./src/components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [MatTableModule, CommonModule, MatButtonModule, HeaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Employee CRUD App';
  displayedColumns: string[] = [
    'position',
    'name',
    'contact',
    'email',
    'actions',
  ];
  dataSource: EmployeeFormSyntax[] = [];

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const data = localStorage.getItem('empData');
      if (data) {
        this.dataSource = JSON.parse(data);
      }
    }
  }
  

  openEmployeeDialog(employee?: EmployeeFormSyntax): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      height: '400px',
      disableClose: true,
      data: employee ? { ...employee } : null,
      panelClass: 'no-radius-dialog'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (employee) {
          // UPDATE
          const index = this.dataSource.findIndex(emp => emp.employeeId === result.employeeId);
          if (index > -1) {
            this.dataSource[index] = result;
          }
        } else {
          const maxId = this.dataSource.length > 0
          ? Math.max(...this.dataSource.map(emp => emp.employeeId || 0))
          : 0;

        result.employeeId = maxId + 1;
        this.dataSource.push(result);
        }
  
        // Refresh table & Save
        this.dataSource = [...this.dataSource];
        localStorage.setItem('empData', JSON.stringify(this.dataSource));
      }
    });
  }
  
  

  onDelete(id: number) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this employee?'
    );
    if (confirmDelete) {
      this.dataSource = this.dataSource.filter((emp) => emp.employeeId !== id);
      this.dataSource.forEach((emp, index) => (emp.employeeId = index + 1));
      localStorage.setItem('empData', JSON.stringify(this.dataSource));
    }
  }

  onDeleteAll() {
    const confirmAll = confirm('This will delete all records. Are you sure?');
    if (confirmAll) {
      this.dataSource = [];
      localStorage.removeItem('empData');
    }
  }
}
