import VM from './vm';

window.onload = function () {
	window.app = new VM({
		el: "#root",
		data: {
			name: "tom",
			userinfo: {
				id: 999,
				nickname: 'halen'
			}
		}
	})
}