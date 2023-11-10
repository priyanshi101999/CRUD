import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from './models/employee.model';
import { EmployeeServiceService } from './service/employee-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';
  @ViewChild('fileInput') fileInput: any;

  employeeForm: FormGroup;
  employees: Employee[];
  employeeToDisplay: Employee[];
  educationOptions = [
    '10th pass',
    'diploma',
    'graduation',
    'post graduate',
    'PhD'
  ]
  constructor(private fb: FormBuilder, private employeeService: EmployeeServiceService) {
    this.employees = [];
    this.employeeToDisplay = this.employees
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      company: this.fb.control(''),
      jobExpirience: this.fb.control(''),
      salary: this.fb.control(''),
    });

    this.employeeService.getEmployee().subscribe(res => {
      console.log(res);

    })
  }

  ngAfterViewInit(): void {
    // this.buttontemp.nativeElement.click();
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.fileInput.setValue('');
  }






addEmployee() {
 let employee = {
  firstname: this.FirstName.value,
  lastname: this.LastName.value,
  birthday: this.BirthDay.value,
  gender: this.Gender.value,
  education: this.educationOptions[parseInt(this.Education.value)],
  company: this.Company.value,
  jobExperience: this.JobExperience.value,
  profile: this.fileInput.nativeElement.files[0]?.name ,
 }

 this.employeeService.postEmployee(employee).subscribe((res) => {
this.employees.unshift(res);
this.clearForm();
 })


}

  public get FirstName(): FormControl {
  return this.employeeForm.get('firstname') as FormControl;
}

  public get LastName(): FormControl {
  return this.employeeForm.get('lastname') as FormControl;
}

  public get BirthDay(): FormControl {
  return this.employeeForm.get('birthday') as FormControl;
}

  public get Gender(): FormControl {
  return this.employeeForm.get('gender') as FormControl;
}

  public get Education(): FormControl {
  return this.employeeForm.get('education') as FormControl;
}

  public get Company(): FormControl {
  return this.employeeForm.get('company') as FormControl;
}

  public get JobExperience(): FormControl {
  return this.employeeForm.get(' jobExpirience') as FormControl;
}

  public get Salary(): FormControl {
  return this.employeeForm.get('salary') as FormControl;
}

}
