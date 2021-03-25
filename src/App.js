import './App.css';
import Viewer3D from './Viewer3D';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import {CompactPicker} from "react-color";

function App() {
    const [structure3d, setStructure3d] = useState(null);
    const [structure3dRepresentation, setStructure3dRepresentation] = useState("ball-and-stick");
    const [structure3dColoring, setStructure3dColoring] = useState("element-symbol");
    const [uniformColor, setUniformColor] = useState({r:251, g:158, b:0})

    function getStructure() {
        fetch('data/coordinates.cif')
            .then(function(res) {
                return res.text()
            })
            .then(function(structure) {
                setStructure3d(structure);
            })
            .catch(function(e) {
                console.error(e);
            })
    }

    useEffect(() => {
        getStructure();
    }, [])

    function handle3dRepresentationChange(e) {
        setStructure3dRepresentation(e.target.value)
    }

    function handle3dColoringChange(e) {
        setStructure3dColoring(e.target.value)
    }

    const Viewer3dProps = {
        structure3d,
        structure3dRepresentation,
        structure3dColoring,
        uniformColor
    }

    return (
    <div className="App">
        <div id="viewer3d-controls">
            <Form>
                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            3D structure appearance
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check  type='radio' label='Ball and stick' checked={structure3dRepresentation === "ball-and-stick"} value='ball-and-stick' onChange={handle3dRepresentationChange}/>
                            <Form.Check  type='radio' label='Cartoon' checked={structure3dRepresentation === "cartoon"} value="cartoon" onChange={handle3dRepresentationChange}/>
                            <Form.Check  type='radio' label='Putty' checked={structure3dRepresentation === "putty"} value="putty" onChange={handle3dRepresentationChange}/>
                        </Col>
                    </Form.Group>
                </fieldset>
                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            3D structure coloring
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check  type='radio' label='Element symbol' checked={structure3dColoring === "element-symbol"} value="element-symbol" onChange={handle3dColoringChange}/>
                            <Form.Check  type='radio' label='Uniform' checked={structure3dColoring === "uniform"} value="uniform" onChange={handle3dColoringChange}/>
                            {structure3dColoring === "uniform" &&
                                <CompactPicker color={uniformColor} onChange={c => setUniformColor(c.rgb)}/>
                            }
                        </Col>
                    </Form.Group>
                </fieldset>
            </Form>
        </div>
      <Viewer3D id="viewer3d-wrapper" {...Viewer3dProps}/>
    </div>
  );
}

export default App;
