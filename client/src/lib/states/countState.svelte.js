const useCountState = () => {
  let countState = $state(0);

  return {
    get count() {
      return countState;
    },
    increment: () => countState++,
  };
};

export { useCountState };