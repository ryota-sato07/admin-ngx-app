import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { Location }                 from '@angular/common';

import { Member }                   from '../member';
import { MemberService }            from '../member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @Input() member?: Member;

  constructor(
    private route:         ActivatedRoute,
    private location:      Location,
    private memberService: MemberService,
  ) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.memberService.getMember(id)
      .subscribe(member => this.member = member);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.member) {
      this.memberService.updateMember(this.member)
        .subscribe(() => this.goBack());
    }
  }

}
