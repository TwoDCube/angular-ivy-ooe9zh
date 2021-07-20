import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface RotationRequest {
  a: string;
  b: number;
  c: string;
  d: boolean;
}

type RotationGroupKeys1 = 'a' | 'b';
type RotationGroupKeys2 = 'c';
type RotationGroupKeys3 = 'd';
type RotationGroupUnion = {
  [Prop in
    | RotationGroupKeys1
    | RotationGroupKeys2
    | RotationGroupKeys3]: RotationRequest[Prop]
};

type RotationGroupUnionDoesntExtendKeyofRorationRequest = "Rotation Group union doesn't extend keyof rotationRequest";

type RotationFormGroup1 = Record<RotationGroupKeys1, FormControl>;
type RotationFormGroup2 = Record<RotationGroupKeys2, FormControl>;
type RotationFormGroup3 = Record<RotationGroupKeys3, FormControl>;

type RotationFrom = RotationGroupUnion extends RotationRequest
  ? {
      'group-1': FormGroup;
      'group-2': FormGroup;
      'group-3': FormGroup;
    }
  : RotationGroupUnionDoesntExtendKeyofRorationRequest;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    let group1: RotationFormGroup1 = {
      a: this.fb.control('test'),
      b: this.fb.control(3)
    };
    let group2: RotationFormGroup2 = {
      c: this.fb.control(null)
    };
    let group3: RotationFormGroup3 = {
      d: this.fb.control(null)
    };
    let formGroup: RotationFrom = {
      'group-1': this.fb.group(group1),
      'group-2': this.fb.group(group2),
      'group-3': this.fb.group(group3)
    };

    this.form = this.fb.group(formGroup);
  }
}
