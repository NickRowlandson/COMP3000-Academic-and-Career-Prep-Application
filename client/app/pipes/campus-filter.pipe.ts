import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "campusFilter"
})
export class campusFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => (row.campusId).toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}