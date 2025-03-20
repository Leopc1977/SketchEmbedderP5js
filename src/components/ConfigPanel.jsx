import { useMemo } from "react";

import { Button } from "antd";
import styled from "styled-components";

const ConfigPanelContainer = styled.div`
    position: fixed;
    top: 5%;
    right:0px;
    width: 300px;
    height: 90%;

    background-color: #232428;

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    color: #ffffff;
`;

const TitleStyled = styled.h1`
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
    align-self: center;
`;

const DeleteButtonStyled = styled.button`
    cursor: pointer;
`;

const PropertiesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    width: 100%;
`;

const CloseButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
    
    background-color: transparent;
    border: none;
    color: white;
`;

function ConfigPanel(props) {
    const { 
        setSelectedSketchIndex,
        selectedSketchIndex,
        sketchList,
        setSketchList,
    } = props;
    
    const selectedSketch = useMemo(() => sketchList[selectedSketchIndex], [selectedSketchIndex, sketchList]);

    const deleteSketch = () => {
        setSelectedSketchIndex(-1);
        setSketchList(sketchList => sketchList.filter((_, index) => index !== selectedSketchIndex));
    };

    const closeConfigPanel = () => {
        setSelectedSketchIndex(-1);
    };

    return (
        <ConfigPanelContainer>
            <TitleStyled>
                Config
            </TitleStyled>
            <CloseButton
                onPointerUp={closeConfigPanel}
            >
                X
            </CloseButton>

            <PropertiesContainer>
                Width <input type="range" min="0" max="500" value={selectedSketch.width} onChange={(e) => setSketchList(sketchList => sketchList.map((sketch, index) => index === selectedSketchIndex ? {...sketch, width: e.target.value} : sketch))}/>
                Height <input type="range" min="0" max="500" value={selectedSketch.height} onChange={(e) => setSketchList(sketchList => sketchList.map((sketch, index) => index === selectedSketchIndex ? {...sketch, height: e.target.value} : sketch))}/>
                HasSnippetCode <input type="checkbox" checked={selectedSketch.hasSnippetCode} onChange={(e) => setSketchList(sketchList => sketchList.map((sketch, index) => index === selectedSketchIndex ? {...sketch, hasSnippetCode: e.target.checked} : sketch))}/>
            </PropertiesContainer>
            <DeleteButtonStyled
                onPointerUp={deleteSketch}
            >
                Delete sketch
            </DeleteButtonStyled>
        </ConfigPanelContainer>
    )
}

export default ConfigPanel;
