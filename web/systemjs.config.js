(function () {
  let map = {
    "rxjs": "node_modules/rxjs"
  };

  let packages = {
    "rxjs": { defaultExtension: "js" }
  };

  System.config({
    map: map,
    packages: packages
  });
}());
