function trackIsAvailable(
  availableMarkets: string[],
  userCountry: string
): boolean {
  return availableMarkets.includes(userCountry);
}

export default trackIsAvailable;
