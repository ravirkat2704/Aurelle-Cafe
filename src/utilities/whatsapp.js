import { business } from '../config/business.js';

export const buildWhatsAppLink = (text = '') => `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(text)}`;

export const waMessages = {
  general: 'Hello AURELLE, I have a general enquiry.',
  banquet: 'Hello AURELLE, I would like to enquire about hosting a celebration at your banquet space.',
  menu: 'Hello AURELLE, I have a question about your menu.',
};
