import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { APP_READY, subscribe, initialize } from '@edx/frontend-platform';
import { AppProvider } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';

import App from './App';
import messages from './i18n';
import './index.scss';


const httpLink = createHttpLink({
  uri: 'http://saleor-core.local.overhang.io:18000/graphql/',
});

const authLink = setContext((_, { headers }) => {
  const token = ('; '+document.cookie).split(`; openedxSaleorToken=`).pop().split(';')[0];

  if (token === ""){
    const currentUrl = window.location.href;
    window.location.href = `http://local.overhang.io:8000/saleor/services/authenticate/?next=${encodeURIComponent(currentUrl)}`;
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message == "Signature has expired") {
        const currentUrl = window.location.href;
        window.location.href = `http://local.overhang.io:8000/saleor/services/authenticate/?next=${encodeURIComponent(currentUrl)}`;
      }
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});


const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache()
});


function StoreFrontContainer() {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <Header />
        <Routes>  {/* Agregamos Router para la navegación */}
          <Route path="/checkout" element={<App/>} />  {/* Ruta única a Checkout */}
        </Routes>
      </ApolloProvider>
    </AppProvider>
  );
}

subscribe(APP_READY, () => {
  ReactDOM.render(
    <StoreFrontContainer />, document.getElementById('root')
  );
});

initialize({ messages });
