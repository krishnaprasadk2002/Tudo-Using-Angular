import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   title:string = "Task Tracker"
   showAddTask : boolean | undefined;
   subscription : Subscription | undefined

   constructor(private uiServices:UiService){
    this.subscription = this.uiServices.onToggle().subscribe(value => this.showAddTask = value)
   }

   toggleAddTask(){
    this.uiServices.toggleAddTask()
   }
}
