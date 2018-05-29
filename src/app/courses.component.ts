import { Component } from '@angular/core';
import { CoursesService } from './services/courses.service';

@Component({
	selector: 'courses', //<div class="courses"></div> => <courses>
/*	template: `
		<h2>{{ title }}</h2>
		<h2 [textContent] = "title"></h2>
		<ul>
			<li *ngFor="let course of courses">{{ course }}</li>
		</ul>
		<img src="{{ imageUrl }}" />
		<img [src]="imageUrl" />
		<table>
			<tr>
				<td [attr.colspan]></td>
			</tr>
		</table>
	`*/
	// template: `
	// 	<div (click)="onDivClicked()">
	// 		<button class="btn btn-primary" [style.backgroundColor]="isActive ? 'green' : 'red'" [class.active]="isActive" (click)="onSave($event)">Save</button>
	// 	</div>

	// 	<input (keyup)="onKeyUp($event)" />

	// 	<input #email (keyup.enter)="onKeyUpEnter(email.value)" />
		
	// 	<input [value]="email" (keyup.enter)="onKeyUp2()" />
		
	// 	<input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />
	// `
	// template: `
	// 	<input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />
	// `
	template: `
		{{ course.title | uppercase | lowercase }} <br>
		{{ course.students | number}} <br>
		{{ course.rating | number: '1.2-2'}} <br>
		{{ course.price | currency:'VND':'symbol':'3.2-2'}} <br>
		{{ course.releaseDate | date}} <br>
		{{ text | summary: 10}}
	`
})

export class CoursesComponent {
	// title = "Lits of courses";
	// courses;
	// isActive = true;
	// email = "demo@g.com";

	// imageUrl = "http://lorempixel.com/400/200";
	// colspan = 2;

	// constructor(service: CoursesService) {
	// 	// new CoursesService();
	// 	this.courses = service.getCourses();
	// }

	// onSave($event) {
	// 	event.stopPropagation();
	// 	console.log("Btn was clicked", $event);
	// }

	// onDivClicked() {
	// 	console.log("Div was clicked");
	// }

	// onKeyUp($event) {
	// 	if(event.keyCode === 13) console.log("Enter was entered.");
	// 	console.log(this.email);
	// }

	// onKeyUpEnter(email) {
	// 	console.log(email);
	// }

	// onKeyUp2() {
	// 	console.log(this.email);
	// }

	// getTitle() {
	// 	return this.title;
	// }

	course = {
		title: 'Test',
		rating: 4.9745,
		students: 30123,
		price: 190.95,
		releaseDate: new Date(2016, 3, 1)
	}

	text = `
		Test linh tinh thoi, chan vc @@@@@@@@@@@@@@
	`;


}