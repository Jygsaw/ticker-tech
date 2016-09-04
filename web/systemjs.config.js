(function (global) {
  System.config({
    paths: {
      "npm:": "node_modules/"
    },
    map: {
      "site": "site",
      "@angular/core": "npm:@angular/core/bundles/core.umd.js",
      "@angular/common": "npm:@angular/common/bundles/common.umd.js",
      "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
      "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
      "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
      "@angular/http": "npm:@angular/http/bundles/http.umd.js",
      "@angular/router": "npm:@angular/router/bundles/router.umd.js",
      "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",
      "classes": "shared/classes",
      "classes-common": "../shared/classes",
      "db": "../shared/db",
      "guards": "shared/guards",
      "rxjs": "npm:rxjs",
      "services": "shared/services",
      "utils": "shared/utils",
    },
    packages: {
      "site": { main: "main.js", defaultExtension: "js" },
      "classes": { defaultExtension: "js" },
      "classes-common": { defaultExtension: "js" },
      "db": { defaultExtension: "js" },
      "guards": { defaultExtension: "js" },
      "rxjs": { defaultExtension: "js" },
      "services": { defaultExtension: "js" },
      "utils": { defaultExtension: "js" },
    }
  });
}(this));
