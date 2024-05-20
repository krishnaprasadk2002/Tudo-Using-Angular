import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'] 
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task): void {
    if (!task || !task.id) {
      console.error('Task is invalid:', task);
      return;
    }

    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    }, (error) => {
      console.error('Error deleting task:', error);
    });
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe(null, (error) => {
      console.error('Error updating task reminder:', error);
    });
  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe((newTask) => {
      this.tasks.push(newTask);
    }, (error) => {
      console.error('Error adding task:', error);
    });
  }
}
