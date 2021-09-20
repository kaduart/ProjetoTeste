import { UserService } from './../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    response: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {

        this.initForm();

    }

    get f() { return this.loginForm.controls; }

    initForm() {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    loginProccess() {
        if (this.loginForm.valid) {
            this.authenticationService.login(this.loginForm.value)
                .subscribe((result: any) => {

                    if (result != null) {

                        this.userService.token = result;
                        this.router.navigate(['/list']);
                    } else {
                        console.log('Token: ' + result);

                        console.log('Dados incorretos!');
                    }
                });
        }
    }
}
