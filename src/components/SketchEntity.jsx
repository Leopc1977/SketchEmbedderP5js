import { useEffect, useRef } from 'react';

import styled from 'styled-components';
import hljs from 'highlight.js';

import p5 from 'p5'

const SketchContainer = styled.div`
    display: flex;
    flex-direction: row;

    height: ${(props) => props.height}px;

    box-sizing: border-box;
    border: ${(props) => props.isSelected ? '2px solid #00ff00' : '2px solidrgb(255, 0, 0)'};
`;

const SketchStyled = styled.div`
    canvas {
        display: block;
    }
`;

const SnippetCodeStyled = styled.div`
    display: flex;

    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;

    pre code.hljs {
        width: 100%;
        height: 100%;
        margin: 0px 0px;
    }

    pre {
        margin: 0em 0px;
        overflow: auto;
    }
`;

function SketchEntity(props) {
    const {
        sketch,
        index,
        selectedSketchIndex,
        setSelectedSketchIndex
    } = props;

    const _canvasDiv = useRef();
    const _canvas = useRef();

    if (_canvas.current) {
        _canvas.current.style.width = sketch.width + 'px';
        _canvas.current.style.height = sketch.height + 'px';
    }

    useEffect(() => {
        new p5(sketch.function, _canvasDiv.current);

        _canvas.current = _canvasDiv.current.firstChild;
    }, []);

    useEffect(() => {
        if (!sketch.hasSnippetCode) return;
    
        hljs.highlightAll();
    }, [sketch.hasSnippetCode]);

    const selectSketch = () => {
        selectedSketchIndex === -1 || selectedSketchIndex !== index ? setSelectedSketchIndex(index) : setSelectedSketchIndex(-1);
    };

    return (
        <SketchContainer
            height={sketch.height}
        >
            <SketchStyled
                ref={_canvasDiv}

                isSelected={index === selectedSketchIndex}
                onPointerDown={selectSketch}
            />
            {sketch.hasSnippetCode && (
                <SnippetCodeStyled
                    width={sketch.width}
                    height={sketch.height}
                >
                    <pre>
                        <code className='language-javascript'>
                            {sketch.function.toString()}
                        </code>
                    </pre>
                </SnippetCodeStyled>
            )}
        </SketchContainer>
    );
}

export default SketchEntity;
