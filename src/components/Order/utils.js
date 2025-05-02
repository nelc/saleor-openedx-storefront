export function renderAddress(address) {
  if (!address) return <span className="order-address-empty">No address</span>;
  return (
    <>
      {address.streetAddress1 || ''}<br />
      {[address.city, address.postalCode].filter(Boolean).join(', ')}<br />
      {address.country?.country || ''}
    </>
  );
}
