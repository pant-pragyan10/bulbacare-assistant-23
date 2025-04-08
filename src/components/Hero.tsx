
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzQkEzRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDN2M2gtM3ptMC0xN2gzdjNoLTN6TTE3IDM0aDN2M2gtM3pNMCAxN2gzdjNoLTN6TTA7leSA9ICJub25lIj4KICAgICAgPHRpdGxlPkNvZGljb248L3RpdGxlPgogICAgICA8cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yIDhsNCA0LTQgNCIgLz4KICAgIDwvc3ZnPg==')] opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-bulba-600 to-mint-500 dark:from-green-500 dark:to-green-600 bg-clip-text text-transparent">
              BulbaCare
            </span>
          </h1>
          
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-2">
            <Shield className="h-3.5 w-3.5" />
            <span>AI-Powered Healthcare</span>
          </div>
          
          <h2 className="heading-xl text-foreground">
            Your AI Healthcare Assistant
            <br />
            <span className="bg-gradient-to-r from-primary to-mint-500 dark:from-green-500 dark:to-green-600 bg-clip-text text-transparent pb-2 inline-block">
              For Everyone
            </span>
          </h2>
          
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
              src="/lovable-uploads/ece786d7-f4ab-4dce-8ea7-25b26e03058c.png" 
              alt="Healthcare professional with patient" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
