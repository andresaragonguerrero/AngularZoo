import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Servicios
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

// Modelos
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-purchase',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './course-purchase.html',
  styleUrl: './course-purchase.scss'
})
export class CoursePurchase implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  private readonly authService = inject(AuthService);

  courses: Course[] = [];
  selectedCourse?: Course;
  isMember = false;

  ngOnInit(): void {

    this.isMember = this.authService.currentUser()?.isMember ?? false;

    this.courseService.getCoursesForCurrentSeason()
      .subscribe(courses => {
        this.courses = courses;

        this.route.queryParams.subscribe(params => {
          const courseId = params['courseId'];
          if (courseId) {
            this.selectedCourse = this.courses
              .find(c => c.id === courseId);
          }
        });
      });
  }

  getPrice(course: Course): number {

    if (this.isMember && course.isFreeForMembers) {
      return 0;
    }

    return course.price;
  }

  enroll(course: Course): void {

    const user = this.authService.currentUser();

    if (!user) {
      alert('Debes iniciar sesión para inscribirte en un curso');
      this.router.navigate(['/login']);
      return;
    }

    const pricePaid =
      this.isMember && course.isFreeForMembers
        ? 0
        : course.price;

    const result = this.courseService.enrollCourse({
      courseId: course.id,
      userId: user.id,
      pricePaid
    });

    if (!result.success) {
      alert('No se pudo completar la inscripción');
      return;
    }

    console.log('Inscripción realizada:', result.enrollment);

    this.router.navigate(['/courses']);
  }

  goToMembership(): void {
    this.router.navigate(['/register'], {
      queryParams: { becomeMember: true }
    });
  }
}