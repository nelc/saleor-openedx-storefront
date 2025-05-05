export function getProcessors(gatewayConfigs, checkoutId) {
  if (!Array.isArray(gatewayConfigs)) return [];

  return gatewayConfigs.map((gatewayConfig) => {
    const urlConfig = gatewayConfig.data?.payment_url;
    const logoConfig = gatewayConfig.data?.payment_button_image;

    const defaultUrl = "http://local.overhang.io:8000/hyperpay/payment/pay/";
    const defaultLogo = "https://reporting.hyperpay.com/logonew.png";

    return {
      id: gatewayConfig.id,
      label: gatewayConfig.id,
      src: urlConfig ? `${urlConfig}?checkoutId=${checkoutId}`
        : `${defaultUrl}?checkoutId=${checkoutId}`,
      logo: logoConfig || defaultLogo,
    };

  });
}
