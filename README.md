# Bananarama

A smallish build system for static websites and other odd jobs.

## Installation

1. `git clone git@github.com:maxariss/bananarama.git`
2. `cd bananarama`
3. `npm install`
4. `jspm install`
5. `gulp`

## Usage

##### Gulp
* `gulp watch` watches for any changes
* `gulp build` builds project to `dist` directory
* `gulp package` zips up project into `packages` directory with version #
* `gulp deploy` syncs project with remote via `SSH` and `rsync` (see gulpfile)

## Things it does

##### Styles
* `SASS` compiling
* Autoprefixer

##### Javascript
* `JSPM` bundling
* Transpiles `ES6` with `Babel`
* Optional modular classMapper

##### HTML
* `Nunjucks` templating
* `JSON` page data
* Optimizes images

##### Other
* `SCSS` and `ES6` Sourcemaps
* BrowserSync
* ASCII tattoo
* `SCSS` & `JSON` lint
* Deploy with `rsync`

## Firebase
* `npm install -g firebase-tools`
* `firebase serve`

## TODO
* Add `ES6` linting
* Create some sort of `JSON` database adapter

## Credits

Maxwell Ariss

## License

MIT License
