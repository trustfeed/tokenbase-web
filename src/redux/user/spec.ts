import axios from 'axios';
import { signInSaga } from './sagas';
import { call } from 'redux-saga/effects';
import { handleFetch, getSignInAPI } from '../../api';

it('sign in', () => {
  const fakeBody = { email: 'noel.yoo@trustfeed.io', password: 'qwer1234' };
  const action = { payload: fakeBody };
  const generator = signInSaga(action);

  // debounce by 500ms
  generator.next();

  expect(generator.next().value).toEqual(
    call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getSignInAPI(),
      accessToken: undefined,
      data: fakeBody
    })
  );
});
