const IS_CLIENT = typeof window !== 'undefined'
  && typeof window.document !== 'undefined'
  && typeof window.document.createElement !== 'undefined';

export default IS_CLIENT;
