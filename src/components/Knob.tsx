import JqxKnob, {
  IKnobLabels,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxknob";
import { useEffect, useRef, useState } from "react";
interface KnobProps {
  min: number;
  max: number;
  defaultValue: number;
  onChangeFunction: any;
  formatFunction?: any;
  step?: number;
}

function Knob({
  min,
  max,
  defaultValue,
  onChangeFunction,
  formatFunction,
  step,
}: KnobProps) {
  const [styles] = useState({
    fill: {
      color: "#fefefe",
      gradientStops: [
        [0, 1],
        [50, 0.9],
        [100, 1],
      ],
      gradientType: "linear",
    },
    stroke: "#dfe3e9",
    strokeWidth: 3,
  });
  const [marks] = useState({
    colorProgress: { border: "#00a4e1", color: "#00a4e1" },
    colorRemaining: { border: "grey", color: "grey" },
    majorInterval: 10,
    majorSize: "9%",
    minorInterval: 2,
    offset: "71%",
    size: "8%",
    thickness: 3,
  });
  const [labels] = useState({
    offset: "100%",
    step: 100,
    visible: true,
    formatFunction: formatFunction,
  });
  const [pointer] = useState({
    offset: "0%",
    size: "0%",
    style: { fill: "#00a4e1", stroke: "grey" },
    thickness: 0,
    type: "arrow",
  });
  const [progressBar] = useState({
    background: { fill: "grey", stroke: "grey" },
    offset: "70%",
    size: "15%",
    style: { fill: "#00a4e1", stroke: "grey" },
  });
  const valueRef = useRef(0);
  // const [value, setValue] = useState(0);
  useEffect(() => {
    valueRef.current = defaultValue;
  }, []);
  // useEffect(() => {
  //   onChangeFunction(valueRef.current);
  // }, [valueRef.current]);
  return (
    <JqxKnob // setValue(e.args.value)
      onChange={(e: any) => onChangeFunction(e.args.value)}
      width="70"
      height="100"
      value={valueRef.current}
      min={min}
      max={max}
      step={step}
      startAngle={120}
      endAngle={420}
      snapToStep={true}
      rotation={"clockwise"}
      styles={styles}
      marks={marks}
      // @ts-ignore
      labels={labels}
      pointer={pointer}
      progressBar={progressBar}
    />
  );
}
export default Knob;
