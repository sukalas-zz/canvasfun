class Helpers {
	id(id){
		let el = document.getElementById(id)
		return el;
	} 
	classList(className) {
		let el = document.getElementsByClassName(className);
		return el;
	} 
	create(type) {
		let el = document.createElement(type);
		return el;
	}
	query(query) {
		let el = document.querySelector(query);
		return el;
	}
}