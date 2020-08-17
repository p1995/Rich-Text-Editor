import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, Modifier, convertToRaw, ContentState } from "draft-js";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import $ from "jquery";
export class ViewSource extends Component {
  constructor(props) {
    super(props);

    this.state = { showmodal: false };
  }

  addHTML = () => {
    this.setState({ showmodal: !this.state.showmodal });
  };
  savechanges = value => {
    const { editorState, onChange } = this.props;
    const contentBlock = htmlToDraft(value);
    console.log(contentBlock);
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      htmlToDraft(value),
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
    this.setState({ showmodal: !this.state.showmodal });
  };
  render() {
    return (
      <React.Fragment>
        <div onClick={this.addHTML}>ViewHTML</div>
        <Modal
          show={this.state.showmodal}
          onHide={this.addHTML}
          style={{ position: "absolute", maxWidth: "100%", width: "100%" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              id="viewhtml"
              style={{ width: "100%", height: "100%" }}
              value={draftToHtml(
                convertToRaw(this.props.editorState.getCurrentContent())
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.addHTML}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.savechanges($("#viewhtml").prop("value"))}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ViewSource;
