import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { submitContact } from '@/lib/email-config'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await submitContact(formData)
      
      if (result.success) {
        toast.success('Message sent successfully! We will get back to you soon.')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      content: 'Benz Circle, Patamata Lanka\nVijayawada - 520010'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '9391885317\nReservations: 9391885317'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'akirrestaurants@gmail.com\nreservations@akirrestaurants.com'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Tue-Thu: 5:30PM - 10:00PM\nFri-Sat: 5:30PM - 11:00PM\nSun-Mon: Closed'
    }
  ]

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-display font-bold text-foreground mb-6">
            Visit
            <span className="block text-gold">AKIR Restaurant</span>
          </h2>
          <p className="text-xl text-muted-foreground font-AKIR Restaurant max-w-2xl mx-auto">
            Located in the heart of the city's gourmet district, we're easily accessible and ready to provide you with an exceptional dining experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6 p-6 bg-gradient-card rounded-lg shadow-card border border-border/50"
              >
                <div className="p-3 bg-gold/10 rounded-lg">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-elegant whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-card rounded-2xl p-8 shadow-elegant border border-border/50">
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-elegant">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-background/50 border-border focus:border-gold transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-elegant">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-background/50 border-border focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground font-elegant">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="What's this about?"
                    className="bg-background/50 border-border focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-elegant">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    placeholder="Tell us how we can help you..."
                    className="bg-background/50 border-border focus:border-gold transition-colors min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="gold" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-card rounded-2xl p-8 shadow-elegant border border-border/50 h-full min-h-[500px] flex items-center justify-center">
              <div className="text-center space-y-6">
                <MapPin className="w-16 h-16 text-gold mx-auto" />
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                    Find Us
                  </h3>
                  <p className="text-muted-foreground font-elegant mb-6">
                    Conveniently located at Benz Circle, Patamata Lanka with easy access and parking available.
                  </p>
                  <div className="space-y-4 text-sm text-muted-foreground font-elegant">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      <span>Auto & Bus: Direct access from Benz Circle</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      <span>Parking available nearby</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      <span>Easy access from all parts of Vijayawada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}