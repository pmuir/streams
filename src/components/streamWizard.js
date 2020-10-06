import React from 'react';
import {
  Form,
  FormGroup,
  TextInput,
  Button,
  FormSelect,
  FormSelectOption,
  Modal,
  ActionGroup,
  Radio
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import imgAws from './aws.png';
import imgAzure from './azure.png';
import imgGcp from './gcp.png';
import './streamWizard.css';

// Only 1 step so we can make a modal
export const StreamWizard = ({ onSubmit }) => {
  const [cloudProvider, setCloudProvider] = React.useState('aws');
  const [region, setRegion] = React.useState('us-east1');
  const [name, setName] = React.useState('');
  const [env, setEnv] = React.useState('');
  const [preset, setPreset] = React.useState('Trial');

  function onFormSubmit(ev) {
    ev.preventDefault();
    if (onSubmit) {
      onSubmit({
        cloudProvider,
        region,
        name,
        env,
        preset
      });
    }
  }
  return (
    <Modal isOpen variant="large" showClose={false} title="Create a Streams instance">
      <Form onSubmit={onFormSubmit}>
        <FormGroup label="Cloud provider">
          {[
            { img: imgAws, value: 'aws' },
            { img: imgAzure, value: 'azure' },
            { img: imgGcp, value: 'gcp' }
          ].map(({ img, value }) =>
            <Button
              key={value}
              className={css('wizard-img', cloudProvider === value && 'wizard-img-focus')}
              variant="link"
              isInline
              onClick={() => setCloudProvider(value)}
            >
              <img src={img} />
            </Button>
          )}
        </FormGroup>
        <FormGroup label="Cloud region">
          <FormSelect id="cloud-region" value={region} onChange={option => setRegion(option)}>
            {['us-east1', 'us-east2', 'us-west1', 'us-west2'].map((option, index) => (
              <FormSelectOption key={index} value={option} label={option} id={'select1' + option} />
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup label="Instance name">
          <TextInput id="instance-name" type="text" value={name} onChange={val => setName(val)} />
        </FormGroup>
        <FormGroup label="Environment">
          <FormSelect id="environment" value={env} onChange={option => setEnv(option)}>
            {['Default'].map((option, index) => (
              <FormSelectOption key={index} value={option} label={option} id={'select2' + option} />
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup label="Plan">
          {['Trial', 'Small', 'Medium', 'Large', 'Custom'].map((option, index) => 
            <Radio key={index} name="preset" label={option} id={'radio1' + option} isChecked={option === preset} onClick={() => setPreset(option)} />
          )}
        </FormGroup>
        <ActionGroup>
          <Button variant="primary" type="submit">
            Submit form
          </Button>
          <Button variant="link" onClick={() => onSubmit(false)}>
            Cancel
          </Button>
        </ActionGroup>
      </Form>
    </Modal>
  );
};
