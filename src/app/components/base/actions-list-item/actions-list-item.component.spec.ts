import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsListItemComponent } from './actions-list-item.component';

describe('ActionsListItemComponent', () => {
  let component: ActionsListItemComponent;
  let fixture: ComponentFixture<ActionsListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsListItemComponent]
    });
    fixture = TestBed.createComponent(ActionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
