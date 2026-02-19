import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner';
import AppRouter from './routes/AppRouter.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store.ts';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRouter />
        <Toaster richColors position='top-right' />
      </PersistGate>
    </Provider>
)
