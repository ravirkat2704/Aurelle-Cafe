export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());
export const normalizeMobile = (v) => String(v || '').replace(/[\s\-()]/g, '');
export const isMobile = (v) => /^(\+?91)?0?[6-9]\d{9}$/.test(normalizeMobile(v));

const parseDate = (v) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v || '')) return null;
  const d = new Date(`${v}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
};

export function validateBanquet(v) {
  const e = {};
  if (!v.fullName || v.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  if (!v.mobile) e.mobile = 'Please enter your mobile number.';
  else if (!isMobile(v.mobile)) e.mobile = 'Enter a valid 10-digit Indian mobile number.';
  if (!v.email) e.email = 'Please enter your email address.';
  else if (!isEmail(v.email)) e.email = 'Enter a valid email address.';
  if (!v.eventType) e.eventType = 'Please choose an event type.';
  const date = parseDate(v.eventDate);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const limit = new Date(today); limit.setFullYear(limit.getFullYear() + 2);
  if (!v.eventDate) e.eventDate = 'Please choose a preferred date.';
  else if (!date) e.eventDate = 'Enter a valid date.';
  else if (date < today) e.eventDate = 'Please choose a date today or later.';
  else if (date > limit) e.eventDate = 'Please choose a date within the next two years.';
  const g = Number(v.guests);
  if (!v.guests) e.guests = 'Please enter the expected number of guests.';
  else if (!Number.isInteger(g) || g < 1 || g > 5000) e.guests = 'Enter a whole number between 1 and 5000.';
  if (!v.contact) e.contact = 'Please choose how we should reach you.';
  if (v.requirements && v.requirements.length > 1000) e.requirements = 'Please keep this under 1000 characters.';
  return e;
}

export function validateGeneral(v) {
  const e = {};
  if (!v.fullName || v.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  if (!v.mobile) e.mobile = 'Please enter your mobile number.';
  else if (!isMobile(v.mobile)) e.mobile = 'Enter a valid 10-digit Indian mobile number.';
  if (v.email && !isEmail(v.email)) e.email = 'Enter a valid email address.';
  if (!v.enquiryType) e.enquiryType = 'Please choose an enquiry type.';
  if (!v.message || v.message.trim().length < 5) e.message = 'Please tell us a little about your enquiry.';
  else if (v.message.length > 1500) e.message = 'Please keep this under 1500 characters.';
  return e;
}
