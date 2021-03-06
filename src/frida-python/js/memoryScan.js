// Find the module for the program itself, always at index 0:
const m = Process.enumerateModules()[0];

// Or load a module by name:
//const m = Module.load('PayPal');



// Print its properties:
console.log(JSON.stringify(m));

// Dump it from its base address:
console.log(hexdump(m.base));

// The pattern that you are interested in:
const pattern = '4a fe 06 04';

Memory.scan(m.base, m.size, pattern, {
  onMatch(address, size) {
    console.log('Memory.scan() found match at', address,
        'with size', size);

    // Optionally stop scanning early:
    return 'stop';
  },
  onComplete() {
    console.log('Memory.scan() complete');
  }
});

const results = Memory.scanSync(m.base, m.size, pattern);
console.log('Memory.scanSync() result:\n' +
    JSON.stringify(results));