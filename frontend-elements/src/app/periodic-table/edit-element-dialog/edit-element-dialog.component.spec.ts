import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElementDialogComponent } from './edit-element-dialog.component';

describe('EditElementDialog', () => {
  let component: EditElementDialogComponent;
  let fixture: ComponentFixture<EditElementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditElementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
