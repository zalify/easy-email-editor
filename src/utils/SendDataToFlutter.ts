
export function postMessageToParent(message: any) {
  // Define the target origin (change this to your specific origin)
  const targetOrigin = 'http://localhost:8080'; // Replace with your target origin

  // Send the message to the parent window
  window.parent.postMessage(JSON.stringify(message), targetOrigin);
}
