console.log("Start");

setTimeout(() => {
  console.log("Timeout finished");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("End");

// Expected output:
// Start
// End
// Promise resolved
// Timeout finished
