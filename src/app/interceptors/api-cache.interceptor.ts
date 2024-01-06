import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, shareReplay, tap} from 'rxjs/operators';

@Injectable()
export class ApiCacheInterceptor implements HttpInterceptor {

  private cache = new Map<string , HttpResponse<any>>();
  private endPointToCache = new Set([
    'products?limit=100',
    'products/categories'
  ]);
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url.replace(environment.apiURL, '');
    if (this.endPointToCache.has(url)){
      const cachedResponse = this.cache.get(request.url);
      // const cachedResponse = JSON.parse(localStorage.getItem(request.url));
      if (cachedResponse){
        return of(cachedResponse);
      }
      return next.handle(request).pipe(
        tap((response) => {
          if (response instanceof  HttpResponse){
            this.cache.set(request.url, response);
            // localStorage.setItem(request.url, JSON.stringify(response));
          }
        })
        // , shareReplay(1),
        // catchError(error => {
        //   // Log error and other code - return default value on error
        //   return of(null);
        // })
      );
    }
    return next.handle(request);
  }
}
