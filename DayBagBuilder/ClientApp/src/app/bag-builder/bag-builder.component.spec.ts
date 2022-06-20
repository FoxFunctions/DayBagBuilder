import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagBuilderComponent } from './bag-builder.component';

describe('BagBuilderComponent', () => {
  let component: BagBuilderComponent;
  let fixture: ComponentFixture<BagBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BagBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
