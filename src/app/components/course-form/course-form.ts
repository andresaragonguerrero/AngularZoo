import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Servicios
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

// Modelos
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm {

  private readonly courseService = inject(CourseService);
  private readonly authService = inject(AuthService);

  @Input() course?: Course;
  @Input() isMember = false;

  @Output() enrollmentCompleted = new EventEmitter<void>();

  receipt?: {
    courseName: string;
    pricePaid: number;
    date: string;
  };

  confirmEnrollment(): void {

    if (!this.course) return;

    const user = this.authService.currentUser();

    if (!user) {
      alert('Debes iniciar sesión');
      return;
    }

    const pricePaid =
      this.isMember && this.course.isFreeForMembers
        ? 0
        : this.course.price;

    const result = this.courseService.enrollCourse({
      courseId: this.course.id,
      userId: user.id,
      pricePaid
    });

    if (!result.success) {
      alert('No se pudo completar la inscripción');
      return;
    }

    this.receipt = {
      courseName: this.course.name,
      pricePaid,
      date: new Date().toISOString()
    };

    this.enrollmentCompleted.emit();
  }
}