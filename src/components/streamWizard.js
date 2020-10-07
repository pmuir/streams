import React from 'react';
import {
  ActionGroup,
  Button,
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelBody,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Modal,
  Radio,
  Text,
  TextContent,
  TextInput
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import imgAws from './aws.png';
import imgAzure from './azure.png';
import imgGcp from './gcp.png';
import './stream-modal.scss';

// Only 1 step so we can make a modal
export const StreamWizard = ({ onSubmit }) => {
  const [cloudProvider, setCloudProvider] = React.useState('aws');
  const [region, setRegion] = React.useState('us-east1');
  const [name, setName] = React.useState('');
  const [env, setEnv] = React.useState('');
  const [preset, setPreset] = React.useState('Trial');
  const panelContent = (
    <DrawerPanelContent widths={{ default: 'width_50', lg: 'width_33' }}>
      <DrawerPanelBody>
        <TextContent>
          <Text>
            Streams instance configuration
          </Text>
          <Text>
            Kafka stuff
          </Text>
        </TextContent>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  const drawerContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium est a porttitor vehicula. Quisque vel commodo urna. Morbi mattis rutrum ante, id vehicula ex accumsan ut. Morbi viverra, eros vel porttitor facilisis, eros purus aliquet erat,nec lobortis felis elit pulvinar sem. Vivamus vulputate, risus eget commodo eleifend, eros nibh porta quam, vitae lacinia leo libero at magna. Maecenas aliquam sagittis orci, et posuere nisi ultrices sit amet. Aliquam ex odio, malesuada sed posuere quis, pellentesque at mauris. Phasellus venenatis massa ex, eget pulvinar libero auctor pretium. Aliquam erat volutpat. Duis euismod justo in quam ullamcorper, in commodo massa vulputate.';

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
    <Modal hasNoBodyWrapper isOpen variant="large" showClose={false} title="Create a Streams instance" className="mfe-c-stream-modal">
      <Drawer isStatic>
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody hasPadding>
            <Form onSubmit={onFormSubmit}>
              <FormGroup label="Cloud provider">
                <Flex direction={{ default: 'column', lg: 'row' }} flexWrap={{ default: 'nowrap' }}>
                  {[
                    { img: imgAws, value: 'aws' },
                    { img: imgAzure, value: 'azure' },
                    { img: imgGcp, value: 'gcp' }
                  ].map(({ img, value }) =>
                    <FlexItem>
                      <Button
                        key={value}
                        className={css('wizard-img', cloudProvider === value && 'wizard-img-focus')}
                        variant="link"
                        isInline
                        onClick={() => setCloudProvider(value)}
                      >
                        <img src={img} />
                      </Button>
                    </FlexItem>
                  )}
                </Flex>
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
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </Modal>
  );
};
