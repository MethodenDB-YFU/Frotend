import React, { Component } from 'react';
import { Spin } from 'antd';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import Table from '@editorjs/table';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Paragraph from '@editorjs/paragraph';
import Image from '@editorjs/image';

/*
    @todo image support
    @todo move editor config out of component
    @todo allow config override from calling component
    @todo styling
 */

export const fullToolbar = ['italic', 'bold', 'link'];

export const config = {
    header: {
        class: Header,
        inlineToolbar: ['italic'],
    },
    list: {
        class: List,
        inlineToolbar: true,
    },
    link: {
        class: Link,
        inlineToolbar: true,
    },
    table: {
        class: Table,
        inlineToolbar: true
    },
    delimiter: Delimiter,
    quote: {
        class: Quote,
        inlineToolbar: ['bold'],
    },
    warning: {
        class: Warning,
        inlineToolbar: ['italic', 'bold'],
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    image: {
        class: Image,
        inlineToolbar: true,
    },
};

/**
 * form field to add attachments to the method like graphics or texts
 * @extends Component
 */
export class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editor: null,
            content: '',
            loading: true,
        };

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        const editor = new EditorJS({
            holderId: 'editorjs-'+this.props.id,
            onChange: () => { this.save(); },
            tools: config,
            data: this.props.data,
        });
        this.setState({
            editor: editor,
            loading: false,
        });
    }

    save() {
        this.state.editor.save()
            .then((data) => {
                this.setState({content: data});
                this.props.onChange(this.state.content);
            })
            .catch(() => {
                console.error('Something went wrong while updating');
            });
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        return (
            <div>
                {this.state.loading
                    ? <Spin/>
                    : <div id={'editorjs-' + this.props.id}/>
                }
            </div>

        );
    }
}