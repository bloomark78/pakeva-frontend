import { ConsumirService } from './../../../services/consumir.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-en-curso',
  templateUrl: './en-curso.component.html',
  styleUrls: ['./en-curso.component.css']
})
export class EnCursoComponent implements OnInit {

  constructor(private consumir: ConsumirService) { }

  ngOnInit(): void {
    
  }

}
