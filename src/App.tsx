import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import "./App.css";
import { useAudio } from "./AppLogic";
import { Oscilloscope } from "./components/Oscilloscope";

import { MyRangeSlider } from "./components/MyRangeSlider";
// import { Compressor } from "./components/Compressor";
import { Filter } from "./components/Filter";

import Reverb from "./components/Reverb";

// v2
import { useInit } from "./hooks/useInit";
import HPF from "./components/HPF";
import EQ from "./components/EQ";
import Panner from "./components/Panner";
import Gain from "./components/Gain";
import Compressor from "./components/Compressor";
import FXUnit from "./components/FXUnit";
import VolumeSlider from "./components/VolumeSlider";
import MasterFilter from "./components/MasterFilter";
import Master from "./components/Master";

//todo change all any types to actual types?

// const App: React.FC = () => {
//   const {
//     play,
//     pause,
//     gainControl,
//     pannerControl,
//     compressorControl,
//     biquadFilterControl,
//     draw,
//     chooseImpulse,
//   } = useAudio("/assets/outfoxing.mp3");

//   return (
//     <Container fluid className="App text-center">
//       <Oscilloscope draw={draw} />
//       <Container>
//         <Row>
//           <Col>
//             <Button className="mt-5" onClick={play}>
//               Play
//             </Button>
//           </Col>
//           <Col>
//             <Button className=" mt-5" onClick={pause}>
//               Pause
//             </Button>
//           </Col>
//         </Row>
//       </Container>
//       <section
//         style={{ width: "30%", margin: "0 auto" }}
//         className="text-start"
//       >
//         {/* Reverb */}
//         {/* <Reverb chooseImpulse={chooseImpulse} /> */}

//         {/* Gain and Panning */}
//         {/* <MyRangeSlider
//           onChangeFunction={(e) => gainControl(e)}
//           label="Gain"
//           min={0}
//           max={2}
//           defaultValue={1}
//           step={0.1}
//         />
//         <MyRangeSlider
//           onChangeFunction={(e) => pannerControl(e)}
//           label="Pan"
//           min={-1}
//           max={1}
//           defaultValue={0}
//           step={0.01}
//           className="mt-4 mb-4"
//         /> */}
//         {/* END Gain and Panning */}

//         {/* Commented below to test FX unit to finish 'internal chain design' */}
//         {/* <Compressor compressorControl={compressorControl} />
//         <Filter biquadFilterControl={biquadFilterControl} /> */}
//       </section>
//     </Container>
//   );
// };

const App: React.FC = () => {
  const [
    channelOneFunctions,
    channelOneUI,
    setChannelOneUI,
    channelTwoFunctions,
    channelTwoUI,
    setChannelTwoUI,
    masterFilterToExport,
    masterFunctions,
    controlWhichChannel,
    setMain,
    main,
  ] = useInit();

  return (
    <div className="App text-center">
      <Container>
        <Row>
          <Col>
            <ChannelLine
              channelFunctions={channelOneFunctions}
              channelUI={channelOneUI}
              setChannelUI={setChannelOneUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelFunctions={channelTwoFunctions}
              channelUI={channelTwoUI}
              setChannelUI={setChannelTwoUI}
            />
          </Col>
        </Row>
        <Compressor
          setMain={setMain}
          main={main}
          controlWhichChannel={controlWhichChannel}
          setCompressorStates={setMain}
          compressorStates={main}
          compressorFunctions={main.compressorFunctions}
        />
        <FXUnit
          setChannelUI={setChannelOneUI}
          channelUI={channelOneUI}
          FXUnitFunctions={channelOneFunctions.FXUnitFunctions}
        />
        <MasterFilter masterFilterToExport={masterFilterToExport} />
        <Master masterFunctions={masterFunctions} />
      </Container>
    </div>
  );
};

interface ChannelLineProps {
  channelFunctions: any;
  channelUI: any;
  setChannelUI: any;
}

const ChannelLine: React.FC<ChannelLineProps> = ({
  channelFunctions,
  channelUI,
  setChannelUI,
}) => {
  const { play, pause, EQFunctions, HPFFunctions } = channelFunctions;
  return (
    <>
      <Row>
        <Col>
          <Button className="mt-5" onClick={play}>
            Play
          </Button>
        </Col>
        <Col>
          <Button className=" mt-5" onClick={pause}>
            Pause
          </Button>
        </Col>
      </Row>
      <Gain channelFunctions={channelFunctions} />
      <EQ
        setChannelUI={setChannelUI}
        channelUI={channelUI}
        EQFunctions={EQFunctions}
      />
      <HPF
        setChannelUI={setChannelUI}
        channelUI={channelUI}
        HPFFunctions={HPFFunctions}
      />
      <Panner channelFunctions={channelFunctions} />
      <Row>
        <Col>
          <Button
            className="mt-2 mb-2"
            onClick={() =>
              setChannelUI({ ...channelUI, cueOn: !channelUI.cueOn })
            }
          >
            Cue On / Off
          </Button>
        </Col>
      </Row>
      <VolumeSlider channelFunctions={channelFunctions} />
    </>
  );
};

export default App;
