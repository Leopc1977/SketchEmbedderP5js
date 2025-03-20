import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Preview from './components/Preview';
import ConfigPanel from './components/ConfigPanel';
import { UploadOutlined } from '@ant-design/icons';
import hljs from 'highlight.js';

import "highlight.js/styles/github.css";

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
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
    color: #ffffff;
    align-self: center;
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
    const [selectedSketchIndex, setSelectedSketchIndex] = useState(null);

    const embeddedHTML = `<html><head></head><body><script src="https://cdn.jsdelivr.net/npm/p5@1.0.0-alpha.9/lib/p5.js"></script><script src="sketch.js"></script></body></html>`;

    useEffect(() => {
        hljs.highlightAll();
    }, [embeddedHTML]);

    return (
        <AppStyled>
            <TitleStyled>Sketch Embedder P5.js</TitleStyled>
            <SubTitleStyled>
                Export your sketchs to a standalone HTML file
            </SubTitleStyled>
            <p>Click on the button below to copy the HTML code to your clipboard.</p>
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
            {selectedSketchIndex !== null && <ConfigPanel
                setSelectedSketchIndex={setSelectedSketchIndex}
                selectedSketchIndex={selectedSketchIndex}
                setSketchList={setSketchList}
                sketchList={sketchList}
            />}
        </AppStyled>
    );
};

export default P5Canvas;
