
import { LayoutProps, } from '@modules/layout/libraries/layout-types';
import GeneralLayout from '@modules/layout/components/general-layout';

const Layout = ({ children, }: LayoutProps) => {

  return (
    <>
      <GeneralLayout>
        {children}
      </GeneralLayout>
    </>
  );
};

export default Layout;
