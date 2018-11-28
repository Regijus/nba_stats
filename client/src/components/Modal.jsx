import React from 'react';
import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;

    this.toggle();
    onSubmit();
  }

  render() {
    const { title, body, buttonLabel, btncolor } = this.props;

    return (
      <div>
        <Button variant="contained" color={btncolor} onClick={this.toggle}>{buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{ title }</ModalHeader>
          <ModalBody>{ body }</ModalBody>
          <ModalFooter>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
            <Button variant="contained" color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalWindow;