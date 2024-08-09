import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturezaComponent } from './natureza.component';

describe('NaturezaComponent', () => {
  let component: NaturezaComponent;
  let fixture: ComponentFixture<NaturezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NaturezaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaturezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
