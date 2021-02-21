export const validQuantityInput = (e) => {
  const { value, dataset } = e.target;
  e.target.value = value.replace(/^0+|[^0-9]/g, "");
  if (!+value) e.target.value = 1;
  else if (+value > +dataset.max) e.target.value = dataset.max;
};
