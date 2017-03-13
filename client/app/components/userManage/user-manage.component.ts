import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Router } from '@angular/router';

@Component({
    selector: 'user-manage',
    templateUrl: './app/components/userManage/user-manage.component.html',
    styleUrls: ['./app/components/userManage/user-manage.component.css']
})


export class UserManageComponent implements OnInit {
    users: User[];
    error: any;

    constructor(private router: Router, private userService: UserService) {

    }

    getUsers() {
        this.userService.getUsers().then(users => this.users = users);
    }
    ngOnInit() {
        this.getUsers();
    }

    gotoEdit(user: User, event: any) {
        this.router.navigate(['/userEdit', user._id]);
    }

    addUser() {
        this.router.navigate(['/userEdit', 'new']);
    }

    deleteUser(user: User, event: any) {
        event.stopPropagation();
        this.userService
            .delete(user)
            .then(res => {
                this.users = this.users.filter(h => h !== user);
            })
            .catch(error => this.error = error);
    }

    goBack() {
        window.history.back();
    }
}
