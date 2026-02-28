import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// Services
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

// Models
import { Course } from '../../models/course.model';
import { Season } from '../../models/season.enum';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class CourseComponent implements OnInit {

  private readonly courseService = inject(CourseService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  courses: Course[] = [];

  isMember = computed(() =>
    this.authService.currentUser()?.isMember ?? false
  );

  ngOnInit(): void {

    this.courseService.initSeed([
      {
        name: 'Curso de cuidado de primates',
        description: 'Aprende sobre comportamiento y conservación de primates en el zoo.',
        season: Season.SPRING,
        startDate: '2026-04-15',
        capacity: 25,
        price: 40,
        isFreeForMembers: true
      },
      {
        name: 'Observación de aves tropicales',
        description: 'Ruta guiada para identificar especies de aves del parque.',
        season: Season.SUMMER,
        startDate: '2026-07-01',
        capacity: 20,
        price: 30,
        isFreeForMembers: false
      },
      {
        name: 'Conservación de ecosistemas acuáticos',
        description: 'Introducción a la vida en ecosistemas de agua dulce.',
        season: Season.AUTUMN,
        startDate: '2026-10-05',
        capacity: 30,
        price: 35,
        isFreeForMembers: true
      }
    ]);

    this.loadCourses();
  }

  private loadCourses(): void {
    this.courses = this.courseService.getCoursesForCurrentSeason();
  }

  enroll(courseId: string): void {

    const mode = this.isMember() ? 'member' : 'guest';

    this.router.navigate(['/courses/purchase'], {
      queryParams: {
        courseId,
        mode
      }
    });
  }
}