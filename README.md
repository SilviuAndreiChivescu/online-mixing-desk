React-bootstrap-ranger-slider: https://github.com/jaywilz/react-bootstrap-range-slider

Due to slider not allowing to set step=0.05, for all ranger sliders, the min, max, step and defaultValues have to be multiplied by 100 and in Logic file where is useInit custom hook have to be divided by 100 to not change the result.
// PT TOATE RANGEURILE, TREBUIE SA LE INMULTESC CU 100 LA INPUTS SI DUPA LA LOGIC TRE SA LE DAU / 100;
