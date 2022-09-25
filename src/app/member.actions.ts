import { Member } from './member';

export module MemberAction {

  export const LOAD_MEMBER   = 'Load_Member';
  export const SELECT_MEMBER = 'Select_Member';
  export const ADD_MEMBER    = 'Add_Member';
  export const DELETE_MEMBER = 'Delete_Member';
  export const UPDATE_MEMBER = 'Update_Member';

  export class Load {
    static readonly type = LOAD_MEMBER;
  }

  export class Select {
    static readonly type = SELECT_MEMBER;

    constructor(public id: number) {}
  }

  export class Add {
    static readonly type = ADD_MEMBER;

    constructor(public payload: Member) {}
  }

  export class Delete {
    static readonly type = DELETE_MEMBER;

    constructor(public payload: Member) {}
  }

  export class Update {
    static readonly type = UPDATE_MEMBER;

    constructor(public payload: Member) {}
  }
}

