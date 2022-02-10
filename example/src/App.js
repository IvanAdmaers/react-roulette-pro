import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { nanoid } from 'nanoid';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

import './App.css';

import reproductionArray from './utills/reproductionArray';
import getRandomIntInRange from './utills/getRandomIntInRange';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const prizes = [
  {
    id: 'a44c728d-8a0e-48ca-a963-3d5ce6dd41b0',
    image: 'https://i.ibb.co/ZLHZgKf/good-0.png',
    text: 'Monoblock Apple iMac 27',
  },
  {
    id: '7d24b681-82d9-4fc0-b034-c82f9db11a59',
    image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
    text: 'Apple MacBook Pro 13 Late 2020',
  },
  {
    id: '9da9a287-952f-41bd-8c7a-b488938d7c7a',
    image: 'https://i.ibb.co/T1M05LR/good-2.png',
    text: 'Apple iPhone 13 Pro Max 512GB',
  },
  {
    id: '04106f3f-f99f-47e4-a62e-3c81fc8cf794',
    image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
    text: 'Apple MacBook Pro M1 13 256GB',
  },
  {
    id: '23c551bf-8425-4ffd-b7c2-77c87844f89d',
    image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
    text: 'MacBook Air 13',
  },
  {
    id: 'e4060930-538f-4bf7-ab8e-8d2aa05fba43',
    image: 'https://i.ibb.co/64k8D1c/good-5.png',
    text: 'Apple iPad Pro 12.9',
  },
  {
    id: 'fb121804-e4f6-4fce-bdd6-1e3189172f37',
    image: 'https://i.ibb.co/TLjjsG3/good-6.png',
    text: 'Apple AirPods Max',
  },
  {
    id: '26ee933e-0858-481d-afe8-b30d3829242a',
    image: 'https://i.ibb.co/943n9PQ/good-7.png',
    text: 'Apple iPad Pro 12.9',
  },
  {
    id: 'c769c2b1-df6e-4e6e-8985-53b531527b35',
    image: 'https://i.ibb.co/HVpYpsH/good-8.png',
    text: 'Apple Watch Series 6 44mm',
  },
  {
    id: 'bd9f86a3-9a72-4ba3-a071-3ea9cbc87cc1',
    image: 'https://i.ibb.co/BnmJvZT/good-9.png',
    text: 'Apple Smart Keyboard iPad Pro 12.9',
  },
];

const getDesignOptions = (settings) => {
  const result = {};
  const keys = Object.keys(settings);

  keys.forEach((key) => {
    const { forDesign, value } = settings[key];

    if (!forDesign) {
      return;
    }

    result[key] = value;
  });

  return result;
};

// eslint-disable-next-line valid-typeof
const isArrayOf = (type, array) => array.every((item) => typeof item === type);

const getOptionsAsString = (settings, design) => {
  let string = '';
  const keys = Object.keys(settings);

  keys.forEach((key) => {
    const { options, value, forDesign } = settings[key];

    if (!forDesign) {
      return;
    }

    if (typeof forDesign !== 'boolean' && forDesign !== design) {
      return;
    }

    if (options[0] === value) {
      return;
    }

    string += `${key}: ${value},\n`;
  });

  return string;
};

const API = {
  getPrizeIndex: async () => {
    const randomPrizeIndex = getRandomIntInRange(0, prizes.length - 1);
    const randomPrizeIndexOffset = prizes.length * 4;

    return randomPrizeIndex + randomPrizeIndexOffset;
  },
};

const App = () => {
  const [settings, setSettings] = useState({
    design: {
      name: 'Design',
      options: ['Regular', 'GracefulLines'],
      value: 'Regular',
    },
    prizesWithText: {
      name: 'Prizes with text',
      options: [false, true],
      value: false,
    },
    withoutAnimation: {
      name: 'Without animation',
      options: [false, true],
      value: false,
      forDesign: true,
    },
    hideTopArrow: {
      name: 'Hide top arrow',
      options: [false, true],
      value: false,
      forDesign: 'GracefulLines',
    },
    hideSideArrows: {
      name: 'Hide side arrows',
      options: [false, true],
      value: false,
      forDesign: 'GracefulLines',
    },
    replaceBottomArrowWithTopArrow: {
      name: 'Replace bottom arrow with top arrow',
      options: [false, true],
      value: false,
      forDesign: 'GracefulLines',
    },
  });

  const [prizeList, setPrizeList] = useState([]);
  const [start, setStart] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);

  useEffect(() => {
    const reproducedArray = [
      ...prizes,
      ...reproductionArray(prizes, prizes.length * 3),
      ...prizes,
      ...reproductionArray(prizes, prizes.length),
    ];

    const list = [...reproducedArray].map((item) => ({
      ...item,
      id: `${item.id}--${nanoid()}`,
    }));

    if (settings.prizesWithText.value) {
      setPrizeList(list);

      return;
    }

    const listWithoutText = list.map(({ id, image }) => ({ id, image }));

    setPrizeList(listWithoutText);
  }, [settings.prizesWithText.value]);

  useEffect(() => {
    if (!prizeIndex || start) {
      return;
    }

    setStart(true);
  }, [prizeIndex, start]);

  useEffect(() => {
    if (!spinning || !prizeList.length) {
      return;
    }

    const prepare = async () => {
      const newPrizeIndex = await API.getPrizeIndex();

      setPrizeIndex(newPrizeIndex);
      setStart(false);

      const { id } = prizeList[newPrizeIndex];

      Toast.fire({ icon: 'info', title: `Should win id - ${id}` });
    };

    prepare();
  }, [spinning, prizeList]);

  const handleSettingsChange = (e) => {
    const { dataset, value, checked } = e.target;
    const { param } = dataset;

    const newValue = checked !== undefined ? checked : value;

    const newParam = { ...settings[param] };
    newParam.value = newValue;

    setSettings((prevState) => ({ ...prevState, [param]: newParam }));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStart = () => {
    setSpinning(true);
  };

  const handlePrizeDefined = () => {
    Toast.fire({ icon: 'success', title: '🥳 Prize defined 🥳', timer: 1500 });

    setSpinning(false);
  };

  const design = settings.design.value;

  const designOptions = getDesignOptions(settings);

  const settingsElement = (
    <div className="settings">
      <ul className="settings-list">
        {Object.keys(settings).map((key) => {
          let element;

          const { name, options, value, forDesign } = settings[key];

          if (
            forDesign &&
            typeof forDesign !== 'boolean' &&
            forDesign !== design
          ) {
            return element;
          }

          if (isArrayOf('boolean', options)) {
            element = (
              <input
                data-param={key}
                type="checkbox"
                checked={value}
                onChange={handleSettingsChange}
              />
            );
          }

          if (isArrayOf('string', options)) {
            element = (
              <select
                data-param={key}
                value={value}
                onChange={handleSettingsChange}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          }

          return (
            <li key={key} className="settings-list-item">
              <p>{name}</p>
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );

  const designOptionsString = getOptionsAsString(settings, design);
  const isDefaultDesign = settings.design.options[0] === design;

  const codeElement = (
    <pre className="pre-element">
      <code className="pre-element-code">
        {`
        const prizeList = ${JSON.stringify(prizeList, null, 2)};

        <RoulettePro
          start={${Boolean(start)}}
          prizes={prizeList}
          prizeIndex={${prizeIndex}}
          spinningTime={3}
          ${isDefaultDesign ? '' : `design="${design}"`}
          ${
            designOptionsString
              ? `designOptions={{${designOptionsString}}}`
              : ''
          }
        />
      `}
      </code>
    </pre>
  );

  return (
    <>
      <div>
        <div className="roulette">
          <RoulettePro
            prizes={prizeList}
            design={design}
            designOptions={designOptions}
            start={start}
            prizeIndex={prizeIndex}
            onPrizeDefined={handlePrizeDefined}
            spinningTime={3}
            classes={{
              wrapper: 'roulette-pro-wrapper-additional-styles',
            }}
          />
        </div>
        <div
          className={`roulette-actions ${
            settings.replaceBottomArrowWithTopArrow.value ? 'down' : ''
          }`}
        >
          <div className="gray-block">
            <div className="button-wrapper">
              <button
                onClick={handleStart}
                className="spin-button"
                type="button"
              >
                Spin
              </button>
            </div>
          </div>
        </div>

        {settingsElement}
        {codeElement}
      </div>
    </>
  );
};

export default App;
