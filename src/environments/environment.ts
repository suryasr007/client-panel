// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyB6Jf4UGydKWEm6ou5mVkcWiRIKv31cCFg",
    authDomain: "clientplanelprod.firebaseapp.com",
    databaseURL: "https://clientplanelprod.firebaseio.com",
    projectId: "clientplanelprod",
    storageBucket: "clientplanelprod.appspot.com",
    messagingSenderId: "490936161547"
  }
};
