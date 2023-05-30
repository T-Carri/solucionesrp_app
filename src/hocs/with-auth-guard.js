/* import { AuthGuard } from "@/guards/auth-guards";
 const withAuthGuard = (Component) => (props) => (
    <AuthGuard>
      <Component {...props} />
    </AuthGuard>
  );
 */


  

import React from 'react';
import { AuthGuard } from '@/guards/auth-guards';

const withAuthGuard = (Component) => {
  const WrappedComponent = (props) => (
    <AuthGuard>
      <Component {...props} />
    </AuthGuard>
  );

  // Asignar un nombre de visualización al componente envuelto
  WrappedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

export default withAuthGuard;