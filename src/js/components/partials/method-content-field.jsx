import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'antd';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createBlockStyleButton, {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton
} from 'draft-js-buttons';
import '../../../less/editor-layout.less';

const FormItem = Form.Item;

const Paragraph = createBlockStyleButton({
    blockType: 'paragraph',
    children: 'P'
});

class HeadlinesPicker extends Component {
    constructor(props) {
        super(props);
        
        this.onWindowClick = this.onWindowClick.bind(this);
    }
    
    componentDidMount() {
        setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    }
    
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    onWindowClick() {
        this.props.onOverrideContent(undefined);
    }

    render() {
        const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
        return (
            <div>
                {buttons.map((Button, i) => // eslint-disable-next-line
                    <Button key={i} {...this.props} />
                )}
            </div>
        );
    }
}


class HeadlinesButton extends Component {
    constructor(props) {
        super(props);
        
        this.onClick = this.onClick.bind(this);
    }
    
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    onClick() {
        this.props.onOverrideContent(HeadlinesPicker);
    }

    render() {
        return (
            <div className="headlineButtonWrapper">
                <button onClick={this.onClick} className="headlineButton">
                    H
                </button>
            </div>
        );
    }
}










const toolbarPlugin = createToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        Separator,
        HeadlinesButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        Paragraph
    ]
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text = 'The toolbar above the editor can be used for formatting text, as in conventional static editors  …';

/**
 * form field to add the important content of the method
 * @extends Component
 */
export class MethodContentField extends Component {
    constructor(props) {
        super(props);
        
        this.state = {editorState: createEditorStateWithText(text)};
        
        this.onChange = this.onChange.bind(this);
        this.focus = this.focus.bind(this);
    }
    
    onChange(editorState) {
        this.setState({editorState});
    }
    
    focus() {
        this.editor.focus();
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        const {getFieldDecorator } = this.props.form;
        
        return (
            <div className={this.props.className}>
                <Row>
                    <Col span={24}>
                        <FormItem className="editor paper-style">
                            {getFieldDecorator('methodDescription')(
                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    plugins={plugins}
                                    ref={(element) => { this.editor = element; }}
                                />
                            )}
                        </FormItem>
                        <Toolbar />
                    </Col>
                </Row>
                <FormItem>
                    <Button className="next-step" type="primary" onClick={this.props.nextStep}>Weiter</Button>
                    <Button onClick={this.props.prevStep}>Zurück</Button>
                </FormItem>
            </div>
        );
    }
}