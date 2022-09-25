import { Observable }    from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { Member }        from './member';
import { MemberAction }  from './member.actions';
import { MemberService } from './member.service';

import { State, Action, StateContext, Selector } from '@ngxs/store';

export class MemberStateModel {
  selectedMember?: Member | null;
  members?:        Member[];
}

@State<MemberStateModel>({
  name: 'members',
  defaults: {
    selectedMember: null,
    members:        [],
  }
})

export class MemberState {

  constructor(
    private memberService: MemberService
  ) { }

  //-- [ Selector ] ------------------------------------------------------------
  /** メンバー一覧 **/
  @Selector()
  static members(state: MemberStateModel) {
    return state.members;
  }

  /** 選択中のメンバー **/
  @Selector()
  static selectedMember(state: MemberStateModel) {
    return state.selectedMember;
  }

  //-- [ Action ] --------------------------------------------------------------
  /** サーバーからメンバーを取得する */
  @Action(MemberAction.Load)
  load(ctx: StateContext<MemberStateModel>) {
    return this.memberService.getMembers()
      .pipe(
        tap((data) => {
         ctx.patchState({
           members: data
         });
        }),
      )
  }

  /** IDによりメンバーを選択する。*/
  @Action(MemberAction.Select)
  select(ctx: StateContext<MemberStateModel>, action: MemberAction.Select) {
    const id = action.id;
    return this.memberService.getMember(id)
      .pipe(
        tap((data: Member) => {
         ctx.patchState({
           selectedMember: data
         });
        }),
      )
  }

  /** POST: サーバーに新しいメンバーを登録する */
  @Action(MemberAction.Add)
  addMember(ctx: StateContext<MemberStateModel>, action: MemberAction.Add) {
    const member = action.payload;

    return this.memberService.addMember(member).pipe(
      finalize(() => {
        ctx.dispatch(new MemberAction.Load());
      })
    );
  }

  /** DELETE: サーバーからメンバーを削除 */
  @Action(MemberAction.Delete)
  deleteMember(ctx: StateContext<MemberStateModel>, action: MemberAction.Delete) {
    const member = action.payload;
    const id   = typeof member === 'number' ? member : member.id;

    return this.memberService.deleteMember(member).pipe(
      finalize(() => {
        ctx.dispatch(new MemberAction.Load());
      }),
    );
  }

  /** PUT: サーバー上でメンバーを更新 */
  @Action(MemberAction.Update)
  updateMember(ctx: StateContext<MemberStateModel>, action: MemberAction.Update): Observable<any> {
    const member = action.payload;

    return this.memberService.updateMember(member);
  }
}
