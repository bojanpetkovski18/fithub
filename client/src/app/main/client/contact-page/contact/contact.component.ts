import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(private router:Router) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      surname: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      code: new FormControl(null, [Validators.required]),
      city: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      msg: new FormControl(null, [Validators.required, Validators.maxLength(50)])
    })
  }

  onSubmit()
  {
    if (this.contactForm.valid)
    {
      this.router.navigate(['/']);
      alertify.success("You have successfuly sent the message, " + this.name?.value + " " + this.surname?.value + "!");
    }
    else
    {
        alertify.error("The message has not been sent!");
    }

  }

  get surname() { return this.contactForm.get('surname'); }
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get code() { return this.contactForm.get('code'); }
  get city() { return this.contactForm.get('city'); }
  get phone() { return this.contactForm.get('phone'); }
  get msg() { return this.contactForm.get('msg'); }

}
