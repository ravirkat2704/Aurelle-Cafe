import Legal from './Legal';

const sections = [
  { h: 'What we collect', p: 'When you send an enquiry we collect the details you enter: name, mobile number, email address, event details and your message. We do not collect payment information on this website.' },
  { h: 'How we use it', p: 'We use your details only to respond to your enquiry and to plan events you ask us about. We do not sell your personal information.' },
  { h: 'WhatsApp and third parties', p: 'If you choose to contact us on WhatsApp or use the embedded map, those services operate under their own privacy policies.' },
  { h: 'Retention and your rights', p: 'We keep enquiry details only as long as needed to handle your request. You may ask us to correct or delete your information by contacting [business contact email].' },
  { h: 'Contact', p: '[Business legal name], [verified address]. Questions about this policy: [business contact email].' },
];
export default function Privacy() {
  return <Legal title="Privacy Policy" path="/privacy-policy" intro="This policy explains how AURELLE handles information you share through this website." sections={sections} />;
}
