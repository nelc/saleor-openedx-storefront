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
