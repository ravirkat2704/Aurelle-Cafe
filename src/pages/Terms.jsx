import Legal from './Legal';

const sections = [
  { h: 'Use of this website', p: 'This website provides information about our café, kitchen and banquet services. Content is for general information and may change without notice.' },
  { h: 'Menu and pricing', p: 'Menu items, descriptions, prices and availability are subject to change. Images are illustrative and may differ from what is served.' },
  { h: 'Enquiries and events', p: 'Submitting an enquiry does not confirm a booking. Event dates, packages and pricing are confirmed only by our team in writing.' },
  { h: 'Allergies', p: 'Please tell our team about any food allergies or dietary needs before ordering. Ingredient information is confirmed by the kitchen.' },
  { h: 'Contact', p: '[Business legal name], [verified address], [business contact email].' },
];
export default function Terms() {
  return <Legal title="Terms & Conditions" path="/terms-and-conditions" intro="By using this website you agree to the following terms." sections={sections} />;
}
