import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from '../../../services/state.service';
import { NewsService } from '../../../services/news.service';
import { News } from '../../../models/News.model';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {


  public tabNews: News[] = [];
  public part: number;
  public loading: boolean;
  private partSub: Subscription;
  private newsSub: Subscription;

  constructor(private newsService: NewsService,
    private state: StateService,
    private router: Router) { }


  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.newsSub = this.newsService.tabNews$.subscribe(
      (tabNews) => {
        this.tabNews = tabNews;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.newsService.gettabNews();
  }

  ngOnDestroy() {
    this.newsSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
