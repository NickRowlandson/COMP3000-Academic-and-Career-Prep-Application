import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";
import { SelectItem } from 'primeng/primeng';
declare var swal: any;
declare var moment: any;

@Component({
    selector: 'courseManage',
    templateUrl: './app/components/course-manage/course-manage.component.html',
    styleUrls: ['./app/components/course-manage/course-manage.component.css']
})


export class CourseManageComponent implements OnInit {
    courses: Course[];
    error: any;
    Campus: string[];
    campusId: any;
    professors: any[] = [];
    //dropdown
    campuses: SelectItem[] = [{ label: ' -- All --', value: '' }];
    selectedCampusId: string;

    constructor(private router: Router, private CourseService: CourseService) {
    }

    ngOnInit() {

        // console.log(moment().format('YYYY-MM-DD hh:mm A'));
        this.getProfessors();
        this.getCampuses();
        this.getCourses();
    }

    getCampuses() {
        // get campuses
        this.CourseService.getCampuses().then((result) => {
            result.forEach((i) => {
                this.campuses.push({
                    label: i.campusName,
                    value: i.campusId
                });
            });
        });
    }

    getProfessors() {
        // get professors
        this.CourseService.getProfessors().then((result) => {
            this.professors = result;
        });
    }
    getCourses() {
        this.CourseService
            .getCourses()
            .then(result => {
                if (result.status === "403") {
                    this.courses = null;
                } else {
                    //format datetime
                    result.forEach((item) => {
                        item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                        item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
                    });
                    this.courses = result;


                }
            })
            .catch(error => this.error = error);
    }

    deleteAlert(course: Course, event: any) {
        swal({
            title: 'Delete course (' + course.courseName + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(isConfirm => {
            if (isConfirm) {
                this.deleteCourse(course, event);
            }
        }).catch(error => {
            //console.log("Canceled");
        });
    }

    deleteCourse(course: Course, event: any) {
        event.stopPropagation();
        this.CourseService
            .delete(course)
            .then(res => {
                this.courses = this.courses.filter(h => h !== course);
                swal(
                    'Deleted!',
                    'Course record has been deleted.',
                    'success'
                );
            })
            .catch(error => this.error = error);
    }

    gotoEdit(course: Course, event: any) {

        this.router.navigate(['/course-edit', course.courseID]);
    }

    addCourse() {

        this.router.navigate(['/course-edit', 'new']);
    }

    gotoStudentEnrollment(course: Course, event: any) {
        this.router.navigate(['/student-enrollment', course.courseID, course.professorId, course.courseName]);
    }

    goBack() {
        window.history.back();
    }
    filterCampus(cam) {
        this.campusId = this.Campus.indexOf(cam) + 1;

    }

}
