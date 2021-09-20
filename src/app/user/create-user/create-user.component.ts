
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MASKS, NgBrazilValidators } from 'ng-brazil';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  minNum = 3;
  maxNum = 100;

  userForm: FormGroup;
  user: User;
  formResult: string = '';
  endereco: any;

  saveSuccess = false;

  public MASKS = MASKS;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      login: ['', Validators.required],
      password: [''],
      role: [''],
      name: ['', [Validators.required, Validators.minLength(this.minNum), Validators.maxLength(this.maxNum), Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['',[Validators.required, Validators.email]],
      addressCep: ['',[ Validators.required, NgBrazilValidators.cep]],
      addressStreet: ['', Validators.required],
      addressNumber: ['',Validators.required],
      addressComplement: [''],
      addressNeighborhood: ['',Validators.required],
      addressCity: ['',Validators.required],
      addressUf: ['',Validators.required],
    });
  }


  save() {
    if (this.userForm.dirty) {
      const cpf = this.userForm.value.cpf.replace(/\.|-/gm, '');
      this.userForm.patchValue({ cpf: cpf });

      this.userService.createUser(this.userForm.value)
        .subscribe(data => {
          console.log(data);
          this.formResult = JSON.stringify(this.userForm.value);
          this.goToList();
        });

    } else {
      this.formResult = "Não submeteu!!!";
    }
  }

  goToList() {
    this.router.navigate(['/list']);
  }



  getAddress() {
    let cepFormat = this.userForm.value.addressCep.replace(/\.|-/gm, '');
    this.userForm.patchValue({ addressCep: cepFormat });

    this.userService.buscarCep(cepFormat).subscribe(data => {
      this.endereco = data;
      if (data != null) {
        this.setDadosForm(data)
      }

    });
  }

  setDadosForm(dadosCep: any) {
    this.userForm.patchValue({
      addressStreet: dadosCep.logradouro,
      addressComplement: dadosCep.complemento,
      addressNeighborhood: dadosCep.bairro,
      addressCity: dadosCep.localidade,
      addressUf: dadosCep.uf,
    })
  }
}
