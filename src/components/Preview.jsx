import SketchEntity from './SketchEntity';
import Add from './Add';
import Sketch from '../class/Sketch';
import styled from 'styled-components';
import { useEffect } from 'react';

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
    width: 100%;
    height: 100%;
    min-height: 100%;
    flex: 1;
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

        if (file) {          
            if (file.type === "application/javascript" || file.name.endsWith('.js')) {
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
        }
    };

    useEffect(() => {
        const filesName = ["a.js", "b.js", "c.js"];

        filesName.forEach((fileName) => {
            import(`../../snippetsCode/${fileName}`).then((module) => {
                setSketchList((prev) => [...prev,
                    new Sketch(
                        module.default
                    )
                ]);
            });
        });
    }, []);

    return (
        <PreviewContainer>
            <Add handleFileChange={handleFileChange} />

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
