import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Services
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

// Models
import { Course } from '../../models/course.interface';
import { LocalizedString } from '../../models/localize.interface';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class CourseComponent implements OnInit {

  private readonly courseService = inject(CourseService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang)),
    { initialValue: this.translate.currentLang ?? 'es' }
  );

  courses: Course[] = [];

  isMember = computed(() =>
    this.authService.currentUser()?.isMember ?? false
  );

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.courseService.getCoursesForCurrentSeason()
      .subscribe(courses => {
        this.courses = courses;
      });
  }

  enroll(courseId: string): void {

    const mode = this.isMember() ? 'member' : 'guest';

    this.router.navigate(['/course-purchase'], {
      queryParams: {
        courseId,
        mode
      }
    });
  }

  getLocalizedField(field: LocalizedString): string {
    const lang = this.currentLang() as 'es' | 'en' | 'fr';
    return field[lang] ?? field['es'];
  }
}