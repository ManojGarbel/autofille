export function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('form_auto_filler_user_id');
}

export function ensureUserId(): string | null {
  if (typeof window === 'undefined') return null;
  let id = window.localStorage.getItem('form_auto_filler_user_id');
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem('form_auto_filler_user_id', id);
  }
  return id;
}
