import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderMain,
  CardTitle,
  Divider,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Gallery,
  GalleryItem,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  TextInput,
  Title,
  Wizard
} from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';

export const DebeziumPage = () => {
  const [connector, setConnector] = React.useState('mysql')
  const [table, setTable] = React.useState('Select')
  const [streamName, setStreamName] = React.useState('')
  const history = useHistory();
  
  const SelectConnector = (
    <Gallery hasGutter>
      <GalleryItem>
        <Card className="pf-m-center-content" isSelectable={true} onClick={() => setConnector('mysql')}>
          <CardHeader>
            <CardHeaderMain>
              <img
                src="https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-MySQL.ff87215b43fd7292af172e2a5d9b844217262571.png"
                alt="mysql"
                style={{ height: '100px' }} />
            </CardHeaderMain>
          </CardHeader>
          <CardTitle>MySQL</CardTitle>
          <CardBody>Connection to MySQL</CardBody>
        </Card>
      </GalleryItem>
      <GalleryItem>
        <Card className="pf-m-center-content" isSelectable={true} onClick={() => setConnector('postgres')}>
          <CardHeader>
            <CardHeaderMain>
              <img
                src="http://p7.hiclipart.com/preview/707/928/892/postgresql-logo-database-management-system-vector-graphics-sql-logo.jpg"
                alt="postgres db"
                style={{ height: '100px' }} />
            </CardHeaderMain>
          </CardHeader>
          <CardTitle>PostgresDB</CardTitle>
          <CardBody>Connection to SampleDB</CardBody>
        </Card>
      </GalleryItem>
      <GalleryItem>
        <Card className="pf-m-center-content" isSelectable={true} onClick={() => setConnector('mongodb')}>
          <CardHeader>
            <CardHeaderMain>
              <img
                src="https://static.wixstatic.com/media/811ddc_20c16a8d6f3b4d7e83e5970b17026b4e~mv2.png"
                alt="mongo db"
                style={{ height: '100px' }} />
            </CardHeaderMain>
          </CardHeader>
          <CardTitle>MongoDB</CardTitle>
          <CardBody>Connection to SampleDB</CardBody>
        </Card>
      </GalleryItem>
      <GalleryItem>
        <Card className="pf-m-center-content" isSelectable={true} onClick={() => setConnector('microsoftsql')}>
          <CardHeader>
            <CardHeaderMain>
              <img
                src="https://www.itprotoday.com/sites/itprotoday.com/files/styles/article_featured_retina/public/uploads/2017/07/microsoft-sql-server595x3350_0.jpg?itok=W0KWNj4q"
                alt="SQL server"
                style={{ height: '100px' }} />
            </CardHeaderMain>
          </CardHeader>
          <CardTitle>SQL Server</CardTitle>
          <CardBody>Connection to SampleDB</CardBody>
        </Card>
      </GalleryItem>
    </Gallery>
  )

  const SelectTables = (
    <React.Fragment>
      <Title size="2xl" headingLevel="h2">
        Select table
      </Title>
      <Form isHorizontal>
        <FormGroup
          label="Table name"
          fieldId="simple-form-name"
        >
          <FormSelect
            value={table}
            onChange={sel => setTable(sel)}
            id="horzontal-form-title"
            name="horizontal-form-title"
            aria-label="Your title"
          >
            <FormSelectOption value="Select" label="Select" />
            <FormSelectOption value="trades" label="trades" />
            <FormSelectOption value="music" label="music" />
          </FormSelect>
        </FormGroup>
      </Form>
    </React.Fragment>
  )

  const CreateStream = (
    <React.Fragment>
      <Title size="2xl" headingLevel="h2">
        Create stream
      </Title>
      <Form isHorizontal>
        <FormGroup
          label="Stream name"
          fieldId="simple-stream-name"
        >
          <TextInput
            value={streamName}
            onChange={val => setStreamName(val)}
            isRequired
            type="text"
            id="simple-stream-name"
            name="simple-stream-name"
            aria-describedby="simple-form-name-helper"
          />
        </FormGroup>
      </Form>
    </React.Fragment>
  )

  const wizardSteps = [
    { name: 'Select connector',
      component: SelectConnector
    },
    { name: 'Configure connection',
      component:
      <p>Step 2 content</p>
    },
    { name: 'Select tables',
      component: SelectTables
    },
    { name: 'Create stream',
      component: CreateStream,
      nextButtonText: 'Finish'
    },
  ];

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Configure a connector</Text>
        </TextContent>
      </PageSection>
      <Divider />
      <PageSection padding={{md: 'noPadding'}}>
        <Wizard
          className='pf-m-color-scheme-light-200'
          steps={wizardSteps}
          onSave={() => {
            // use localstorage to fake a db for now
            let streams = localStorage.getItem('streams')
            streams = streams ? JSON.parse(streams) : [];
            streams.push({
              name: streamName,
              env: 'Default',
              cloudProvider: 'aws',
              region: 'us-east-1',
              preset: 'Trial',
              // connector,
              // table
            })
            localStorage.setItem('streams', JSON.stringify(streams));
            history.push('/services/streams')
          }}
        />
      </PageSection>
    </React.Fragment>
  );
}
