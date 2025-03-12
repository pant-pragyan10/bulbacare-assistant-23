
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  linkUrl: string;
  linkText: string;
  imageUrl: string;
};

const ServiceCard = ({
  icon,
  title,
  description,
  features,
  linkUrl,
  linkText,
  imageUrl,
}: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden border bg-card">
      <CardHeader className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <CardTitle className="text-lg text-foreground">{title}</CardTitle>
        </div>
        <CardDescription className="text-base text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-primary">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-foreground text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <div className="relative h-48 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <Link to={linkUrl}>
          <Button className="w-full group">
            <span>{linkText}</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

