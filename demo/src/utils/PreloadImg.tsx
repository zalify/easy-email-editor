import { debounce } from 'lodash';

export type EventType = 'progress' | 'error' | 'complete';

export type EventData = {
	count: number;
	total: number;
	error: number;
	current: string;
};

export type EventTypeHandles = {
	[key in EventType]: (data: EventData) => any;
};

export class PreloadImg {
	private imgList: string[] = [];
	private handler: { [key in EventType]: ((data: EventData) => any)[] } = {
	  progress: [],
	  error: [],
	  complete: []
	};
	constructor(imgList: string[]) {
	  this.imgList = imgList;
	}

	load() {
	  const imgList = this.imgList;
	  const total = imgList.length;
	  let count = 0;
	  let error = 0;
	  imgList.map(url => {
	    return new Promise(resolve => {
	      const img = new Image();
	      img.src = url;

	      img.onload = () => {
	        count++;
	        this.handler['progress'].map(fn => {
	          fn({
	            total,
	            error,
	            count,
	            current: url
	          });
	        });

	        if (count === total) {
	          this.handler['complete'].map(fn => {
	            fn({
	              total,
	              error,
	              count,
	              current: url
	            });
	          });
	        }
	      };
	      img.onerror = () => {
	        count++;
	        error++;
	        this.handler['error'].map(fn => {
	          fn({
	            total,
	            error,
	            count,
	            current: url
	          });
	        });

	        if (count === total) {
	          this.handler['complete'].map(fn => {
	            fn({
	              total,
	              error,
	              count,
	              current: url
	            });
	          });
	        }
	      };
	    });
	  });
	}

	on<T extends keyof EventTypeHandles>(type: T, fn: EventTypeHandles[T]) {
	  this.handler[type].push(debounce(fn, 200));
	}

	off<T extends keyof EventTypeHandles>(type: T, fn: EventTypeHandles[T]) {
	  this.handler[type] = this.handler[type].filter(item => item !== fn);
	}
}
