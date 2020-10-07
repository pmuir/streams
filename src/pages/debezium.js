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
  Grid,
  GridItem,
  PageSection,
  PageSectionVariants,
  Popover,
  Text,
  TextContent,
  TextInput,
  Title,
  Wizard
} from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';
import { css } from '@patternfly/react-styles';
import logoMysql from '../images/logo-mysql.png';
import logoMongDb from '../images/logo-mongodb.png';
import logoPostgres from '../images/logo-postgres.png';
import logoMssql from '../images/logo-mssql.png';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';

export const DebeziumPage = () => {
  const [connector, setConnector] = React.useState('mysql')
  const [table, setTable] = React.useState('Select')
  const [streamName, setStreamName] = React.useState('')
  const history = useHistory();

  const SelectConnector = (
    <Gallery hasGutter>
      <GalleryItem>
        <Card className={css("app-c-selectable-card", connector === 'mysql' && 'app-m-focus')} isSelectable={true} onClick={() => setConnector('mysql')}>
          <CardHeader >
            <CardHeaderMain>
              <img
                src={logoMysql}
                alt="mysql" />
            </CardHeaderMain>
          </CardHeader>
          <CardTitle>MySQL</CardTitle>
          <CardBody isFilled={false}>Connection to MySQL</CardBody>
        </Card>
      </GalleryItem>
      <GalleryItem>
        <Card className={css("app-c-selectable-card", connector === 'postgres' && 'app-m-focus')} isSelectable={true} onClick={() => setConnector('postgres')}>
          <CardHeader>
            <CardHeaderMain>
              <img
                src={logoPostgres}
                alt="postgres db" />
            </CardHeaderMain>
          </CardHeader>
          <CardTitle>PostgresDB</CardTitle>
          <CardBody>Connection to SampleDB</CardBody>
        </Card>
      </GalleryItem>
      <GalleryItem>
        <Card className={css("app-c-selectable-card", connector === 'mongodb' && 'app-m-focus')} isSelectable={true} onClick={() => setConnector('mongodb')}>
          <CardHeader>
            <CardHeaderMain>
              <img
                src={logoMongDb}
                alt="mongo db" />
            </CardHeaderMain>
          </CardHeader>
          <CardTitle>MongoDB</CardTitle>
          <CardBody>Connection to SampleDB</CardBody>
        </Card>
      </GalleryItem>
      <GalleryItem>
        <Card className={css("app-c-selectable-card", connector === 'microsoftsql' && 'app-m-focus')} isSelectable={true} onClick={() => setConnector('microsoftsql')}>
          <CardHeader>
            <CardHeaderMain>
              <img
                src={logoMssql}
                alt="SQL server" />
            </CardHeaderMain>
          </CardHeader>
          <CardTitle>SQL Server</CardTitle>
          <CardBody>Connection to SampleDB</CardBody>
        </Card>
      </GalleryItem>
    </Gallery>
  )

  const ConfigureConnection = (
    <React.Fragment>
      <Form>
        <Title size="2xl" headingLevel="h2">
          Configure Connection
        </Title>
        <FormGroup
          label="Name"
          labelIcon={
            <Popover
              headerContent={
                <div>
                  Header
                </div>
              }
              bodyContent={
                <div>
                  Body
                </div>
              }
            >
              <button
                aria-label="More info for name field"
                onClick={e => e.preventDefault()}
                aria-describedby="simple-form-name"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
            </Popover>
          }
          isRequired
          fieldId="simple-form-name"
          helperText="Please provide your full name"
        >
          <TextInput
            isRequired
            type="text"
            id="simple-form-name"
            name="simple-form-name"
            aria-describedby="simple-form-name-helper"
            // value=""
            // onChange={sel => setTable(sel)}
            // onChange={this.handleTextInputChange1}
          />
        </FormGroup>
        <Grid hasGutter>
          <GridItem sm={10}>
            <FormGroup
              label="Connection URL"
              labelIcon={
                <Popover
                  headerContent={
                    <div>
                      Header
                    </div>
                  }
                  bodyContent={
                    <div>
                      Body
                    </div>
                  }
                >
                  <button
                    aria-label="More info for name field"
                    onClick={e => e.preventDefault()}
                    aria-describedby="simple-form-name"
                    className="pf-c-form__group-label-help"
                  >
                    <HelpIcon noVerticalAlign />
                  </button>
                </Popover>
              }
              isRequired
              fieldId="configure-connection-url"
              helperText="Please provide your full name"
              isRequired
            >
              <TextInput
                isRequired
                type="url"
                id="configure-connection-url"
                name="configure-connection-url"
                // value=""
                // onChange={this.handleTextInputChange2}
              />
            </FormGroup>
          </GridItem>
          <GridItem sm={2}>
            <FormGroup label="Port" isRequired fieldId="configure-connection-port">
              <TextInput
                isRequired
                type="text"
                id="configure-connection-port"
                name="configure-connection-port"
                // value=""
                // onChange={this.handleTextInputChange2}
              />
            </FormGroup>
          </GridItem>
        </Grid>
        <FormGroup label="Password" isRequired fieldId="configure-connection-password">
          <TextInput
            isRequired
            type="url"
            id="configure-connection-password"
            name="configure-connection-password"
            // value=""
            // onChange={this.handleTextInputChange2}
          />
        </FormGroup>
        <FormGroup label="Database name" isRequired fieldId="configure-connection-database-name">
          <TextInput
            isRequired
            type="url"
            id="configure-connection-database-name"
            name="configure-connection-database-name"
            // value=""
            // onChange={this.handleTextInputChange2}
          />
        </FormGroup>
        <FormGroup label="Namespace of server/cluster" isRequired fieldId="configure-connection-namespace-server-cluster">
          <TextInput
            isRequired
            type="url"
            id="configure-connection-namespace-server-cluster"
            name="configure-connection-namespace-server-cluster"
            // value=""
            // onChange={this.handleTextInputChange2}
          />
        </FormGroup>
      </Form>
    </React.Fragment>
  )

  const SelectTables = (
    <React.Fragment>
      <Form isHorizontal>
        <Title size="2xl" headingLevel="h2">
          Select table
        </Title>
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
      <Form isHorizontal>
        <Title size="2xl" headingLevel="h2">
          Create stream
        </Title>
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
      component: ConfigureConnection
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
          // if step is select connector, apply 'pf-m-color-scheme-light-200'
          className='pf-m-color-scheme-light-200'
          // else omit this className
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
