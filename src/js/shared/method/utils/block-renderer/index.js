import React from 'react';
import { fullToolbar } from '../../../editor';
import { Divider } from 'antd';

const sanitize = (text) => {
    // replace &nbsp; with space and .trim()
    const clean = text.replace(/&nbsp;/g, ' ').trim();

    // remove <br> tag from end of line
    return (clean.endsWith('<br>'))
        ? clean.slice(0, clean.length-4)
        : clean;
};

/**
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
        if (typeof text === 'object') { console.log('object', text); return (text); }

        const openTag = '<i>';
        const closeTag = '</i>';

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
        if (typeof text === 'object') { return (text); }

        const openTag = '<b>';
        const closeTag = '</b>';


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
        if (typeof text === 'object') { return (text); }

        const openTag = '<a ';
        const closeTag = '</a>';

        return text.split(openTag).reduce(function(prefix, link) {
            if (!link.startsWith('href="')) { return text; }
            const back = link.split(closeTag);
            const suffix = back[1];
            const tag = back[0].substring(6).split('">');
            const url = tag[0];
            const inner = tag[1];
            return (
                <span>
                    {inline.process(prefix)}<a href={url}>{inline.process(inner)}</a>{inline.process(suffix)}
                </span>
            );
        });
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
    // workaround for weird bug. Should be fixed @todo
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

    text = inline.process(sanitize(text));

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

function Quote(props) {
    let { text, caption, alignment } = props.data;
    const { key } = props;

    text = inline.process(sanitize(text));
    caption = inline.process(sanitize(caption));

    return(
        <div key={key} className='method-block method-block-quote'>
            <blockquote className='method-block method-block-quote-body'>
                <p align={alignment}>{text}</p>
            </blockquote>
            <cite className='method-block method-block-quote-cite'>{caption}</cite>
        </div>
    );
}

function Warning(props) {
    let { title, message } = props.data;
    const { key } = props;

    message = inline.process(sanitize(message));
    title = inline.process(sanitize(title));

    return (
        <div key={key} className='method-block method-block-warning'>
            <p className='method-block-warning-title'>{title}</p>
            <p className='method-block-warning-message'>{message}</p>
        </div>
    );

}

function Table(props) {
    const { content } = props.data;
    const { key } = props;

    const body = content.map((row, i) => {
        return (
            <tr key={i}>
                {
                    row.map((cell, j) =>
                        <td key={j}>
                            {
                                inline.process(sanitize(cell))
                            }
                        </td>
                    )
                }
            </tr>
        );
    });

    return (
        <table key={key} className="method-block method-block-table">
            <tbody>
                {body}
            </tbody>
        </table>
    );
}

function Delimiter(props) {
    const { key } = props;
    return (
        <Divider key={key}/>
    );
}

export function BlockContent(props) {
    const { content } = props;


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
                    case 'quote':
                        return <Quote data={item.data} key={counter} />;
                    case 'warning':
                        return <Warning data={item.data} key={counter} />;
                    case 'table':
                        return <Table data={item.data} key={counter} />;
                    case 'delimiter':
                        return <Delimiter key={counter}/>;
                    }
                })
            }
        </div>
    );
}
