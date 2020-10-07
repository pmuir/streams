import React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Title,
  PageSection,
  PageSectionVariants
} from '@patternfly/react-core';
import StreamIcon from '@patternfly/react-icons/dist/js/icons/stream-icon';
import { StreamTable } from '../components/streamTable';
import { Link } from 'react-router-dom';
import "../app.scss";

export const StreamsPage = () => {
  // use localstorage to fake a db for now
  let streams = localStorage.getItem('streams')
  streams = streams ? JSON.parse(streams) : [];
  console.log('streams', streams);
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="2xl">
          Openshift streams
        </Title>
      </PageSection>
      <PageSection style={{ backgroundColor: 'var(--pf-global--BackgroundColor--light-300)' }}>
        {streams.length === 0
          ? (
            <EmptyState variant="xl">
              <EmptyStateIcon icon={StreamIcon} />
              <Title headingLevel="h4" size="lg">
                You haven't created any Streams instances yet.
              </Title>
              <EmptyStateBody>
                Create a streams instance to get started.
              </EmptyStateBody>
              <Link class="pf-c-button pf-m-primary" to="/services/debezium">
                Add data capture
              </Link>
            </EmptyState>
          )
          : (
            <StreamTable instances={streams} />
          )
        }
      </PageSection>
    </React.Fragment>
  );
};
