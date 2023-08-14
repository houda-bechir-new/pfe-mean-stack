import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { News } from '../models/News.model';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private tabNews: News[] = []
  public tabNews$ = new Subject<News[]>();

  emittabNews() {
    this.tabNews$.next(this.tabNews);
  }


  gettabNews() {
    this.http.get('http://localhost:3000/api/news').subscribe(
      (tabNews: News[]) => {
        if (tabNews) {
          this.tabNews = tabNews;
          this.emittabNews();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getNewsById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/news/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewNews(news: News) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/news', news).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewNewsWithFile(news: News, image: File) {
    return new Promise((resolve, reject) => {
      const newsData = new FormData();
      newsData.append('news', JSON.stringify(news));
      newsData.append('image', image, news.title);
      
      this.http.post('http://localhost:3000/api/news', newsData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyNews(id: string, news: News) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/news/' + id, news).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyNewsWithFile(id: string, news: News, image: File) {
    return new Promise((resolve, reject) => {
      let newsData: News | FormData;
      
        newsData = new FormData();
        newsData.append('news', JSON.stringify(news));
        newsData.append('image', image, news.title);
      
      
      this.http.put('http://localhost:3000/api/news/' + id, newsData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteNews(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/news/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}

