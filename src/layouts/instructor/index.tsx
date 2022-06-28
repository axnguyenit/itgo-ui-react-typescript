import React from 'react';
import Sidebar from '../components/sidebar';
import navConfig from './NavConfig';

export default function InstructorLayout() {
  return <Sidebar navConfig={navConfig} />;
}
