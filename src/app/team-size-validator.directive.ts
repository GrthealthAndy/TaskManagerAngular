import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers:[{provide: NG_VALIDATORS,useExisting: TeamSizeValidatorDirective, multi:true}]
})
export class TeamSizeValidatorDirective implements Validator {

  constructor() { }
  //get the input from appTeamSizeValidator tag
  @Input("appTeamSizeValidator") n : number =0;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    //AbstractControl is a base class for all types of form elements in Angular
    //ngForm,ngmodelgroup, and form elements are the children of a common parent class called "AbstractControl"
    //by specifying the abstractcontrol you can recieve a form, formgroup or formelement as parameter, in this method.
    //if the value is invalid you must return an object that contains a property called valid:false, which is treated as an
    //of "ValidationErrors" and which indicates that the value is invalid.

    let currentValue=control.value;
    let isValid = currentValue % this.n == 0;
    if (isValid)
    {
      return null;//valid
    }
    else{
      return {divisible:{valid:false}};//indicates invalid

    }

  }


  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
