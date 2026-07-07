"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "@/store/store";
import AppThemeProvider from "@/components/providers/AppThemeProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  );
}