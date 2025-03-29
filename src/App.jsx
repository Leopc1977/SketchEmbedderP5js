import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';
import hljs from 'highlight.js';
import "highlight.js/styles/github.css";

import Preview from './components/Preview';
import ConfigPanel from './components/ConfigPanel';

const AppStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    background-color: #36393e;
    color: white;
    font-family: Roboto, sans-serif;
`;

const TitleStyled = styled.h1`
    align-self: center;

    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;

    color: #ffffff;
`;

const SubTitleStyled = styled.h3`
`;

const EmbeddedHTMLStyled = styled.div`
    align-self: center;
    cursor: pointer;
    display: flex;
    width: 100vw;
`;

function P5Canvas() {
    const [sketchList, setSketchList] = useState([]);
    const [selectedSketchIndex, setSelectedSketchIndex] = useState(-1);

    const embeddedHTML = `<script src="https://leopc1977.github.io/SketchEmbedderP5js/public/embedCode/a.js"></script>`;

    useEffect(() => {
        hljs.highlightAll();
    }, [embeddedHTML]);

    return (
        <AppStyled>
            <TitleStyled>Sketch Embedder P5.js</TitleStyled>

            <SubTitleStyled>
                Export your sketchs to a standalone script file.
            </SubTitleStyled>

            <p>Click on the button below to copy the script to your clipboard.</p>
            <p>This script is an exemple and does not fit the layout of your sketchs.</p>
            <EmbeddedHTMLStyled
                onPointerDown={() => navigator.clipboard.writeText(embeddedHTML)}
            >
                <pre><code className='language-html'>{embeddedHTML}</code></pre>
                <UploadOutlined/>
            </EmbeddedHTMLStyled>

            <Preview
                sketchList={sketchList}
                setSketchList={setSketchList}
                setSelectedSketchIndex={setSelectedSketchIndex}
                selectedSketchIndex={selectedSketchIndex}
            />

            {selectedSketchIndex !== -1 && <ConfigPanel
                setSelectedSketchIndex={setSelectedSketchIndex}
                selectedSketchIndex={selectedSketchIndex}
                setSketchList={setSketchList}
                sketchList={sketchList}
            />}
        </AppStyled>
    );
};

export default P5Canvas;
