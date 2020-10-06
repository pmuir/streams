import React from 'react';
import { PageSection, PageSectionVariants, Button } from '@patternfly/react-core';
import Notebook from 'jupyter/notebook';

export const DebeziumPage = () => {
  const [showJupyter, setShowJupyter] = React.useState(false);
  return (
    <PageSection variant={PageSectionVariants.light}>
      wizard goes here
      <br />
      <Button onClick={() => setShowJupyter(!showJupyter)}>
        Add some jupyter down below!
      </Button>
      {showJupyter && <Notebook />}
    </PageSection>
  );
}
