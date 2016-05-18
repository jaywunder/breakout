onmessage = function(event) {
  console.log('worker recieved message:', event.data);
  postMessage({ 'verb' : 'pong' })
}
