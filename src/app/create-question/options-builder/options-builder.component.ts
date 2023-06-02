import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-options-builder',
  templateUrl: './options-builder.component.html',
  styleUrls: ['./options-builder.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionsBuilderComponent),
      multi: true
    },
  ]
})
export class OptionsBuilderComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() min = 4;

  form: FormGroup = this.fb.group({
    options: this.fb.array([
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control('')
    ])
  });

  private unsubscribeAll: Subject<any> = new Subject<any>();

  propagateChange = (_: any) => {};

  get options() {
    return this.form.get('options') as FormArray;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(value => {
      this.propagateChange(value.options);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  addOption() {
    this.options.push(this.fb.control(''));
  }

  removeOption(index) {
    this.options.removeAt(index);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: string[]): void {
    this.options.clear();
    if (value) {
      value.forEach(x => {
        this.options.push(this.fb.control(x));
      });
      if (value.length < 4) {
        let count = 4 - value.length;
        while (count) {
          this.options.push(this.fb.control(''));
          count--;
        }
      }
    }
  }

}
