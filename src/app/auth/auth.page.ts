import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginRequest } from '../core/models/auth';
import { AuthService } from '../core/services/auth.service';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  async login() {
    const loading = await this.commonService.showLoading('Please wait...');
    try {
      const payload: LoginRequest = this.form.value;
      await this.authService.login(payload);
      await this.router.navigate(['/categories'], {replaceUrl: true});
      await this.commonService.showToast('Successfully logged in.');
    } catch (e) {
      await this.commonService.showToast('Sorry, invalid login credential.');
    } finally {
      await loading.dismiss();
    }
  }

}
