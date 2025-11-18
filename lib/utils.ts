export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

export function withTrailingSlash(path: string) {
  if (!path) return '/'
  const hasExtension = path.split('?')[0]?.split('#')[0]?.includes('.')
  if (
    path === '/' ||
    path.startsWith('http') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#') ||
    path.startsWith('data:') ||
    hasExtension
  ) {
    return path
  }
  return path.endsWith('/') ? path : `${path}/`
}

export function stripTrailingSlash(path: string) {
  if (!path) return '/'
  if (path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
}


