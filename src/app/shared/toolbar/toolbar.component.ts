import { Component, Output, EventEmitter, output, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxToolbarModule } from 'devextreme-angular';

@Component({
  selector: 'app-toolbar',
  standalone:true,
  imports: [CommonModule,
    DxToolbarModule
    ],

  templateUrl: './toolbar.component.html',
})

export class ToolbarComponent {
constructor(private router: Router) {}

  @Output() searchChange = new EventEmitter<string>();

  @Output() save =new EventEmitter<void>();

  @Input() gridButton = false;
  @Input() listButton = false;
  @Input() addButton = false;
  @Input() moreButton = false;
  @Input() searchBox = false;

  @Input() saveButton = false;
  @Input() cancelButton = false;


    searchOptions = {
    placeholder: 'Search...',
    width: 160,
    height: 32,
    mode: 'search',
    stylingMode: 'outlined',
    elementAttr: {
      style: 'margin-left: 20px; border-radius:10px; '
    },
    onInput: (e: any) => {
      this.searchChange.emit(e.event.target.value);
    }
  };

  gridButtonOptions = {
    text: '▦',
    type: 'default',
    stylingMode: 'outlined',
    onClick: () => {}
  };

  listButtonOptions = {
    text: '☰',
    type: 'default',
    stylingMode: 'outlined',
    onClick: () =>{}
  };

  addButtonOptions = {
    text: 'Add',
    type: 'default',
    onClick: () => this.router.navigate(['rules/details'])
  };

  moreButtonOptions = {
    text: 'More',
    stylingMode: 'outlined'
  };


  cancelButtonOptions = {
  text: 'Cancel',
  stylingMode: 'outlined',
  onClick: () => this.router.navigate(['/rules'])
};

saveButtonOptions = {
  text: 'Save',
  onClick: () =>this.save.emit()
};

}
