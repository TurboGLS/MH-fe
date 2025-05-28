import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-section',
  standalone: false,
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.scss'
})
export class MenuSectionComponent {
  @Input()
  selectedMenuItem: string | null = null;
}
