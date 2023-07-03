import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidDialogComponent } from './rfid-dialog.component';

describe('RfidDialogComponent', () => {
  let component: RfidDialogComponent;
  let fixture: ComponentFixture<RfidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
