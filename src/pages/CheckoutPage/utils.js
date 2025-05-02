export function getProcessors(gateways, checkoutId) {
  if (!Array.isArray(gateways)) return [];

  return gateways.map((gateway) => {
    const urlConfig = gateway.config.find((c) => c.field === "url");
    const logoConfig = gateway.config.find((c) => c.field === "logo");

    const defaultUrl = "http://local.overhang.io:8000/hyperpay/payment/pay/";
    const defaultLogo = "https://reporting.hyperpay.com/logonew.png";

    return {
      id: gateway.id,
      label: gateway.name,
      src: urlConfig?.value
        ? `${urlConfig.value}?checkoutId=${checkoutId}`
        : `${defaultUrl}?checkoutId=${checkoutId}`,
      logo: logoConfig?.value || defaultLogo,
    };

  });
}
