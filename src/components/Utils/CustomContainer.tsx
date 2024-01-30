import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container, { ContainerProps } from '@mui/material/Container';
import { constants } from '../../constants/constants';

interface CustomContainerProps extends ContainerProps {
  children: ReactNode;
}

const CustomContainer: React.FC<CustomContainerProps> = ({ children, ...props }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          bgcolor: constants.bg_color,
          pt: "2em",
          minHeight: "95vh",
        }}
        maxWidth={false}
        disableGutters
      >
        {children}
      </Container>
    </React.Fragment>
  );
};

export default CustomContainer;
