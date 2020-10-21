import { Injectable } from '@angular/core';
import { CachingOptions } from '@app/caching.options';


@Injectable({
  providedIn: 'root'
})
export class CachingService {

  	constructor() {}

  	has(cacheOpt: CachingOptions) {
  		const val = localStorage.getItem(cacheOpt.key);
  		return val !== undefined && val !== null && val !== '';
  	}

  	get(cacheOpt: CachingOptions) {
  		return localStorage.getItem(cacheOpt.key);
  	}

  	set(cacheOpt: CachingOptions, cacheVal: Object) {
  		return localStorage.setItem(cacheOpt.key, cacheVal);
  	}
}
