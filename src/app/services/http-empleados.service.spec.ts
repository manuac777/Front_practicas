import { TestBed } from '@angular/core/testing';

import { HttpEmpleadosService } from './http-empleados.service';

describe('HttpEmpleadosService', () => {
  let service: HttpEmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpEmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
