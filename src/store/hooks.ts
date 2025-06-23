import {  useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Utilise le bon typage pour le dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
// Utilise le bon typage pour le selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;