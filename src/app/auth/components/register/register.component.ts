import { Component,EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor() { }

  ngOnInit(): void {
  }
  ame: string = "";
  age:number=0;
  myForm=new FormGroup({
        name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
        age:new FormControl('',[Validators.required,Validators.min(18)])
  });
  get nameStatus(){
      console.log(this.myForm.controls.name.valid)
      return this.myForm.controls.name.valid

  }
  get ageStatus(){
      console.log(this.myForm.controls.age.valid)
      return this.myForm.controls.age.valid
  }
  submitForm(){
      console.log(this.myForm)
      this.data.emit({name:this.myForm.value.name,age:this.myForm.value.age})
      
  }
  //@Output() nameChange:EventEmitter<string>=new EventEmitter();
  // @Output() ageChange:EventEmitter<string>=new EventEmitter();
  // @Output() addnewrow:EventEmitter<boolean>=new EventEmitter();
  @Output() data:EventEmitter<{name:string,age:number}>=new EventEmitter();

}
