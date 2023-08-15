import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverflowMenuComponent } from './overflow-menu.component';

describe('OverflowMenuComponent', () => {
  let component: OverflowMenuComponent;
  let fixture: ComponentFixture<OverflowMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverflowMenuComponent]
    });
    fixture = TestBed.createComponent(OverflowMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
