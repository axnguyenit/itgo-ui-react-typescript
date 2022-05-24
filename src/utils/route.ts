import { matchPath } from 'react-router-dom';

export function isExternalLink(path: string): boolean {
  return path.includes('http');
}

export function getActive(path: string, pathname: string): boolean {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}
