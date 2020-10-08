import React from 'react';
import {
  Divider,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent
} from '@patternfly/react-core';
import DebeziumWizard from 'jupyter/debeziumWizard';

export const DebeziumPage = () => {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Configure a connector</Text>
        </TextContent>
      </PageSection>
      <Divider />
      <PageSection padding={{ md: 'noPadding' }}>
        <DebeziumWizard />
      </PageSection>
    </React.Fragment>
  );
}
