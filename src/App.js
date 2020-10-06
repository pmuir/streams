import { HashRouter, Route, Switch } from "react-router-dom";

import React from "react";
import Page from 'nav/Page';
import routes from "nav/routes";

const App = () => {
  
  console.log('routes', routes);

  return (
    <HashRouter>
      <Page>
        <Switch>
          {routes.map(({ path, component: Component, exact }) => (
            <Route
              key={path}
              path={path}
              component={Component}
              exact={exact}
            />
          ))}
        </Switch>
      </Page>
    </HashRouter>
  );
}

export default App;
