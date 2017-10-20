# Easy Fun Log!

Easy Fun Log is a node logging tool.
Many Logging tools have too many features and produce outrageously verbose output.

This tool is for increasing readability of your node output.
Makes it easy to color logs, configure log level, and display json.

### Install
You know the drill.

```
npm install easy-fun-log
```

### Usage
```
const log = require('easy-fun-log');

// Choose your style
log('Default!');
log.info('Info!');
log.warn('Warn!');
log.err('Error!');
log.debug('Debug!');

// Some input is specially rendered
log({objectsRender: true});
log(123, 'Numbers are colored');

// Set Log level
log.setLevel('none');
log.setLevel('all');
log.setLevel('error');
log.setLevel('warn');
log.setLevel('debug');

// Create your own theme!
// Uses colors npm package
log.setTheme({
	info: 'blue',
	warn: ['yellow', 'underline'],
	error: '#FF0011',
	my_custom: 'white'
});

log.info('blue text!');
log.my_custom('white text!');
```

### Upcoming Features
I plan on keeping it simple, while increasing some of it's flexibility.

