import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Servicios
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

// Modelos
import { Course } from '../../models/course.interface';
import { LocalizedString } from '../../models/localize.interface';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm {

  private readonly courseService = inject(CourseService);
  private readonly authService = inject(AuthService);
  private readonly translate = inject(TranslateService);

  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang)),
    { initialValue: this.translate.currentLang ?? 'es' }
  );

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
      course: this.course,
      userId: user.id,
      pricePaid
    });

    if (!result.success) {
      alert('No se pudo completar la inscripción');
      return;
    }

    this.receipt = {
      courseName: this.getLocalizedField(this.course.name),
      pricePaid,
      date: new Date().toISOString()
    };

    this.enrollmentCompleted.emit();
  }

  getLocalizedField(field: LocalizedString): string {
    const lang = this.currentLang() as 'es' | 'en' | 'fr';
    return field[lang] ?? field['es'];
  }
}