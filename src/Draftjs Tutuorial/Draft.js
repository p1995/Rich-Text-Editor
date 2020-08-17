import React, { Component } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ViewSource from "./ViewSource";
export class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  setEditorState = editorState => {
    this.setState({ editorState });
  };

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.setEditorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbarCustomButtons={[<ViewSource />]}
        ></Editor>
      </div>
    );
  }
}

export default Draft;
