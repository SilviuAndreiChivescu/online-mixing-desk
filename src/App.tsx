import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';

import {MyRangeSlider} from './components/MyRangeSlider'

const App: React.FC = () => {
  return (
    <Container fluid className="App">
        <p>
          This is the start of an awesome project
        </p>
        <section style={{width: "30%", margin: "0 auto"}}> <MyRangeSlider label="Label for first range slider" /> </section>

    </Container>
  );
}

export default App;
