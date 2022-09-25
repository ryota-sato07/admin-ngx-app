import { Injectable }        from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member }            from './member';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const members = [
      { id: 11, name: '武山', position: '平社員' },
      { id: 12, name: '駒倉', position: '役員'   },
      { id: 13, name: '長田', position: '役員'   },
      { id: 14, name: '高藤', position: '役員'   },
      { id: 15, name: '浜崎', position: '役員'   },
      { id: 16, name: '緑川', position: '平社員' },
      { id: 17, name: '森谷', position: '平社員' },
      { id: 18, name: '大槻', position: '平社員' },
      { id: 19, name: '岩野', position: '平社員' },
      { id: 20, name: '佐々', position: '平社員' }
    ];

    return { members };
  }

  // id のインクリメントのためのメソッド
  genId(members: Member[]): number {
    return members.length > 0 ? Math.max(...members.map(member => member.id)) + 1 : 11;
  }
}
