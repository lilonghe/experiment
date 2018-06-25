export default class VM {
	constructor({ el, data }) {
		this.el = el;	
		this.data = this.proxyData(data);
		this.template = document.querySelector(this.el).innerHTML;

		this.render();
	}
	
	proxyData = (data) => {
		let that = this;

		Object.keys(data).map((k, i) => {
			if (typeof(data[k]) == 'object') {
				data[k] = this.proxyData(data[k]);
			}
		})
		var obj = new Proxy(data, {
			get: function (target, key, receiver) {
			  return Reflect.get(target, key, receiver);
			},
			set: function (target, key, value, receiver) {
			  setTimeout(() => that.render());
			  return Reflect.set(target, key, value, receiver);
			}
		});

		

		return obj;
	}

	onChangeData = (data) => {
		this.render();
	}

	render() {
		let rawHtml = this.template;
		let matchEles = rawHtml.match(/\{\{([^\}]+)\}\}/g);
		for(let i=0; i<matchEles.length; i++) {
			let key = matchEles[i].substr(2, matchEles[i].length - 4);
			let real;
			if (key.indexOf('.')!=-1) {
				let keyChain = key.split('.');
				real = this.data;
				keyChain.map(k => {
					real = real[k]
				});
			} else {
				real = this.data[key];
			}


			rawHtml = rawHtml.replace(matchEles[i], real)
		}
		document.querySelector(this.el).innerHTML = rawHtml;
	}
}