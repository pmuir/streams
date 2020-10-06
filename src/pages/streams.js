import React, {useState} from "react";
import {
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Title,
  PageSection,
  PageSectionVariants 
} from '@patternfly/react-core';
import StreamIcon from '@patternfly/react-icons/dist/js/icons/stream-icon';
import { StreamWizard } from '../components/streamWizard';
import { StreamTable } from '../components/streamTable';

export const StreamsPage = ({ location }) => {
  const [instances, setInstances] = useState([]);
  const [showWizard, setShowWizard] = useState(false);

  function onCreateStream(data) {
    setShowWizard(false);
    if (data) {
      console.log('stream created', data);
      setInstances([
        data,
        ...instances
      ]);
    }
  }

  console.log('instances', instances);
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="2xl">
          Openshift streams
        </Title>
      </PageSection>
      <PageSection style={{ backgroundColor: 'var(--pf-global--BackgroundColor--light-300)' }}>
        {showWizard && <StreamWizard onSubmit={onCreateStream} />}
        {instances.length === 0
          ? (
            <EmptyState variant="xl">
              <EmptyStateIcon icon={StreamIcon} />
              <Title headingLevel="h4" size="lg">
                You haven't created any Streams instances yet.
              </Title>
              <EmptyStateBody>
                Create a streams instance to get started.
              </EmptyStateBody>
              <Button variant="primary" onClick={() => setShowWizard(true)}>
                Create Streams instance
              </Button>
            </EmptyState>
          )
          : (
            <StreamTable instances={instances} onCreateInstance={() => setShowWizard(true)} />
          )
        }
      </PageSection>
    </React.Fragment>
  );
};
