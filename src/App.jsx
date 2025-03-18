import React, { useState } from 'react';
import styled from 'styled-components';
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
`;

const TitleStyled = styled.h1`
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
    font-family: Roboto, sans-serif;
    color: #ffffff;
    align-self: center;
`;

const SubTitleStyled = styled.h3`

`;

function P5Canvas() {
    const [sketchList, setSketchList] = useState([]);
    const [selectedSketchIndex, setSelectedSketchIndex] = useState(null);

    return (
        <AppStyled>
            <TitleStyled>Sketch Embedder P5.js</TitleStyled>
            <SubTitleStyled>
                Export your sketchs to a standalone HTML file
                <button>Export</button>
            </SubTitleStyled>
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