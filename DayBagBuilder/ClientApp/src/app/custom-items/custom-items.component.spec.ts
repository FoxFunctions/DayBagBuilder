import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomItemsComponent } from './custom-items.component';

describe('CustomItemsComponent', () => {
  let component: CustomItemsComponent;
  let fixture: ComponentFixture<CustomItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
