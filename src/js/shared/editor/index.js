import React, { Component } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import Table from '@editorjs/table';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Paragraph from '@editorjs/paragraph';

/*
const initialData = {
    time : new Date().getTime()/1000,
    blocks : [{
        type: 'header',
        data: {
            text: 'Einleitung',
            level: 1,
        }
    }, {
        type: 'paragraph',
        data: {
            text: 'Hier kommt die Beschreibung der Methode mit Bildern ... hin. Ziele kommen erst im nächhsten Schritt.',
        }
    }],
    version : '2.12.4'
};
*/




//@todo image support!
/*const config = {
    header: Header,
    list: List,
    link: Link,
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
        inlineToolbar: true,
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
};*/


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
        };

        this.save = this.save.bind(this);
    }


    componentDidMount() {
        const editor = new EditorJS({
            holderId: 'editorjs',
            onChange: () => { this.save(); },
            tools: {
                header: Header,
                list: List,
                link: Link,
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
                    inlineToolbar: true,
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
            },
            data: this.props.data,
        });
        this.setState({editor: editor});
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
                <div id="editorjs"></div>
            </div>

        );
    }
}