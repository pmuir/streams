const { port } = require('../package.json');
const nodeshift = require('nodeshift');

// Deploy an Application
nodeshift.deploy({
  namespace: {
    name: 'zfe-poc'
  },
  deploy: {
    port
  },
}).then((response) => {
    console.log(response);
    console.log('Application Deployed')
}).catch((err) => {
    console.log(err);
});
