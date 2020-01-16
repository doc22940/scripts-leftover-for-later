/* eslint-disable no-restricted-globals */
const count = (from, to) => {
  for (let current = from; current <= to; current++) {
    if (current === to) {
      self.postMessage({ finished: true });
    }
  }
};

self.addEventListener('message', (event) => {
  if (event.data.count) {
    count(
      event.data.count.from ? event.data.count.from : 0,
      event.data.count.to ? event.data.count.to : 0
    );
  }
});
