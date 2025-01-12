
import { Drawer, } from '@mui/material';
import styles from './CustomDrawer.module.scss';

const CustomDrawer = ({
  open,
  onClose,
  className,
  children,
}: {
  open: boolean;
  onClose: any;
  className?: string;
  children: any;
}) => {

  return (
    <Drawer
      anchor={'bottom'}
      open={open}
      onClose={onClose}
      transitionDuration={300}
      className={className ? className : ''}
      classes={{
        root: styles.root,
        paper: styles.root__paper,
      }}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;