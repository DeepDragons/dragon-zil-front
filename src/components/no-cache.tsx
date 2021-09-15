import React from 'react';

export const NoCache: React.FC = () => {
  return (
    <>
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
      <meta httpEquiv="Pragma" content="no-cache"/>
      <meta httpEquiv="Expires" content="0"/>
    </>
  );
};
