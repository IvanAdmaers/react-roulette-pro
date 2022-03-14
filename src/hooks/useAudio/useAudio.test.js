import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import sound from '../../../example/src/sounds/rickroll.mp3';

import useAudio from '.';

describe('useAudio hook', () => {
  it('should not playing on start', () => {
    const Component = () => {
      const { isPlaying } = useAudio(sound);

      return <p>Is palying: {`${isPlaying}`}</p>;
    };

    render(<Component />);

    expect(screen.getByText(/false/i));
  });

  it('should start playing after clicking the button', () => {
    const Component = () => {
      const { isPlaying, start } = useAudio(sound);

      const handlePlay = () => {
        start();
      };

      return (
        <>
          <button onClick={handlePlay} type="button">
            Play
          </button>
          <p>Is palying: {`${isPlaying}`}</p>
        </>
      );
    };

    render(<Component />);

    window.HTMLMediaElement.prototype.play = () => null;

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/true/i));
  });
});
