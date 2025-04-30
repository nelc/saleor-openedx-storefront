import React from 'react';
import ReactDOM from 'react-dom';
import { useQuery, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';

const GET_CHECKOUT = gql`
  query GetCheckout($id: ID!) {
    checkout(id: $id) {
      id
      lines {
        id
        quantity
        unitPrice {
          net {
            amount
            currency
          }
          gross {
            amount
            currency
          }
        }
        totalPrice {
          net {
            amount
            currency
          }
          gross {
            amount
            currency
          }
        }
        variant {
          product {
            name
            media {
              alt
              url(size: 300, format: ORIGINAL)
            }
          }
        }
      }
      totalPrice {
        net {
          amount
          currency
        }
        gross {
          amount
          currency
        }
      }
    }
  }
`;

export default function App() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const checkoutId = params.get('checkout');

  const { loading, error, data } = useQuery(GET_CHECKOUT, {
    variables: { id: checkoutId },
    skip: !checkoutId,
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.checkout ? (
        <>
          <h4>Cart</h4>
          {data.checkout.lines.map((line) => (
            <div key={line.id}>
              <img src={line.variant.product.media[0].url} alt={line.variant.product.media[0].alt} />
              <p>Product: {line.variant.product.name}</p>
              <p>Quantity: {line.quantity}</p>
              <p>Unit Price: {line.unitPrice.net.amount} {line.unitPrice.net.currency}</p>
              <p>Total Price: {line.totalPrice.net.amount} {line.totalPrice.net.currency}</p>
            </div>
          ))}
          <h3>Total Price: {data.checkout.totalPrice.net.amount} {data.checkout.totalPrice.net.currency}</h3>
        </>
      ) : (
        <p>No checkout found.</p>
      )}
    </div>
  );
}
