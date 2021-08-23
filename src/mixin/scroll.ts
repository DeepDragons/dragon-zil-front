import { useEffect } from "react"

export function useScrollEvent(listener: EventListenerOrEventListenerObject, passive = false) {
  const event = 'scroll';

  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, listener, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, listener);
    }
  });
}
