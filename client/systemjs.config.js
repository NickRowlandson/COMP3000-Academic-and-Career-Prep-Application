var isPublic = typeof window != "undefined";

(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   (isPublic)? '@angular' : 'node_modules/@angular',
    // '@angular/animations':        (isPublic)? '@angular/animations': 'node_modules/@angular/animations/bundles/animations.umd.js',
    // '@angular/animations/browser': (isPublic)? '@angular/animations/browser': 'node_modules/@angular/animations/bundles/animations-browser.umd.js',
    // '@angular/platform-browser/animations': (isPublic)? '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    'rxjs':                       (isPublic)? 'rxjs' : 'node_modules/rxjs',
    'lodash':                     (isPublic)? 'lodash' : 'node_modules/lodash',
    'moment':                     (isPublic)? 'moment': 'bower_components/moment/moment',
    'ng2-charts':                 (isPublic)? 'ng2-charts': 'node_modules/ng2-charts',
    //'angular2-datatable':         (isPublic)? 'angular2-datatable': 'node_modules/angular2-datatable',
    'primeng':                    (isPublic)? 'primeng': 'node_modules/primeng'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'lodash':                     { main: 'index.js', defaultExtension: 'js' },
    'moment':                     { main: 'moment.js', defaultExtension: 'js' },
    'ng2-charts':                 { main: 'index.js', defaultExtension: 'js' },
    //'angular2-datatable':         { main: 'index.js', defaultExtension: 'js' },
    'primeng':                    { defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade'
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
