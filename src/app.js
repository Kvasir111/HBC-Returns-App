if('serviceWorker' in navigator){
	navigator.serviceWorker.register('/src/main.js')
		.then((reg) => console.log("Service worker Registered", reg))
		.catch((err) => console.log("Service worker error", err));

}