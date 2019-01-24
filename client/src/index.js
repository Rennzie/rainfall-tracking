import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

library.add(faGoogle, faFacebook, faCloudRain);

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

// const GET_FARM = gql`
//   query getFarmQuery {
//     Farm(id: "95e16b19-be04-49c7-af08-1210df862ac1") {
//       id
//       farm_owner
//       rainGuages {
//         id
//       }
//     }
//   }
// `;

// const FARM_DETAILS = client
//   .query({
//     query: GET_FARM
//   })
//   .then(res => res.data);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
