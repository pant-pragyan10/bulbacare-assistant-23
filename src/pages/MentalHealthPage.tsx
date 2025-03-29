
import Layout from "@/components/Layout";
import MentalHealthChat from "@/components/MentalHealthChat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, BrainCircuit, Book, Heart } from "lucide-react";

const MentalHealthPage = () => {
  const resources = [
    {
      title: "Coping Strategies",
      description: "Evidence-based techniques to manage stress and anxiety.",
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      title: "Meditation Guide",
      description: "Short guided sessions for mental clarity and calm.",
      icon: <BrainCircuit className="h-5 w-5" />,
    },
    {
      title: "Self-Care Journal",
      description: "Track your mood and mental well-being over time.",
      icon: <Book className="h-5 w-5" />,
    },
    {
      title: "Support Networks",
      description: "Connect with others on similar mental health journeys.",
      icon: <Heart className="h-5 w-5" />,
    },
  ];

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2 text-center mb-8">
            <h1 className="heading-lg">Mental Health Support</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dr. Well Being, our AI mental health assistant, provides compassionate, confidential support whenever you need it. Share your thoughts and receive personalized guidance for emotional well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MentalHealthChat />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>
                    Dr. Well Being uses natural language processing to understand your concerns and provide evidence-based support.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-3 mt-1 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Share Your Thoughts</h3>
                        <p className="text-sm text-muted-foreground">
                          Describe how you're feeling in your own words, without judgment.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3 mt-1 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Receive Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Get personalized responses and coping strategies based on psychological principles.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3 mt-1 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Track Progress</h3>
                        <p className="text-sm text-muted-foreground">
                          Build on previous conversations to develop lasting mental wellness habits.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Helpful Resources</CardTitle>
                  <CardDescription>
                    Additional tools and guides to support your mental health journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resources.map((resource, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-3 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground">
                          {resource.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentalHealthPage;
