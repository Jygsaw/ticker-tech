(function () {
  let map = {
    "@angular": "node_modules/@angular",
    "classes": "shared/classes",
    "guards": "shared/guards",
    "rxjs": "node_modules/rxjs",
    "services": "shared/services",
    "utils": "shared/utils",
  };

  let packages = {
    "classes": { defaultExtension: "js" },
    "guards": { defaultExtension: "js" },
    "rxjs": { defaultExtension: "js" },
    "services": { defaultExtension: "js" },
    "site": { main: "main.js", defaultExtension: "js" },
    "utils": { defaultExtension: "js" },
  };

  let ngPackageNames = [
    "common",
    "compiler",
    "core",
    "forms",
    "http",
    "platform-browser",
    "platform-browser-dynamic",
    "router",
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

  // Add Angular package entries
  ngPackageNames.forEach(setPackageConfig);

  System.config({
    map: map,
    packages: packages
  });
}());
