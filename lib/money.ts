export const inr = (paisa: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
    .format((paisa || 0) / 100);
