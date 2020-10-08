import { HashRouter, Route, Switch } from "react-router-dom";

import React from "react";
import Page from 'nav/Page';
import routes from "nav/routes";

localStorage.setItem('streams', `[{
  "name": "Sample stream",
  "env": "Default",
  "cloudProvider": "aws",
  "region": "us-east-1",
  "preset": "Trial"
}]`)
localStorage.setItem('dataCaptures', `[{
  "name": "Sample data capture",
  "namespace": "Default",
  "connector": "mysql",
  "connectorURL": "trades-db.rds.aws.amazon.com",
  "connectorPort": "3306",
  "databaseName": "spring-trades-db",
  "table": "trades"
}]`)

const App = () => {
  console.log('routes', routes);

  return (
    <HashRouter>
      <Switch>
        {routes.map(({ path, component: Component, exact }) => (
          <Route
            key={path}
            path={path}
            component={path === "/"
              ? Component // Don't chrome the dashboard page (which is a CRC clone)
              : props => <Page><Component {...props} /></Page>
            }
            exact={exact}
          />
        ))}
      </Switch>
    </HashRouter>
  );
}

export default App;
