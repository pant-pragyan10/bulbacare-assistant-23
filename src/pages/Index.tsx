
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scan, BrainCircuit, BarChart4, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    {
      icon: <Scan className="h-5 w-5" />,
      title: "Skin Disease Detection",
      description: "Upload photos of skin conditions for instant AI analysis and recommendations.",
      features: [
        "Detects common skin conditions",
        "High accuracy analysis",
        "Instant results and recommendations",
        "Track condition changes over time",
      ],
      linkUrl: "/image-analysis",
      linkText: "Check Your Skin",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      icon: <Scan className="h-5 w-5" />,
      title: "Eye Disease Detection",
      description: "Analyze eye conditions with our specialized AI models trained on ophthalmological data.",
      features: [
        "Early detection of eye conditions",
        "Analysis of retinal images",
        "Identification of common eye disorders",
        "Secure storage of eye health records",
      ],
      linkUrl: "/image-analysis",
      linkText: "Check Your Eyes",
      imageUrl: "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      icon: <BrainCircuit className="h-5 w-5" />,
      title: "Mental Health Support",
      description: "Connect with our AI-powered mental health assistant for guidance and emotional support.",
      features: [
        "24/7 conversational support",
        "Evidence-based coping strategies",
        "Private and confidential interactions",
        "Resources for ongoing mental wellness",
      ],
      linkUrl: "/mental-health",
      linkText: "Start Conversation",
      imageUrl: "https://images.unsplash.com/photo-1546074177-31bfa593f731?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Medical-Grade Accuracy",
      description: "Our AI models are trained on millions of clinically validated images to ensure reliable results you can trust.",
    },
    {
      icon: <BarChart4 className="h-5 w-5" />,
      title: "Comprehensive Analysis",
      description: "Receive detailed information about potential conditions, symptoms, causes, and recommended next steps.",
    },
    {
      icon: <BrainCircuit className="h-5 w-5" />,
      title: "Personalized Care",
      description: "Every analysis is uniquely tailored to your specific situation, with custom recommendations for your health needs.",
    },
  ];

  const testimonials = [
    {
      quote: "BulbaCare helped me identify my skin condition when I couldn't get a timely appointment with a dermatologist. The recommendations were spot-on.",
      author: "Sarah T.",
      role: "Eczema Patient",
    },
    {
      quote: "The mental health support feature has been invaluable for managing my anxiety. It's like having a supportive friend available 24/7.",
      author: "Marcus J.",
      role: "Mental Health User",
    },
    {
      quote: "As a remote worker, the eye condition detection saved me from what could have been a serious issue. I'm grateful for this technology.",
      author: "Elena M.",
      role: "Digital Professional",
    },
  ];

  return (
    <Layout>
      <Hero />
      
      {/* Services Section */}
      <section className="page-section">
        <div className="page-container">
          <div className="text-center space-y-3 mb-12">
            <h2 className="heading-md">Our Healthcare Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              BulbaCare offers a range of AI-powered healthcare services to help you understand and manage your health concerns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                linkUrl={service.linkUrl}
                linkText={service.linkText}
                imageUrl={service.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="page-section bg-accent/30">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                  <span>Why Choose BulbaCare</span>
                </div>
                <h2 className="heading-lg">Healthcare Powered by Advanced AI</h2>
                <p className="text-muted-foreground">
                  BulbaCare combines cutting-edge artificial intelligence with medical expertise to provide accessible, accurate health assessments and support.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 mt-1 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <Link to="/image-analysis">
                    <Button className="group">
                      <span>Try It Now</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80" 
                  alt="BulbaCare AI Technology" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-48 h-48 md:w-64 md:h-64 rounded-2xl hidden md:block overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581093806997-124204d4f42d?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80" 
                  alt="AI Analysis" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="glass-card absolute -top-4 -right-4 p-4 hidden md:block">
                <div className="text-xs font-medium text-muted-foreground">AI Accuracy</div>
                <div className="text-2xl font-bold">96.7%</div>
                <div className="w-full h-2 bg-muted rounded-full mt-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: '96.7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="page-section">
        <div className="page-container">
          <div className="text-center space-y-3 mb-12">
            <h2 className="heading-md">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from people who have used BulbaCare to better understand and manage their health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-6">
                <div className="text-lg font-medium mb-4">"{testimonial.quote}"</div>
                <div className="mt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="page-section">
        <div className="page-container">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent p-8 md:p-12 text-center">
            <h2 className="heading-md mb-4">Start Your Health Journey Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Take the first step towards better understanding your health with BulbaCare's AI-powered tools and support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/image-analysis">
                <Button size="lg" className="button-glow px-6">
                  <span>Analyze Skin or Eye Condition</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/mental-health">
                <Button size="lg" variant="outline" className="px-6">
                  <span>Get Mental Health Support</span>
                  <BrainCircuit className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
