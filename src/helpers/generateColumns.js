export const generateColumns = (data) => {
  return Object.keys(data).map((key) => ({
    Header: `${key.toUpperCase()}`,
    accessor: key,
  }));
};
