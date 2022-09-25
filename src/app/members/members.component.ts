import { Component, OnInit } from '@angular/core';
import { Member }            from '../member';
import { MemberService }     from '../member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers()  // Observable
      .subscribe(members => this.members = members)
  }

  add(name: string, position: string): void {
    name = name.trim();
    if (!name || !position) { return; }
    this.memberService.addMember({ name, position } as Member)
      .subscribe(member => {
        this.members.push(member);
    });
  }

  // 削除したメンバー以外のデータを返す
  onDelete(member: Member): void {
    this.members = this.members.filter(m => m !== member);
    this.memberService.deleteMember(member).subscribe();
  }

}
