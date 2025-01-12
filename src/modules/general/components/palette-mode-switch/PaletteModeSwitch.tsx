'use client';

/* eslint-disable max-len */
import Switch from '@mui/material/Switch';
import { useColorScheme, } from '@mui/material/styles';
import { setThemeCookie, } from './set-theme-cookie/SetThemeCookie';
import React, {
  useEffect, useRef, useState,
} from 'react';

export default function PaletteModeSwitch() {
  const {
    mode, setMode,
  } = useColorScheme();
  const [mounted, setMounted,] = useState(false);
  const buttonRef = useRef<HTMLInputElement>(null);
  const textboxRef = useRef<HTMLInputElement>(null);

  // useEffect to set initial state for localStorage (for SSR compatibility)
  useEffect(() => {
    setMounted(true);
    if (localStorage) {
      localStorage.setItem('mui-color-scheme-light', 'light');
      localStorage.setItem('mui-color-scheme-dark', 'dark');
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    await setThemeCookie(formData);
  };

  const submitForm = () => {
    if (buttonRef.current && textboxRef.current) {
      textboxRef.current.value = mode === 'light' ? 'dark' : 'light';
      buttonRef.current.click();
    }
  };

  const handleChangeTheme = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
    submitForm();
  };

  return (
    <>
      <Switch
        checked={mode === 'dark'}
        onChange={handleChangeTheme}
        inputProps={{
          'aria-label': 'themeSelect',
          id: 'themeSelect',
        }}
        color={'primary'}
        tabIndex={-1}
      />
      <form
        onSubmit={handleSubmit}
        style={{ display: 'none', }}
      >
        <input
          type='submit'
          ref={buttonRef}
          value={''}
        />
        <input
          type="text"
          name="mode"
          ref={textboxRef}
        />
      </form>
    </>
  );
}