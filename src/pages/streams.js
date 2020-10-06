import React, {useState} from "react";
import {
  EmptyState,
  Title,
  TitleSizes,
  PageSection,
  PageSectionVariants 
} from '@patternfly/react-core';

export const StreamsPage = ({ location }) => {
  const [instances, setInstances] = useState(false);

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size={TitleSizes['2xl']}>
          Openshift streams
        </Title>
      </PageSection>
      <PageSection variant={PageSectionVariants.light} className="pf-m-no-padding">
        <EmptyState>
          I'm an empty state
        </EmptyState>
      </PageSection>
    </React.Fragment>
  );
};
