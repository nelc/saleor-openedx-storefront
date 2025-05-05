import { gql } from '@apollo/client';

export const PAYMENT_GATEWAY_INITIALIZE = gql`
  mutation PaymentGatewayInitialize($id: ID!, $paymentGateways: [PaymentGatewayToInitialize!]) {
    paymentGatewayInitialize(
      id: $id
      paymentGateways: $paymentGateways
    ) {
      gatewayConfigs {
        id
        data
      }
      errors {
        field
        message
        code
      }
    }
  }
`;
