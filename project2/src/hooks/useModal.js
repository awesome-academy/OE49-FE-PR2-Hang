import { useCallback, useState } from "react";

export const useShowModal = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const show = useCallback(() => setState((state) => !state), []);

  return [state, show];
};
