import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLineItemComponent } from './table-line-item.component';

describe('TableLineItemComponent', () => {
  let component: TableLineItemComponent;
  let fixture: ComponentFixture<TableLineItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableLineItemComponent]
    });
    fixture = TestBed.createComponent(TableLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
