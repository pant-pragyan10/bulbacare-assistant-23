
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const HuggingFaceApiKeyInput = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    const savedKey = localStorage.getItem("hf_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setSaved(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    localStorage.setItem("hf_api_key", apiKey.trim());
    setSaved(true);
    toast.success("API key saved successfully");
  };

  const handleClear = () => {
    localStorage.removeItem("hf_api_key");
    setApiKey("");
    setSaved(false);
    toast.info("API key cleared");
  };

  if (saved) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm text-green-700 dark:text-green-300">Hugging Face API key is set</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleClear}>
          Clear Key
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-950/30">
      <div className="flex items-start mb-3">
        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-300">
          You need a Hugging Face API key to use the skin disease detection model. 
          <a 
            href="https://huggingface.co/settings/tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
          >
            Get your API key here
          </a>.
        </div>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="password"
            placeholder="Enter your Hugging Face API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSaveKey}>Save Key</Button>
      </div>
    </div>
  );
};

export default HuggingFaceApiKeyInput;
