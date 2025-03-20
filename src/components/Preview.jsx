import { useEffect } from 'react';

import styled from 'styled-components';
import hljs from 'highlight.js';
import { Divider } from 'antd';

import SketchEntity from './SketchEntity';
import Add from './Add';

import Sketch from '../class/Sketch';

const PreviewContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    width: fit-content;
    height: fit-content;
    min-height: 100%;
    min-width: 100%;
`;

const SketchEntityListContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    width: 100%;
    height: 100%;
    min-height: 100%;
`;

const SampleCodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    width: 100%;
`;

function Preview(props) {
    const {
        setSketchList,
        sketchList,
        setSelectedSketchIndex,
        selectedSketchIndex
    } = props;
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file?.type === "application/javascript" || file?.name.endsWith('.js')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const sketchCode = e.target.result;

                try {
                    const createSketchFunction = new Function('p', 'return ' + sketchCode);
    
                    setSketchList((prev) => [...prev,
                        new Sketch(
                            createSketchFunction()
                        )
                    ]);
                } catch (error) {
                    console.error("Erreur lors de l'exécution du sketch:", error);
                    alert(`Erreur lors de l'exécution du sketch: ${error.message}`);
                }
            };
            reader.onerror = (e) => {
                console.error("Erreur de lecture du fichier:", e);
                alert("Erreur de lecture du fichier");
            };
            reader.readAsText(file);
        } else {
            alert("Veuillez sélectionner un fichier JavaScript (.js)");
        }
    };

    // Import all snippets code for demo
    useEffect(() => {
        const filesName = ["a.js", "b.js", "c.js"];

        filesName.forEach((fileName) => {
            const path = import.meta.env.VITE_PROD === 'true' ? `./snippetsCode/${fileName}` : `../../snippetsCode/${fileName}`;
            import(path).then((module) => {
                setSketchList((prev) => [...prev,
                    new Sketch(
                        module.default
                    )
                ]);
            });
        });

        hljs.highlightAll();
    }, []);

    return (
        <PreviewContainer>
            <Add handleFileChange={handleFileChange} />
            
            <SampleCodeContainer>
                <p>Functions must look like this:</p>
                <pre><code className='language-javascript'>
{`export default function sketch(p) {
  let x = 50;
  let y = 50;

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(200);
    p.ellipse(x, y, 50, 50);
    x += 1;
  };
}`}
                </code></pre>
            </SampleCodeContainer>

            <p>Click on a sketch to open the config panel.</p>
            <Divider
                style={{
                    borderColor: 'black ',
                }}
            />

            <SketchEntityListContainer>
                {sketchList.map((sketch, index) => (
                    <SketchEntity 
                        key={`SketchEntity-${sketch.id}`}

                        sketch={sketch}
                        index={index}
                        setSelectedSketchIndex={setSelectedSketchIndex}
                        selectedSketchIndex={selectedSketchIndex}
                    />
                ))}
            </SketchEntityListContainer>
        </PreviewContainer>
    )
}

export default Preview;
