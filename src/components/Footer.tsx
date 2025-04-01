
import { Link } from "react-router-dom";
import { HeartPulse, Mail, Shield, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-foreground">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-bulba-500 to-mint-400 flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-semibold text-xl">BulbaCare</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              BulbaCare combines cutting-edge AI technology with healthcare expertise to provide accessible, reliable health assessments and support.
            </p>
            <div className="flex mt-6 space-x-5">
              <a href="https://github.com/pant-pragyan10/BulbaCare" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Services</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/image-analysis" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Skin Disease Analysis
                </Link>
              </li>
              <li>
                <Link to="/image-analysis" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Eye Disease Detection
                </Link>
              </li>
              <li>
                <Link to="/mental-health" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Mental Health Support
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Health Records
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Medical Team
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  AI Technology
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BulbaCare. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Shield className="h-4 w-4 mr-1.5" />
              <span>Privacy Policy</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <HeartPulse className="h-4 w-4 mr-1.5" />
              <span>Terms of Service</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-1.5" />
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
