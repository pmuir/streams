import React from 'react';
import {
  Card,
  Divider,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent
} from '@patternfly/react-core';
import CreateConnectorPage from 'debeziumuipoc/debeziumCreateConnector';

export const DebeziumCreatePage = () => {
  let dataCaptures = localStorage.getItem('dataCaptures')
  dataCaptures = dataCaptures ? JSON.parse(dataCaptures) : [];
  console.log('dataCaptures', dataCaptures);

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">
            Change data capture
          </Text>
        </TextContent>
      </PageSection>
      <Divider />
      <PageSection style={{ backgroundColor: 'var(--pf-global--BackgroundColor--light-300)' }}>
        <Card style={{ height: "100%"}} isFlat>
          <CreateConnectorPage />
        </Card>
      </PageSection>
    </React.Fragment>
  );
}
