import React from 'react';
import { profileData } from '../../types';

const withUserDetails = (Component: React.ComponentType<any>, userDetails: profileData, setUserDetails: Function) => {
  return (props: any) => <Component {...props} userDetails={userDetails} setUserDetails={setUserDetails} />;
};

export default withUserDetails;
