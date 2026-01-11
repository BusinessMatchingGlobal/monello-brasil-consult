interface NewsletterSectionProps {
  title?: string;
}

export const NewsletterSection = ({ title }: NewsletterSectionProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {title && (
            <h2 className="text-3xl font-bold text-foreground mb-6">{title}</h2>
          )}
          <div className="rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="305"
              src="https://8eaf03c4.sibforms.com/serve/MUIFAMTHRZyO0GqEO2m9Q4Y1LXu3kUQl7Tld0UIbSjOhb8Am2hD-wq9faUGkLHPDyk-QsHsISeriytm-8nTDYAntu_rqUAOpzilDz-Op1RmnLeaopGB1e3QOjhubwTcVGjNnro5Ucgvo5sx822VrFHnD74rJ31HC4Y44IhbuZVCNC5fkb0-vknV5hLcfRiCLS0yzWvDjnldnDcANyw=="
              frameBorder="0"
              scrolling="auto"
              allowFullScreen
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
              title="Newsletter Signup Form"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
