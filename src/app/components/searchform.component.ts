import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { GithubService } from '../services/github.service';
import 'rxjs/add/operator/map';

import { GithubUser } from '../model/IGithubUser';

@Component({
    moduleId: module.id,
    selector: 'searchform',
    templateUrl: 'searchform.component.html'
})


export class SearchformComponent implements OnInit {
    @Input() githubUser: GithubUser;
    @Output() userUpdated: EventEmitter<GithubUser> = new EventEmitter<GithubUser>();

    constructor(private _githubService: GithubService) {
        // Component'e input olarak geçilen parametre burada undefined, OnInit'te Object halinde.
    }

    ngOnInit() {

        if (this.githubUser) {
            this.githubUser.user = false;
            this.getUserInformation();
        }

    }

    searchUser() {
        if (this.githubUser.userName && this.githubUser.userName.length > 0) {
            this._githubService.updateUser(this.githubUser.userName);
            this.getUserInformation();
        } else {
            this.githubUser.user = false;
            //demo
        }
    }

    getUserInformation() {
        if (this.githubUser.userName && this.githubUser.userName.length > 0) {

            this._githubService.getUser().subscribe(user => {
                this.githubUser.user = user;
                this.userUpdated.emit(this.githubUser);
            },
                (err) => {
                    console.log('err:' + err);
                    this.githubUser.user = false;
                },
                () => console.log('Done')
            );



            this._githubService.getRepos().subscribe(repos => {
                // console.log(repos);
                this.githubUser.repos = repos;
                this.userUpdated.emit(this.githubUser);
            },
                (err) => {
                    console.log('err:' + err);
                    this.githubUser.user = false;
                },
                () => console.log('Done')
            );

        }
    }
}
