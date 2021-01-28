import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { Home } from './home.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  
  item_list: Home[] = [];

  item_fetched_event_emitter = new Subject<Home[]>();

  ItemListObservable() {
    return this.item_fetched_event_emitter.asObservable();
  }

  getItemList() {
    this.http.get<{ message: string, ilist: Home[]}>(environment.apiUrl+'/api/items')
              .subscribe((resultdata) => {
                this.item_list = resultdata.ilist;
                this.item_fetched_event_emitter.next([...this.item_list]);

              });
  }

  
  getItemListByStatus(status: any) {
    this.http.get<{ message: string, ilist: Home[]}>(environment.apiUrl+'/api/items/' + status)
              .subscribe((resultdata) => {
                this.item_list = resultdata.ilist;
                this.item_fetched_event_emitter.next([...this.item_list]);

              });
  }

  getSingleItem(itemid: string) {
    return this.http.get<{ message: string, idata: any }>(environment.apiUrl + '/api/items/item/' + itemid);
  }

  getSearchedItem(item: any) {
    this.http.get<{ message: string, sdata: Home[]}>(environment.apiUrl+'/api/items/search/' + item)
              .subscribe((resultdata) => {
                this.item_list = resultdata.sdata;
                this.item_fetched_event_emitter.next([...this.item_list]);

    });
  }


}
