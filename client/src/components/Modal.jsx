import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { title, body, buttonLabel, btncolor } = this.props;
    return (
      <div>
        <Button color={btncolor} onClick={this.toggle}>{buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{ title }</ModalHeader>
          <ModalBody>
            { body }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalWindow;