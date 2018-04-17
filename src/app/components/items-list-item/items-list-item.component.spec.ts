import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../modules/material.module';

import { ItemsListItemComponent } from './items-list-item.component';

describe('HeaderComponent', () => {
  let component: ItemsListItemComponent;
  let fixture: ComponentFixture<ItemsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      declarations: [ ItemsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
