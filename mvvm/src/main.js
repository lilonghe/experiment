import VM from './vm';

window.onload = function () {
	window.app = new VM({
		el: "#root",
		data: {
			name: "tom"
		}
	})
}