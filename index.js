const colour = require('colour');
const prettyjson = require('prettyjson');

const DEFAULT_THEME = {
  info: 'green',
  warn: 'orange',
  error: 'red bold',
  debug: 'yellow',
  number: 'blue',
};

const LEVEL = {
  error: 1,
  warn: 2,
  info: 3,
  debug: 3,
  all: Infinity,
  white: Infinity,
  none: - Infinity,
}

let _level = LEVEL.all;

const _log = function (color='white') {
  // Exit early
  if (LEVEL[color] && LEVEL[color] > _level) return;

  let args = [];
  for (let i in arguments) {
    if (i == 0) continue

    // String coloring
    if (typeof arguments[i] === 'string') {
      args[i - 1] = arguments[i][color];
    }

    // Object rendering
    else if (typeof arguments[i] === 'object') {
      args[i - 1] = prettyjson.render(arguments[i]);
    }

    // Number Coloring
    else if (typeof arguments[i] === 'number') {
      args[i - 1] = ('' + arguments[i]).number;
    }
  }

  console.log.apply(this, args);
}

const log = _log.bind(_log, 'white');

// log methods
log.info = _log.bind(_log, 'info');
log.debug = _log.bind(_log, 'debug');
log.warn = _log.bind(_log, 'warn');
log.warning = log.warn;
log.error = _log.bind(_log, 'error');
log.err = log.error;

// Log Setting Methods
log.setLevel = level => _level = LEVEL[level];
log.enableAll = log.setLevel.bind(_log, 'all');
log.disableAll = log.setLevel.bind(_log, 'none');

const _customFns = [];
log.setTheme = function (theme) {
	color.setTheme(Object.assign({}, DEFAULT_THEME, theme);
	
	_customFns.forEach(k => delete log[k]);

	for (let key in theme) {
		_customFns.push(key);
		if (!log[key]) {
			log[key] = _log.bind(_log, key));
		}
	}
}

// Level Object ENUM
log.LEVEL = LEVEL;

// Set the default Theme
log.setTheme();

module.exports = log;
