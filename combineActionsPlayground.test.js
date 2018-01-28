import { createActions, handleActions, combineActions } from 'redux-actions';

describe('combineActions', () => {
  it('should do things', () => {
    const { increment, decrement } = createActions({
      INCREMENT: amount => ({ amount }),
      DECREMENT: amount => ({ amount: -amount })
    });

    const thing = {
      [combineActions(increment, decrement)](state, { payload: { amount } }) {
        return { ...state, counter: state.counter + amount };
      }
    };

    const thang = { ['bla']() {} };
    const reducer = handleActions(thing, { counter: 10 });

    expect(thang).toMatchObject({ bla: () => {} });

    expect(thing).toEqual({});

    expect(reducer({ counter: 5 }, increment(5))).toEqual({
      counter: 10
    });
    expect(reducer({ counter: 5 }, decrement(5))).toEqual({ counter: 0 });
    expect(
      reducer({ counter: 5 }, { type: 'NOT_TYPE', payload: 1000 })
    ).toEqual({ counter: 5 });
    expect(reducer(undefined, increment(5))).toEqual({ counter: 15 });
  });
});
