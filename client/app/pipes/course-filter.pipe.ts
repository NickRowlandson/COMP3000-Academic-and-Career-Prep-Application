import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "courseFilter"
})
export class CourseFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => (row.courseName).toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}
