import React from 'react';
import { fullToolbar } from '../editor';

const sanitize = (text) => {
    // replace &nbsp; with space and .trim()
    const clean = text.replace(/&nbsp;/g, ' ').trim();

    // remove <br> tag from end of line
    return (clean.endsWith('<br>'))
        ? clean.slice(0, clean.length-4)
        : clean;
};


// const validate = (text) => {
//     /*
//     only tags are <i>, </i>, <b>, </b> <a ...>, </a>
//     number of open tags are equal to number of closing tags
//     there is no closing tag before an opening tag
//      */
//     return text;
// };
//
// const findFirstInlineTag = (text) => {
//     const indices = [
//         {
//             tag: 'a',
//             value: text.indexOf('<a')
//         },
//         {
//             tag: 'b',
//             value: text.indexOf('<b>')
//         },
//         {
//             tag: 'i',
//             value: text.indexOf('<i>')
//         },
//     ];
//
//     const first = indices.reduce((a,b) => {
//         const one = (a.value === -1) ? b : a;
//         const two = (b.value === -1) ? a : b;
//         return (one.value < two.value) ? one : two;
//     });
//
//     return (first.value === -1) ? null : first;
// };


// const containsInline = (text) => {
//     const tags = ['<i>', '<b>', '<a', '</a>', '</b>', '</i>'];
//     let includes = false;
//     tags.map((tag) => {
//         includes = includes ? true : text.includes(tag);
//     });
//     return includes;
// };


/**
 * @todo none of the methods can be called on existing react elements! :-(
 * @type {{link(*): *, bold(*): *, italic(*): *}}
 */
const inline = {
    process(text) {
        //@todo "improve" (=reduce) the *full* toolbar? (How do I know which options where possible during creation?)

        fullToolbar.map((fn) => {
            text = inline[fn](text);
        });
        return text;
    },

    italic(text) {
        const openTag = '<i>';
        const closeTag = '</i>';

        // const test = 'one <i>italic <b>nested bold</b> end italic </i> two <i>three</i> four';

        if (typeof text === 'object') {
            return (text);
        }

        return text.split(openTag).reduce(function(a, b) {
            const tmp = b.split(closeTag);
            return (
                <span>
                    {inline.process(a)}<i>{inline.process(tmp[0])}</i>{inline.process(tmp[1])}
                </span>
            );
        });
    },

    bold(text) {
        const openTag = '<b>';
        const closeTag = '</b>';

        if (typeof text === 'object') {
            return (text);
        }

        return text.split(openTag).reduce(function(a, b) {
            let tmp = b.split(closeTag);
            return (
                <span>
                    {inline.process(a)}<b>{inline.process(tmp[0])}</b>{inline.process(tmp[1])}
                </span>
            );
        });
    },

    link(text) {
        return text;
    }
};

function Paragraph(props) {
    let { text } = props.data;
    const { key } = props;
    
    text = inline.process(sanitize(text));

    return (<p key={key}>{text}</p>);
}

function ListItem(props) {
    let { text } = props;
    const { key } = props;

    text = sanitize(text);
    fullToolbar.map((fn) => {
        text = inline[fn](text);
    });

    return (<li key={key}>{text}</li>);
}

function List(props) {
    // workaround for weird bug. Should be fixed @todos
    if (props.data === 'Object' && typeof props.data === 'string') return (<span/>);

    const { items, style } = props.data;
    const { key } = props;

    const itemsList = items.map((item,i) => <ListItem text={item} key={i}/>);

    return (style === 'ordered')
        ? (<ol key={key}>{itemsList}</ol>)
        : (<ul key={key}>{itemsList}</ul>);
}

function Header(props) {
    let { text, level } = props.data;
    const { key } = props;

    // text = sanitize(text);
    // fullToolbar.map((fn) => {
    //     text = inline[fn](text);
    // });

    text = inline.process(text);


    switch (level) {
    case 1:
        return (<h1 key={key}>{text}</h1>);
    case 2:
        return (<h2 key={key}>{text}</h2>);
    case 3:
        return (<h3 key={key}>{text}</h3>);
    case 4:
        return (<h4 key={key}>{text}</h4>);
    case 5:
        return (<h5 key={key}>{text}</h5>);
    case 6:
        return (<h6 key={key}>{text}</h6>);
    }
}



export function BlockContent(props) {
    const { content } = props;

    // const link = (text) => {
    //     //@todo extract link!
    //     return text;
    // };
    // const bold = (text) => {
    //     //@todo same as italic but bold!
    //     return text;
    // }
    //
    // const table = (text) => {
    //     //@todo how?!
    //     return text;
    // };
    //
    // const delimiter = () => {
    //     return (<hr/>);
    // };
    //
    // const quote = (text) => {
    //     return (<blockquote>{text}</blockquote>);
    // };
    //
    // const warning = (text) => {
    //     //@todo
    //     return text;
    // };
    //
    // const image = (text) => {
    //     return text;
    // };

    return (
        <div>
            {
                content.blocks.map((item, counter) => {
                    switch (item.type) {
                    case 'paragraph':
                        return <Paragraph data={item.data} key={counter} />;
                    case 'list':
                        return <List data={item.data} key={counter} />;
                    case 'header':
                        return <Header data={item.data} key={counter} />;
                    }
                })
            }
        </div>
    );
}
