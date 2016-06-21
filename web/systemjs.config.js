(function () {
  let map = {
    "@angular": "node_modules/@angular",
    "rxjs": "node_modules/rxjs"
  };

  let packages = {
    "rxjs": { defaultExtension: "js" }
  };

  let ngPackageNames = [
    "common",
    "compiler",
    "core",
    "http",
    "platform-browser",
    "platform-browser-dynamic",
    // note: Angular router v3-alpha does not contain UMD bundle
    // "router",
    "router-deprecated",
    "upgrade"
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages["@angular/" + pkgName] = { main: "index.js", defaultExtension: "js" };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages["@angular/" + pkgName] = { main: "/bundles/" + pkgName + ".umd.js", defaultExtension: "js" };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  let setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // note: Angular router v3-alpha does not contain UMD bundle
  packages["@angular/router"] = {
    main: "index.js",
    defaultExtension: "js",
  };

  // Add Angular package entries
  ngPackageNames.forEach(setPackageConfig);

  System.config({
    map: map,
    packages: packages
  });
}());
