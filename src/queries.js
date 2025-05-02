import { gql } from '@apollo/client';

export const GET_CHECKOUT = gql`
  query GetCheckout($id: ID!) {
    checkout(id: $id) {
      id
      lines {
        id
        quantity
        unitPrice { net { amount currency } }
        totalPrice { net { amount } }
        variant { product { name media { alt url(size: 300, format: ORIGINAL) } } }
      }
      totalPrice { net { amount currency } }
      availablePaymentGateways {
        id
        name
        config { value field }
        currencies
      }
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      number
      userEmail
      created
      paymentStatus
      status
      shippingAddress {
        streetAddress1
        city
        postalCode
        country { code country }
      }
      billingAddress {
        streetAddress1
        city
        postalCode
        country { code country }
      }
      lines {
        id
        quantity
        unitPrice { net { amount currency } }
        totalPrice { net { amount } }
        variant {
          sku
          product { 
            name 
            media { 
              alt 
              url(size: 300, format: ORIGINAL) 
            } 
          }
        }
      }
      total { net { amount currency } }
    }
  }
`;
