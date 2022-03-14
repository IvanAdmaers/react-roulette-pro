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

  it('should start and stop playing sound', () => {
    const Component = () => {
      const { isPlaying, start, stop } = useAudio(sound);

      const handlePlay = () => {
        start();
      };

      const handleStop = () => {
        stop();
      };

      return (
        <>
          <button onClick={handlePlay} type="button">
            Play
          </button>
          <button onClick={handleStop} type="button">
            Stop
          </button>
          <p>Is palying: {`${isPlaying}`}</p>
        </>
      );
    };

    render(<Component />);

    window.HTMLMediaElement.prototype.play = () => null;
    window.HTMLMediaElement.prototype.pause = () => null;

    const [startButton, stopButton] = screen.getAllByRole('button');

    userEvent.click(startButton);

    expect(screen.getByText(/true/i));

    userEvent.click(stopButton);

    expect(screen.getByText(/false/i));
  });
});
