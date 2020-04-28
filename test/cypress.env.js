const connect = require('connect'),
  path = require('path'),
  serveStatic = require('serve-static'),
  ncp = require('ncp').ncp,
  exec = require('child_process').exec;

function runTests(){
  	return new Promise((res, rej) => {
  		try {
  			exec(`./node_modules/.bin/cypress open`, {}, (err, stdout) => {
          console.log(stdout);
  					if (err) {
  						rej(err);
  					} else {
  						res();
  					}
  			});
  		} catch (e) {
  			rej(e);
  		}
    });
  };


function startServer(){
  connect().use(serveStatic(path.join(__dirname,'./browser'))).listen(7357, function(){
      console.log('Test server running on 7357...');
  });
}

ncp(path.join(__dirname,'../dist'), path.join(__dirname,'browser/assets/order'), function (err) {
 if (err) {
   console.error(err);
   process.exit(1);
 }
 startServer();
});

runTests().then(()=>{
  process.exit(0);
}).catch((e)=>{
  console.error(e);
  process.exit(1);
});
