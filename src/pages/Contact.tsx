import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
} from 'lucide-react';
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Design from '../components/design';
import { orderedDays } from '@/components/Admin/SiteWideSettings';


const Contact = () => {
  /* ---------- State ---------- */
  const [loading, setLoading] = useState(true);
  const [siteData, setSiteData] = useState<any>(null);
  const [title, setTitle] = useState({ title: '', subtitle: '' });

  const [design, setDesign] = useState({
    darkColor: { backgroundColor: '#111827' },
    lightColor: { backgroundColor: '#faf9f7' },
  });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------- Fetch Content ---------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designResult, settingsSnap] = await Promise.all([
          Design(),
          getDoc(doc(db, 'settings', 'config')),
        ]);

        setDesign(designResult);

        if (settingsSnap.exists()) {
          setSiteData(settingsSnap.data());
        } else {
          console.warn('settings/config not found');
        }

        const docRef = doc(db, 'pages', 'contect');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const blocks = data.contentBlocks || [];

          const heroTitle = blocks.find((b: any) => b.id === 'hero-title')?.content.text || '';
          const heroSubtitle = blocks.find((b: any) => b.id === 'hero-subtitle')?.content.text || '';

          setTitle({ title: heroTitle, subtitle: heroSubtitle });
        }
      } catch (err) {
        console.error('Error fetching site settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---------- Handlers ---------- */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
      });

      toast({
        title: 'הודעה נשלחה בהצלחה!',
        description: 'נחזור אליכם בהקדם האפשרי.',
      });

      setFormData({ fullName: '', phone: '', email: '', message: '' });
    } catch (err) {
      console.error('Error saving contact message:', err);
      toast({
        title: 'שגיאה בשליחת ההודעה',
        description: 'אנא נסו שוב מאוחר יותר.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- Loading State ---------- */
  if (loading || !siteData) return <div className="text-center p-10" />;

  /* ---------- Derived Data ---------- */
  const { contact, social } = siteData;

  const whatsappLink = `https://wa.me/${contact?.whatsapp?.number || ''}?text=${encodeURIComponent(contact?.whatsapp?.message || '')}`;

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'טלפון',
      details: contact?.phone,
      action: `tel:${contact?.phone}`,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'אימייל',
      details: contact?.email,
      action: `mailto:${contact?.email}`,
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      details: 'שליחת הודעה',
      action: whatsappLink,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'אזור שירות',
      details: contact?.address,
      action: '/contact',
    },
  ];

  const socialLinks = [
    {
      icon: <Instagram className="w-6 h-6" />,
      name: 'Instagram',
      url: social?.instagram,
      handle: '@nmaei_studio',
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      name: 'Facebook',
      url: social?.facebook,
      handle: 'NMAEI Studio',
    },
  ];

  /* ---------- UI ---------- */
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-24 pb-16 bg-beige-50" style={design.lightColor}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="section-title text-gray-900 mb-6">{title.title}</h1>
            <p className="body-large text-gray-600 leading-relaxed">
              {title.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map(
              (m, i) =>
                m.details && (
                  <div
                    key={i}
                    className="text-center group animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <a
                      href={m.action}
                      target={m.action.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gold-600 transition-colors duration-300"
                    >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 text-gold-600 rounded-full mb-4 transition-colors duration-300">
                      {m.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {m.title}
                    </h3>
                      {m.details}
                    </a>
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* FORM */}
            <div className="animate-fade-up">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">שליחת הודעה</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName">שם מלא *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="הכנס שם מלא"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">טלפון *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="050-123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">אימייל *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">הודעה *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="ספרו לנו על הפרויקט שלכם..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-white"
                    style={design.darkColor}
                  >
                    {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                  </Button>
                </form>
              </div>
            </div>

            {/* INFO */}
            <div className="space-y-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {/* שעות פעילות */}
              {/* <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-medium text-gray-900 mb-4">שעות פעילות</h3>
                <div className="space-y-2 text-gray-600">
                  {Object.entries(contact?.workingHours || {}).map(
                    ([day, { enabled, hours }]: any) =>
                      enabled && (
                        <div key={day} className="flex justify-between">
                          <span>{translateDay(day)}</span>
                          <span>{hours}</span>
                        </div>
                      )
                  )}
                </div>
              </div> */}
              {<div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-medium text-gray-900 mb-4">שעות פעילות</h3>
                <div className="space-y-2 text-gray-600">
                  {orderedDays.map(({key , label}) => {
                    const item = contact?.workingHours?.[key];
                    return (
                      item?.enabled && (
                        <div key={key} className="flex justify-between">
                          <span>{label}</span>
                          <span>{item.hours}</span>
                        </div>
                        )
                      );
                    })}

                </div>
              </div>}              
              


              {/* רשתות חברתיות */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-medium text-gray-900 mb-4">עקבו אחרינו</h3>
                <div className="space-y-4">
                  {socialLinks.map(
                    (s, i) =>
                      s.url && (
                        <a
                          key={i}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 text-gray-600 hover:text-gold-600 transition-colors duration-300 group"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gold-100">
                            {s.icon}
                          </div>
                          <div>
                            <div className="font-medium">{s.name}</div>
                            <div className="text-sm text-gray-500">{s.handle}</div>
                          </div>
                        </a>
                      )
                  )}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">צריכים ייעוץ מהיר?</h3>
                <p className="text-gray-600 mb-4">
                  שלחו לנו הודעה בוואטסאפ ונחזור אליכם תוך זמן קצר
                </p>
                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    שלח הודעה בוואטסאפ
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

/* ---------- Helpers ---------- */
const translateDay = (day: string): string => {
  const days: Record<string, string> = {
    sunday: 'ראשון',
    monday: 'שני',
    tuesday: 'שלישי',
    wednesday: 'רביעי',
    thursday: 'חמישי',
    friday: 'שישי',
    saturday: 'שבת',
  };
  return days[day] || day;
};

export default Contact;
