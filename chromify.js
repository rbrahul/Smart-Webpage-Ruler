var exec = require('child_process').exec;


 exec("cp "+__dirname+"/dist/*.js "+__dirname+"/chrome-extension/js/main.js", function (error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    } else {
        console.log("main.js file has been moved successfully");
    }
});

 exec("cp "+__dirname+"/dist/main.*.css "+__dirname+"/chrome-extension/css/main.css", function (error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    } else{
        console.log("main.css file has been generated successfully");
    }
});
