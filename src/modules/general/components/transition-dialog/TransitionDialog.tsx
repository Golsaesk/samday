import React from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps, } from '@mui/material/transitions';

const TransitionDialogUp =
  React.forwardRef((props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>): JSX.Element => <Slide direction="up" ref={ref} {...props} />);

const TransitionDialogLeft =
  React.forwardRef((props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>): JSX.Element => <Slide direction="right" ref={ref} {...props} />);

TransitionDialogUp.displayName = 'TransitionDialogUp';
TransitionDialogLeft.displayName = 'TransitionDialogLeft';

export { TransitionDialogLeft, TransitionDialogUp, };
