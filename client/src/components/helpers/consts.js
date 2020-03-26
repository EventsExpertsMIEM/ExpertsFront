export const DEFAULT_DATE_FORMAT_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

export const DETAILED_DATE_FORMAT_OPTIONS = {
  ...DEFAULT_DATE_FORMAT_OPTIONS,
  month: 'long',
};

export const FIELD_NAMES = {
  LOGIN: 'login',
  REGISTER: 'register',
  QUESTION: 'question',
  COMMENT: 'comment',
};

export const DEFAULT_LANGUAGE = 'ru';