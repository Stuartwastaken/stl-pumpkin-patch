import { Heart, Leaf, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              STL Pumpkins
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Bringing locally sourced fall magic to Saint Louis, one porch at a time. 
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>📧 <a href="mailto:stlpumpkinsdelivery@gmail.com" className="hover:text-primary-foreground transition-colors underline underline-offset-2">stlpumpkinsdelivery@gmail.com</a></p>
              <p>📍 Serving Saint Louis & Surrounding Areas</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                <a 
                  href="https://www.facebook.com/share/1Pr2ptyT4K/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors underline underline-offset-2"
                >
                  STL Pumpkins on Facebook
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <a 
                  href="https://instagram.com/stlpumpkinsdelivery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors underline underline-offset-2"
                >
                  @stlpumpkinsdelivery
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <a 
                  href="https://instagram.com/natalieptaylorr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors underline underline-offset-2"
                >
                  @natalieptaylorr
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400" /> by a local college entrepreneur
          </p>
          <p className="text-primary-foreground/60 mt-2 text-sm">
            © {new Date().getFullYear()} STL Pumpkins. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;