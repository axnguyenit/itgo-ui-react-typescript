import { createContext, ReactNode, useEffect, useState } from 'react';
import { useResponsive } from '~/hooks';

// ----------------------------------------------------------------------

interface CollapseDrawer {
  isCollapse: boolean;
  collapseClick: boolean;
  collapseHover: boolean;
  onToggleCollapse: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}

const initialState: CollapseDrawer = {
  isCollapse: false,
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
};

interface CollapseDrawerProviderProps {
  children: ReactNode;
}

const CollapseDrawerContext = createContext<CollapseDrawer>({
  ...initialState,
});

function CollapseDrawerProvider({ children }: CollapseDrawerProviderProps) {
  const isDesktop = useResponsive('up', 'lg');

  interface CollapseState {
    click: boolean;
    hover: boolean;
  }

  const [collapse, setCollapse] = useState<CollapseState>({
    click: false,
    hover: false,
  });

  useEffect(() => {
    if (!isDesktop) {
      setCollapse({
        click: false,
        hover: false,
      });
    }
  }, [isDesktop]);

  const handleToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click });
  };

  const handleHoverEnter = () => {
    if (collapse.click) setCollapse({ ...collapse, hover: true });
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
