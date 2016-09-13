import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { User } from "classes-common/user";

import { AccountService } from "services/account.service";

import { PhonePipe } from "pipes/phone.pipe";

const validationMsgs = {
  "username": {
    "required": "Username is required",
  },
  "email": {
    "required": "Email is required",
  }
};

@Component({
  moduleId: module.id,
  templateUrl: "profile.component.html",
})
export class ProfileComponent {
  // TODO research initialization of variables before Angular binds to page
  // note: initialization of user to null causes page to error
  private user: User = {
    id: null,
    username: null,
    first_name: null,
    last_name: null,
    address: null,
    city: null,
    state: null,
    country: null,
    postal_code: null,
    phone: null,
    email: null,
  };

  private error: boolean = false;
  private loaded: boolean = false;
  private submitted: boolean = false;
  private updated: boolean = false;
  private failed: boolean = false;

  private profileForm: FormGroup;
  private fields = [
    "username",
    "first_name",
    "last_name",
    "address",
    "city",
    "state",
    "country",
    "postal_code",
    "phone",
    "email",
  ];
  private formErrors = {};

  constructor(private builder: FormBuilder, private accountService: AccountService) {}

  ngOnInit() {
    // initialize form errors
    this.fields.forEach(field => this.formErrors[field] = "");

    // send read request
    this.accountService
      .getUser()
      .then(data => {
        // initialize user data and build form
        this.user = data;
        this.buildForm();
        this.loaded = true;
      })
      .catch(() => this.error = true);
  }

  buildForm(): void {
    // convert phone number into readable format
    this.user.phone = new PhonePipe().transform(this.user.phone);

    // construct FormGroup
    this.profileForm = this.builder.group({
      "username": [ this.user.username,
        Validators.required,
      ],
      "first_name": [ this.user.first_name ],
      "last_name": [ this.user.last_name ],
      "address": [ this.user.address ],
      "city": [ this.user.city ],
      "state": [ this.user.state ],
      "country": [ this.user.country ],
      "postal_code": [ this.user.postal_code ],
      "phone": [ this.user.phone ],
      "email": [ this.user.email,
        Validators.required,
      ],
    });

    // set validation listener
    this.profileForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // reset form errors
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.profileForm) { return; }

    // check fields for validation errors
    const form = this.profileForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        // translate first validation error to message
        this.formErrors[field] =
          validationMsgs[field][Object.keys(control.errors)[0]];
      }
    }
  }

  submit() {
    // set form state
    this.submitted = true;
    this.updated = false;
    this.failed = false;

    // send update request
    this.accountService
      .updateUser(this.profileForm.value)
      .then(data => {
        // flag success
        this.submitted = false;
        this.updated = true;
      })
      .catch(reply => {
        this.submitted = false;
        if (reply.status === "fail") {
          // flag error in submitted data
          this.failed = true;
          Object.keys(reply.data).forEach(field => {
            // map API error codes to message
            this.formErrors[field] =
              validationMsgs[field][reply.data[field]];
          });
        } else if (reply.status === "error") {
          // flag unrecoverable error
          this.error = true;
        }
      });
  }
};
