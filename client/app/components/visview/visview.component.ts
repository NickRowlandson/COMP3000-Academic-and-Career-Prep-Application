import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var vis;

@Component({
    selector: 'visview',
    templateUrl: './app/components/visview/visview.component.html',
    styleUrls: ['./app/components/visview/visview.component.css']
})


export class VisviewComponent implements OnInit {
    items: any;
    groups: any;
    timeline: any;
    error: any;

    events: any[];


    constructor(private router: Router) {

    }

    ngOnInit() {
      this.events = [
            {
                "title": "All Day Event",
                "start": "2017-07-06"
            }
        ];

    //     var container = document.getElementById('visualization');
    //     this.items = new vis.DataSet();
    //     this.groups = new vis.DataSet();
    //     this.items.add({ id: 0, content: 'Math Lv1', start: '2017-07-05 8:00', end: '2017-07-05 11:00', group: 0 });
    //     this.groups.add([
    //         { id: 0, content: 'Math' },
    //         { id: 1, content: 'Chemistry' },
    //         { id: 3, content: 'Comm' },
    //         { id: 4, content: 'Biology' }
    //     ]);
    //     // Configuration for the Timeline
    //     var options = {};
    //
    //     // Create a Timeline
    //     this.timeline = new vis.Timeline(container, this.items, this.groups, options);
    // }
    //
    // add() {
    //     this.items.add({ id: 1, content: 'Math LV2', start: '2017-07-06 16:00', end: '2017-07-06 19:00', group: 0 });
    //     this.timeline.setData(this.items);
    //
    // }
    //
    // add2() {
    //     this.items.add({ id: 2, content: 'Comm Lv1', start: '2017-07-07 14:00 ', end: '2017-07-07 15:00', group: 3 });
    //     this.timeline.setData(this.items);
    // }
    //
    // add3() {
    //     this.items.add({ id: 3, content: 'Chemistry LV1', start: '2017-07-08 17:00', end: '2017-07-0820:00', group: 1 });
    //     this.timeline.setData(this.items);
    //
    // }
  }

}
