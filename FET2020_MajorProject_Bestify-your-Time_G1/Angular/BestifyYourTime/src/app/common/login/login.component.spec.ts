import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ComponentFixture,
  TestBed,
  async,
  waitForAsync,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
 
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let de: DebugElement;
  let e1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: AuthService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('components initial state ', () => {
    expect(component.isLoggedIn).toBeFalsy();
    expect(component.isLoginFailed).toBeFalsy();
    expect(component.form).toBeDefined();
    expect(component.errorMessage).toBeDefined();
  });

  it(
    'should set submitted to reloadPage',
    waitForAsync(() => {
      component.onSubmit();
      expect(component.reloadPage).toBeTruthy();
    })
  );

  it(
    'should call the onsubmit method on click submit button',
    waitForAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'onSubmit');
      e1 = fixture.debugElement.query(By.css('button')).nativeElement;
      e1.click();
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    })
  );

  // it('should render form with email and password inputs', async () => {
  //   const element = fixture.nativeElement;

  //   expect(element.querySelector('form')).toBeTruthy();
  //   expect(element.querySelector('#username')).toBeTruthy();
  //   expect(element.querySelector('#password')).toBeTruthy();
  //   expect(element.querySelector('button')).toBeTruthy();
  // });
});
