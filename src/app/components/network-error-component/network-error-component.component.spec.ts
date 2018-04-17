import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkErrorComponentComponent } from './network-error-component.component';

describe('NetworkErrorComponentComponent', () => {
  let component: NetworkErrorComponentComponent;
  let fixture: ComponentFixture<NetworkErrorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkErrorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkErrorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
