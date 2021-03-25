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
    if (category && !this.selectedCategories.has(category)) {
      this.selectedCategories.set(category, 0);
    }
  }

  updateMap(key: string, value: number): void {
    if (value > 100) {
      value = 100;
    }
    if (value < 0) {
      value = 0;
    }
    alert('saving: ' + key + ' ' + value);
    this.selectedCategories.set(key, value);
  }
}
