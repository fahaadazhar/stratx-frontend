import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ApiService } from './../../services/api.service';
import { Employee } from '../../models/employee';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @ViewChild("addEmployee") modalContent: TemplateRef<any>;

  employees: Employee[];

  user_role;
  senior_user_role;
  wfm_role;

  header = [
    { header: '#', field: 'id', class: 'text-bold' },
    { header: 'First', field: 'firstName' },
    { header: 'Last', field: 'lastName' },
    { header: 'Role', field: 'role_name' }
  ];

  roles = [
    { id: 1, name: 'User' },
    { id: 2, name: 'Senior User' },
    { id: 3, name: 'WFM' }
  ];

  actions = ['Delete'];
  private modalRef: NgbModalRef;
  employeeForm: FormGroup;
  submittedForm: boolean = false;

  constructor(private apiService: ApiService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.employees = new Array<Employee>();
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  initializeemployeeForm(): void {
    this.employeeForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  get of() { return this.employeeForm.controls; }

  fetchEmployees() {
    this.apiService.getEmployees().subscribe((res: any) => {
      if (res && res?.users) {
        this.employees = res?.users;
        this.employees.map((r) => {
          r['role_name'] = r?.role == 1 ? 'User' : r?.role == 2 ? 'Senior User' : 'WFM Professionals'
        });

        this.user_role = this.employees.filter(x => x.role == 1);
        this.senior_user_role = this.employees.filter(x => x.role == 2);
        this.wfm_role = this.employees.filter(x => x.role == 3);
        this.mapID();
      }
    })
  }

  addNewEmployee() {
    this.initializeemployeeForm();
    this.open(this.modalContent);
    this.submittedForm = false;
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  closeModal() {
    this.submittedForm = false;
    this.modalRef.close();
  }

  post() {
    this.submittedForm = true;
    if (this.employeeForm.valid) {
      this.employeeForm.get('role').setValue(Number(this.employeeForm.get('role').value));
      let userType = this.employeeForm.get('role').value;

      switch (this.employeeForm.get('role').value) {
        case 1:
          this.user_role.push(this.employeeForm.value);
          break;
        case 2:
          this.senior_user_role.push(this.employeeForm.value);
          break;

        default:
          this.wfm_role.push(this.employeeForm.value);
          break;
      }

      this.employees.push(this.employeeForm.value);
      this.employees.map((r) => {
        r['role_name'] = r?.role == 1 ? 'User' : r?.role == 2 ? 'Senior User' : 'WFM Professionals'
      });
      this.modalRef.close();
      this.mapID();
    }
  }

  deleteEmployee(user) {
    if (confirm("Are you sure to delete?")) {
      let id = user?.id;
      let objType;
      let index = -1;

      switch (user?.role) {
        case 1:
          index = this.user_role.findIndex(x => x.id == id && x.role == 1);
          objType = this.user_role;
          break;
        case 2:
          index = this.senior_user_role.findIndex(x => x.id == id && x.role == 2);
          objType = this.senior_user_role;
          break;

        default:
          index = this.wfm_role.findIndex(x => x.id == id && x.role == 3);
          break;
      }

      if (index != -1) {
        objType.splice(index, 1);
        index = this.employees.findIndex(x => x.role == user?.role);
        this.employees.splice(index, 1);
        this.mapID();
      }
    }
  }

  handleAction(event) {
    switch (event.action) {
      case 'Delete':
        this.deleteEmployee(event.data);
        break
      default:
        break;
    }
  }

  searchEmployee(event: any) {
    let value = event.target.value;
    let temp = value == '' ? this.employees : this.employees.filter(item => item?.firstName.search(new RegExp(value, 'i')) > -1);
    this.user_role = temp.filter(x => x.role == 1);
    this.senior_user_role = temp.filter(x => x.role == 2);
    this.wfm_role = temp.filter(x => x.role == 3);
  }

  mapID() {
    this.user_role.map((r, index) => { r['id'] = index + 1 });
    this.senior_user_role.map((r, index) => { r['id'] = index + 1 });
    this.wfm_role.map((r, index) => { r['id'] = index + 1 });
  }
}
