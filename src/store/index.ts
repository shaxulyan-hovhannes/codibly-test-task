import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productSlice from './reducers/products/productsSlice'

const store = configureStore({
  reducer: {
    products: productSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store
