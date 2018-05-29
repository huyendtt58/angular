import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { GithubFollowersService } from '../services/github-followers.service';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent {
  constructor(private route: ActivatedRoute, private service: GithubFollowersService) { }

  followers = [];

  ngOnInit() {
    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .switchMap(combined => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');
      return this.service.getAll();
    })
    .subscribe(followers => {
      this.followers = followers;
    });
  }

}