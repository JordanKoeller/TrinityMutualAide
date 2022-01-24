import React, { useCallback } from "react";
import { createEditorStateWithText } from "@draft-js-plugins/editor";
import { EmptySplitPanel } from "../../SplitPanel";
import { EditorState } from "draft-js";
import { WyswigBlockEditor } from "../WyswigBlockEditor";
import { BlockEditor, TEMPLATE_EDITOR_BLOCK_TEXT } from "./EditorBlock";
import { dataUrlToFile } from "../../../utilities/funcs";

export const SplitPanelEditor: BlockEditor = {
    blockType: 'SplitPanel',
    create: (language) => ({
        blockType: 'SplitPanel',
        editorState: createEditorStateWithText(TEMPLATE_EDITOR_BLOCK_TEXT[language]),
        data: {
            filename: "insertImage.jpg",
            dataUrl: "insertImage.jpg",
            file: null,
        },
    }),
    Component: ({ state, readOnly, blockIndex, onChange }) => {
        const handleUploadChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                const file = evt.target.files?.[0]!;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    onChange({
                        ...state,
                        data: {
                            dataUrl: reader.result as string,
                            filename: file.name,
                            file: file,
                        }
                    }, blockIndex);
                }
            }
        }
        const editorOnChange = useCallback((draft: EditorState, blockIndex: number) => {
            const nextState = {
                ...state,
                editorState: draft,
            };
            if (onChange) onChange(nextState, blockIndex);
        }, [onChange, state]);
        return <EmptySplitPanel
            variant={blockIndex % 2 === 0 ? 'light' : 'dark'}
            swapPanels={blockIndex % 2 === 0 ? true : false}
            Left={<div>
                {readOnly ? null : <>
                    <input type="file" onChange={handleUploadChange} />
                </>}
                <img src={state.data.dataUrl as string} alt="" style={{
                    width: '90%',
                    height: '90%',
                    objectFit: 'contain',
                }} />
            </div>}
            Right={<WyswigBlockEditor
                readonly={readOnly}
                onChange={editorOnChange}
                blockIndex={blockIndex}
                content={state.editorState}
            />}
        />
    },
    scrubImages: (block, imageRecord) => {
        imageRecord[block.data.filename] = block.data.file;
    },
    replaceImages: (block, imagesToUrl) => {
        block.data.dataUrl = imagesToUrl[block.data.filename];
    }
};