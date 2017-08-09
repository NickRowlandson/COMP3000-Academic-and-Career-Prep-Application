export class Course {
    courseID: string;
    professorId: string;
    authLevel: string;
    courseName: string;
    classroom:string;
    campusId:string;
    classDay:string; // will save week days as 'Mon,Fri' as example.
    courseStart: Date; // inital start day of that course
    courseEnd: Date; // offcial end day
    classTimeStr:string; // format 'YYYY-MM-DD HH:mm-HH:mm,YYYY-MM-DD HH:mm-HH:mm,.....'
    attendanceDate: Date;
}
