import { Injectable }              from '@angular/core';
import { Observable, of }          from 'rxjs';
import { Member }                  from './member';
import { MessageService }          from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEMBERS }                 from './mock-members';
import { catchError, tap }         from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private membersUrl = 'api/members';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http:           HttpClient,
    private messageService: MessageService
  ) { }

  //-- [ Methods ] -------------------------------------------------------------
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl)
      .pipe(
        tap(members => this.log('社員データを取得しました')),
        catchError(this.handleError<Member[]>('getMembers', []))
      )
  }

  getMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url)
      .pipe(
        tap(_ => this.log(`社員データ(id=${id})を取得しました`)),
        catchError(this.handleError<Member>(`getMember id=${id}`))
      );
  }

  //-- [ Methods ] -------------------------------------------------------------
  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member, this.httpOptions)
      .pipe(
        tap((newMember: Member) => this.log(`社員データ(id=${newMember.id})を追加しました`)),
        catchError(this.handleError<Member>('addMember'))
      );
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, this.httpOptions)
      .pipe(
        tap(_ => this.log(`社員データ(id=${member.id})を変更しました`)),
        catchError(this.handleError<any>('updateMember'))
      );
  }

  deleteMember(member: Member | number): Observable<Member> {
    const id  = typeof member === 'number' ? member : member.id;
    const url = `${this.membersUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`社員データ(id=${id})を削除しました`)),
        catchError(this.handleError<Member>('deleteMember'))
      );
  }

  //-- [ Methods ] -------------------------------------------------------------
  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`${term} にマッチする社員データが見つかりました`)),
        catchError(this.handleError<Member[]>('searchMember', []))
      );
  }

  //-- [ Methods ] -------------------------------------------------------------
  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} 失敗: ${error.message}`);

      return of(result as T);
    }
  }
}
