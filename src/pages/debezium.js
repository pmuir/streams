import React from 'react';
import {
  Divider,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent
} from '@patternfly/react-core';
import DebeziumTable from 'jupyter/debeziumTable';

export const DebeziumPage = () => {
  let dataCaptures = localStorage.getItem('dataCaptures')
  dataCaptures = dataCaptures ? JSON.parse(dataCaptures) : [];
  console.log('dataCaptures', dataCaptures);
  
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Configure a connector</Text>
        </TextContent>
      </PageSection>
      <Divider />
      <PageSection padding={{ md: 'noPadding' }}>
        <DebeziumTable />
      </PageSection>
    </React.Fragment>
  );
}
