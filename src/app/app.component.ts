import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  status = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)], this.forbiddenPnames),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable'),
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
    this.projectForm.reset();
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean } {
    if (control.value === 'test') {
      return {'nameIsForbidden': true}
    }
    return null;
  }

  forbiddenPnames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test') {
          resolve({'nameIsForbidden': true})
        } else {
          resolve(null)
        }
      }, 1500)
    })
    return promise
  }

}
