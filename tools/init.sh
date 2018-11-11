
cordova plugin add https://github.com/petervojtek/cordova-plugin-shell-exec.git
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-app-version

cordova platform add android@~6.3.0

cordova prepare android

cordova build android --release --archs=arm --device --ant
