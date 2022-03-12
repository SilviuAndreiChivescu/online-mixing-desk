import { useEffect, useState } from "react";

const useCompressorLogic = (main: any) => {
  const { threshold, knee, ratio, attack, release, dryWetKnob } =
    main.compressorFunctions.compressorUIStates;

  const {
    compressorControlThreshold,
    compressorControlKnee,
    compressorControlRatio,
    compressorControlAttack,
    compressorControlRelease,
  } = main.compressorFunctions;

  const [slidersInfo, setSlidersInfo] = useState([
    {
      id: "threshold",
      min: -100,
      max: 0,
      defaultValue: threshold,
      step: 20,
      leftLabel: "-40",
      rightLabel: "20",
      onChangeFunction: compressorControlThreshold,
    },
    {
      id: "knee",
      min: 0,
      max: 40,
      defaultValue: knee,
      step: 1,
      leftLabel: "0",
      rightLabel: "1",
      onChangeFunction: compressorControlKnee,
    },
    {
      id: "ratio",
      min: 1,
      max: 19.8,
      defaultValue: ratio,
      step: 1,
      leftLabel: "1 : 1",
      rightLabel: "\u221e : 1",
      onChangeFunction: compressorControlRatio,
    },
    {
      id: "attack",
      min: 0.1,
      max: 1,
      defaultValue: attack,
      step: 0.1,
      leftLabel: "0.1",
      rightLabel: "30",
      onChangeFunction: compressorControlAttack,
    },
    {
      id: "release",
      min: 0.1,
      max: 1,
      defaultValue: release,
      step: 0.1,
      leftLabel: "0.1",
      rightLabel: "1",
      onChangeFunction: compressorControlRelease,
    },
  ]);
  // This function changes all the values of a channel compressor whenever it changes
  const changeAll = () => {
    // 1. Make a shallow copy of the items
    let items = [...slidersInfo];
    // 2. Make a shallow copy of the item you want to mutate
    let thresholdItem = { ...items[0] };
    let kneeItem = { ...items[1] };
    let ratioItem = { ...items[2] };
    let attackItem = { ...items[3] };
    let releaseItem = { ...items[4] };
    // 3. Replace the property you're intested in
    thresholdItem.defaultValue = threshold;
    kneeItem.defaultValue = knee;
    ratioItem.defaultValue = ratio;
    attackItem.defaultValue = attack;
    releaseItem.defaultValue = release;

    thresholdItem.onChangeFunction = compressorControlThreshold;
    kneeItem.onChangeFunction = compressorControlKnee;
    ratioItem.onChangeFunction = compressorControlRatio;
    attackItem.onChangeFunction = compressorControlAttack;
    releaseItem.onChangeFunction = compressorControlRelease;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[0] = thresholdItem;
    items[1] = kneeItem;
    items[2] = ratioItem;
    items[3] = attackItem;
    items[4] = releaseItem;
    // 5. Set the state to our new copy
    setSlidersInfo(items);
  };

  useEffect(() => {
    changeAll();
    setGainReduction(
      parseFloat(main.compressorFunctions.compressor.reduction.toFixed(2))
    );
    const interval = setInterval(() => {
      setGainReduction(
        parseFloat(main.compressorFunctions.compressor.reduction.toFixed(2))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [main.compressorFunctions.compressorUIStates]);

  const [gainReduction, setGainReduction] = useState(
    main.compressorFunctions.compressor.reduction
  );

  return { gainReduction, slidersInfo };
};
export { useCompressorLogic };
