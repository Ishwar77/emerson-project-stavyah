import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Home } from '../home.model';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  searchText = '';

  item_list: Home[] = [];
  
  item_list_sub: Subscription;

  item_detail = new Object();

  // item_searched = new Object();

  itemDetail: any;

  // searchedItem: any;

  // item: string;

  itemid: string;

  constructor(private home_service:HomeService) { }

  ngOnInit(): void {

    this.getItemListFn();
    this.getSingleItem(this.itemid);

  }
  
  ngOnDestroy(): void {
    this.item_list_sub.unsubscribe();
  }

  optRadioOnChange(optRadioVal: any) {
    if (optRadioVal != undefined && optRadioVal != 0) {
      this.home_service.getItemListByStatus(optRadioVal);
      this.item_list_sub = this.home_service.ItemListObservable()
                                              .subscribe((itemlist)=>{
                                                 this.item_list=itemlist;
                                              });
    } else {
      this.getItemListFn();
    }

  }

    getItemListFn() {
    this.home_service.getItemList();
    this.item_list_sub = this.home_service.ItemListObservable()
                                            .subscribe((itemlist)=>{
                                               this.item_list=itemlist;
                                            });
  }

  getSingleItem(itemid) {
    this.itemDetail = new Object();
  this.home_service.getSingleItem(itemid)
                    .subscribe((singleItem) => {
                      this.item_detail = singleItem;
                    })

    console.log(this.item_detail);
    this.itemDetail = this.item_detail['idata'];
    console.log(this.itemDetail);
  }


  // getSearchesItem(item) {
  //   this.searchedItem = new Object();
  // this.home_service.getSearchedItem(item)
  //                   .subscribe((searchedItem) => {
  //                     this.item_searched = searchedItem;
  //                   })

  //   console.log(this.item_searched);
  //   this.searchedItem = this.item_searched['sdata'];
  //   console.log(this.searchedItem);
    
  // }

  getSearchesItem(item: any) {
    this.home_service.getSearchedItem(item);
    this.item_list_sub = this.home_service.ItemListObservable()
                                            .subscribe((itemlist)=>{
                                              this.item_list=itemlist;
                                            });
  }

  onAccept() {
    alert('Accepted Successfully');
  }

  onReject() {
    alert('Rejected');
  }


}
