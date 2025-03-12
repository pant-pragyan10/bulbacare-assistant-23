
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzQkEzRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDN2M2gtM3ptMC0xN2gzdjNoLTN6TTE3IDM0aDN2M2gtM3pNMCAxN2gzdjNoLTN6TTAgMzRoM3YzSDB6TTE3IDBoM3YzaC0zek0wIDBoM3YzSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-2">
            <Shield className="h-3.5 w-3.5" />
            <span>AI-Powered Healthcare</span>
          </div>
          
          <h1 className="heading-xl text-foreground">
            Your AI Healthcare Assistant
            <br />
            <span className="bg-gradient-to-r from-primary to-mint-500 bg-clip-text text-transparent pb-2 inline-block">
              For Everyone
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground">
            BulbaCare combines advanced AI with medical expertise to provide accessible skin 
            and eye disease detection, along with supportive mental health guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-8">
            <Link to="/image-analysis">
              <Button size="lg" className="button-glow px-6 h-12">
                <span>Try Disease Detection</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/mental-health">
              <Button size="lg" variant="outline" className="px-6 h-12">
                <span>Mental Health Support</span>
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 sm:mt-24 relative mx-auto max-w-5xl">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-900/10">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="BulbaCare Dashboard" 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Floating Stats Cards */}
          <div className="absolute -top-6 left-[10%] hidden md:block">
            <div className="glass-card p-4 shadow-lg w-48 animate-float">
              <div className="text-xs font-medium text-muted-foreground">Accuracy Rate</div>
              <div className="text-xl font-bold mt-1 text-foreground">96.7%</div>
              <div className="w-full h-2 bg-muted rounded-full mt-2">
                <div className="h-full bg-primary rounded-full" style={{ width: '96.7%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 right-[10%] hidden md:block">
            <div className="glass-card p-4 shadow-lg w-48 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-xs font-medium text-muted-foreground">User Satisfaction</div>
              <div className="text-xl font-bold mt-1 text-foreground">98.2%</div>
              <div className="w-full h-2 bg-muted rounded-full mt-2">
                <div className="h-full bg-mint-500 rounded-full" style={{ width: '98.2%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
