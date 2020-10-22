import { Injectable } from '@angular/core';
import { CachingOptions } from '@app/caching.options';


@Injectable({
  providedIn: 'root'
})
export class CachingService {

  	constructor() {}

  	has<T>(cacheKey: string): boolean {
  		const val = localStorage.getItem(cacheKey);
  		return val !== undefined && val !== null && val !== '';
  	}

  	get<T>(cacheKey: string): T {
  		// if(typeof T !== 'object') {
  		// 	return eval(localStorage.getItem(cacheKey));
  		// } else {
  		// 	return JSON.parse(localStorage.getItem(cacheKey));
  		// }
  		// return eval(localStorage.getItem(cacheKey));
  		return JSON.parse(localStorage.getItem(cacheKey)).value;
  	}

  	set<T>(cacheKey: string, cacheVal: Object): void {
  		localStorage.setItem(cacheKey, JSON.stringify({value: cacheVal}));
  	}
}
