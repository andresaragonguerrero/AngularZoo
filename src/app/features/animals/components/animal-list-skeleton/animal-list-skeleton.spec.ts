import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalListSkeleton } from './animal-list-skeleton';

describe('AnimalListSkeleton', () => {
    let component: AnimalListSkeleton;
    let fixture: ComponentFixture<AnimalListSkeleton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnimalListSkeleton],
        })
            .compileComponents();

        fixture = TestBed.createComponent(AnimalListSkeleton);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});