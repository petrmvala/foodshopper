import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.sass']
})
export class RequirementsComponent implements OnInit {
  categories: string[] = ['chicken', 'beef', 'vegetables', 'fruits', 'oats'];
  selectedCategories = new Map<string, number>();

  selectedCategory = '';
  testValue = 50;


  constructor() {
  }

  ngOnInit(): void {
    this.selectedCategories.set('test', 55);
  }

  addSelectedCategory(category: string): void {
    if (category) {
      this.selectedCategories.set(category, 0);
    }
  }
}
