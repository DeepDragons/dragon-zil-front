import React from 'react';

export const NoCache: React.FC = () => {
  return (
    <>
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
      <meta http-equiv="Pragma" content="no-cache"/>
      <meta http-equiv="Expires" content="0"/>
    </>
  );
};
