import './App.css';
import Viewer3D from './Viewer3D';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";

function App() {
    const [structure3d, setStructure3d] = useState(null);
    const [structure3dAppearance, setStructure3dAppearance] = useState("ball-and-stick");

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

    function handleRadioChange(e) {
        setStructure3dAppearance(e.target.value)
    }

    const Viewer3dProps = {
        structure3d,
        structure3dAppearance
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
                            <Form.Check  type='radio' label='Ball and stick' checked={structure3dAppearance === "ball-and-stick"} value='ball-and-stick' onChange={handleRadioChange}/>
                            <Form.Check  type='radio' label='Cartoon' checked={structure3dAppearance === "cartoon"} value="cartoon" onChange={handleRadioChange}/>
                            <Form.Check  type='radio' label='Putty' checked={structure3dAppearance === "putty"} value="putty" onChange={handleRadioChange}/>
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
