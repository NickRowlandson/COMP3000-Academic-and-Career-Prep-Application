import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "userFilter"
})
export class UserFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => ((row.firstName) + " " + (row.lastName)).toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}
