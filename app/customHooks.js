// customHooks.js
import { useState, useEffect } from 'react';

export const useInitialHeight = (text) => {
  const [initialHeight, setInitialHeight] = useState('auto');

  useEffect(() => {
    const calculateHeight = () => {
      const dummyElement = document.createElement('div');
      dummyElement.style.visibility = 'hidden';
      dummyElement.style.whiteSpace = 'pre-wrap';
      dummyElement.style.wordWrap = 'break-word';
      dummyElement.style.width = '100%';
      dummyElement.style.maxWidth = '100%';
      dummyElement.style.fontSize = '1rem';
      dummyElement.style.lineHeight = '1.25rem';
      dummyElement.textContent = text;

      document.body.appendChild(dummyElement);
      const scrollHeight = dummyElement.scrollHeight;

      if (scrollHeight <= 28) {
        setInitialHeight(`${scrollHeight}px`);
      } else {
        setInitialHeight('4rem');
      }

      document.body.removeChild(dummyElement);
    };

    calculateHeight();
  }, [text]);

  return initialHeight;
};
