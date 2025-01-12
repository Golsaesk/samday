'use client';

import React, { useEffect, useState, } from 'react';
import {
  Editor, EditorState, RichUtils, convertToRaw, convertFromRaw,
} from 'draft-js';
import styles from './RichEditor.module.scss';
import {
  BoldIcon, ItalicIcon, OrderedListIcon, UnderlineIcon, UnorderedListIcon,
} from './Icons';
import { Typography, } from '@mui/material';

export default function RichEditor({
  placeHolder,
  onEditorChange,
  errorMessage,
  error,
  autoFocus,
  className = '',
}: {
  value?: string | undefined;
  onEditorChange?: any;
  placeHolder?: string;
  errorMessage?: string;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
}) {

  const editor = React.useRef<any>(null);
  const emptyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
      {
        text: '',
        key: 'foo',
        type: 'unstyled',
        entityRanges: [],
        inlineStyleRanges: [],
        depth: 0,
      },
    ],
  });

  const [richEditorState, setRichEditorState, ] = useState(() =>
    EditorState.createWithContent(emptyContentState)
  );

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    try {
      if (autoFocus) {
        focusEditor();
      }
    } catch {
    }
  }, []);

  const StyleButton = (props: any) => {
    try {
      const currentInlineStyle = richEditorState.getCurrentInlineStyle();
      const currentBlockType = RichUtils.getCurrentBlockType(richEditorState);
      let className = 'tools';
      if (currentInlineStyle.has(props.style) || currentBlockType === props.style) {
        className = 'tools tools-selected';
      }

      let onClickButton = (e: any) => {
        try {
          e.preventDefault();
          props.onToggle(props.style);
        } catch {
        }
      };
      return <button title={props.label} className={className} onMouseDown={onClickButton}>{props.icon ? props.icon : props.label}</button>;
    } catch {
    }
    return <></>;
  };

  const BLOCK_TYPES = [
    {
      label: 'H1',
      style: 'header-one',
      icon: null,
    },
    {
      label: 'H2',
      style: 'header-two',
      icon: null,
    },
    {
      label: 'H3',
      style: 'header-three',
      icon: null,
    },
    {
      label: 'UL',
      style: 'unordered-list-item',
      icon: <UnorderedListIcon />,
    },
    {
      label: 'OL',
      style: 'ordered-list-item',
      icon: <OrderedListIcon />,

    },
  ];

  const BlockStyleControls = (props: any) => {
    return (
      <div>
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        ))}
      </div>
    );
  };

  const INLINE_STYLES = [
    {
      label: 'Bold',
      style: 'BOLD',
      icon: <BoldIcon />,
    },
    {
      label: 'Italic',
      style: 'ITALIC',
      icon: <ItalicIcon />,
    },
    {
      label: 'Underline',
      style: 'UNDERLINE',
      icon: <UnderlineIcon />,
    },
  ];
  const InlineStyleControls = (props: any) => {
    return (
      <div>
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        ))}
      </div>
    );
  };

  const onInlineClick = (e: any) => {
    try {
      let nextState = RichUtils.toggleInlineStyle(richEditorState, e);
      setRichEditorState(nextState);
    } catch {
    }
  };

  const onBlockClick = (e: any) => {
    try {
      let nextState = RichUtils.toggleBlockType(richEditorState, e);
      setRichEditorState(nextState);
    } catch {
    }
  };

  return (
    <div className={`${styles.root} ${className}`}>
      <div onClick={focusEditor} className={`${styles.root__editor} ${error ? styles.root__editor__error : ''} RichEditor-root`}>
        <div className={`${styles.root__editor__controls} RichEditor-controls`}>
          <BlockStyleControls onToggle={onBlockClick} />
          <InlineStyleControls onToggle={onInlineClick} />
        </div>
        <div className={'RichEditor-editor'}>
          <Editor
            ref={editor}
            editorKey="editor"
            editorState={richEditorState}
            onChange={(editorState: any) => {
              try {
                setRichEditorState(editorState);
                const { blocks, } = convertToRaw(editorState.getCurrentContent());
                const value = blocks.map((block: any) => block.text && (!block.text.trim() && '\n') || block.text).join('\n');
                if (onEditorChange && value) {
                  onEditorChange(value);
                }
              } catch {
              }
            }}
            textDirectionality={'RTL'}
            {...placeHolder && { placeholder: placeHolder, }}
          />
        </div>

      </div>
      {error && (
        <Typography
          variant={'tiny'}
          color={'error'}
          className={styles.root__error__text}
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}