import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Good } from './types/Good';
import GoodsList from './components/GoodsList/GoodsList';

import './App.scss';

const goodsFromServer: Good[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
].map(good => ({
  name: good,
  id: uuidv4(),
}));

export const App: React.FC = () => {
  const [isVisible, setVisibility] = useState(false);
  const [isReverse, setReversingList] = useState(false);
  const [sortBy, setSortBy] = useState('none');

  const resetByDefault = () => {
    setReversingList(false);
    setSortBy('none');
  };

  const exitFromList = () => {
    resetByDefault();
    setVisibility(false);
  };

  const createListOfGoods = () => {
    const preparedGoods = [...goodsFromServer].sort((currGood, nextGood) => {
      switch (sortBy) {
        case 'abc':
          return currGood.name.localeCompare(nextGood.name);

        case 'len':
          return currGood.name.length - nextGood.name.length;

        default:
          return 0;
      }
    });

    if (isReverse) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const createdList = createListOfGoods();

  return (
    <div className="app">
      {!isVisible
        ? (
          <button
            type="button"
            className="app__button app__button--start"
            onClick={() => setVisibility(true)}
          >
            Start
          </button>
        )
        : (
          <div className="app__wrapper">
            <h1 className="app__title">
              Goods
            </h1>

            <div className="app__frame">
              <div className="app__action">
                <button
                  type="button"
                  className="app__button"
                  onClick={() => setSortBy('abc')}
                  disabled={sortBy === 'abc'}
                >
                  Sort by alphabet
                </button>

                <button
                  type="button"
                  className="app__button"
                  onClick={() => setSortBy('len')}
                  disabled={sortBy === 'len'}
                >
                  Sort by length
                </button>
              </div>

              <GoodsList goods={createdList} />

              <div className="app__action">
                <button
                  type="button"
                  className="app__button"
                  onClick={() => setReversingList(!isReverse)}
                >
                  Reverse
                </button>

                <button
                  type="button"
                  className="app__button"
                  onClick={resetByDefault}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="app__button app__button--exit"
                  onClick={exitFromList}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
