// import common from '../data/common'
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyANoZLkHa8feji8SgwNuJREylSmRXpU4jg",
    authDomain: "mypop-ccf55.firebaseapp.com",
    databaseURL: "https://mypop-ccf55.firebaseio.com",
    projectId: "mypop-ccf55",
    storageBucket: "mypop-ccf55.appspot.com",
    messagingSenderId: "981025764178"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/logo.png',
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

