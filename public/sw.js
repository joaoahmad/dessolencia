// console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  // console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  // console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});

self.addEventListener('notificationclick', function(event) {
  var url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
