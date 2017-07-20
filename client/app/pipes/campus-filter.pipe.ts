import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "campusFilter"
})
export class CampusFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.campusId.indexOf(query) > -1);
        }
        return array;
    }
}
