
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "הודעה נשלחה בהצלחה!",
        description: "נחזור אליכם בהקדם האפשרי.",
      });

      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "שגיאה בשליחת ההודעה",
        description: "אנא נסו שוב מאוחר יותר.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'טלפון',
      details: '050-123-4567',
      action: 'tel:050-123-4567'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'אימייל',
      details: 'info@nmaei.com',
      action: 'mailto:info@nmaei.com'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      details: 'שליחת הודעה',
      action: 'https://wa.me/972501234567'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'אזור שירות',
      details: 'המרכז, ישראל',
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: <Instagram className="w-6 h-6" />,
      name: 'Instagram',
      url: 'https://instagram.com/nmaei_studio',
      handle: '@nmaei_studio'
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      name: 'Facebook',
      url: 'https://facebook.com/nmaei.studio',
      handle: 'NMAEI Studio'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="section-title text-gray-900 mb-6">צור קשר</h1>
            <p className="body-large text-gray-600 leading-relaxed">
              מוזמנים ליצור איתנו קשר לקבלת ייעוץ מקצועי או לתיאום פגישה
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div 
                key={index} 
                className="text-center group animate-fade-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 text-gold-600 rounded-full mb-4 group-hover:bg-gold-600 group-hover:text-white transition-colors duration-300">
                  {method.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{method.title}</h3>
                {method.action ? (
                  <a 
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 hover:text-gold-600 transition-colors duration-300"
                  >
                    {method.details}
                  </a>
                ) : (
                  <span className="text-gray-600">{method.details}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="animate-fade-up">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">שליחת הודעה</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-right">שם מלא *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="הכנס שם מלא"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-right">טלפון *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="050-123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-right">אימייל *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-right">הודעה *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 min-h-[120px]"
                      placeholder="ספרו לנו על הפרויקט שלכם..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-white"
                  >
                    {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-8 animate-fade-up" style={{animationDelay: '0.2s'}}>
              {/* Working Hours */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-medium text-gray-900 mb-4">שעות פעילות</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>ראשון - חמישי:</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>שישי:</span>
                    <span>09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>שבת:</span>
                    <span>סגור</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-medium text-gray-900 mb-4">עקבו אחרינו</h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-600 hover:text-gold-600 transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gold-100 transition-colors duration-300">
                        {social.icon}
                      </div>
                      <div>
                        <div className="font-medium">{social.name}</div>
                        <div className="text-sm text-gray-500">{social.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick WhatsApp */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">צריכים ייעוץ מהיר?</h3>
                <p className="text-gray-600 mb-4">שלחו לנו הודעה בוואטסאפ ונחזור אליכם תוך זמן קצר</p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <a 
                    href="https://wa.me/972501234567?text=שלום, אני מעוניין בייעוץ עיצוב"
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

export default Contact;
