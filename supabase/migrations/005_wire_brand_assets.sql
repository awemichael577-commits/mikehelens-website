update public.site_settings
set
  site_name = 'Shekinah Books',
  tagline = 'Faith-building books for Christian readers, families, and ministry-minded believers.',
  hero_headline = 'Faith-building books for the journey of life',
  hero_subheadline = 'Books by Pastor Akinwumi Awe written to strengthen faith, guide families, and encourage believers with practical spiritual insight.',
  hero_cta_text = 'Explore the books',
  hero_trust_cue = 'Secure purchase links | WhatsApp support | Faith and family resources',
  hero_image_path = '/assets/author-square.png',
  author_name = 'Pastor Akinwumi Awe',
  portrait_path = '/assets/author-full.png',
  footer_text = 'Faith-building books for Christian readers, families, and ministry-minded believers.'
where id = 1;

update public.books
set
  title = 'I Said Yes',
  subtitle = 'How God Led Us Together',
  description = 'A testimony of divine guidance, love, faith, and God''s faithful provision in marriage.',
  audience = 'For: couples, families, and Christian readers',
  benefits = array[
    'Understand how divine guidance can shape marriage and destiny.',
    'Learn faith lessons from a real Christian marriage testimony.',
    'Receive encouragement for trusting God in relationship decisions.'
  ],
  price = 5000,
  currency = 'NGN',
  price_display = '₦5,000',
  featured = true,
  status = 'published',
  sort_order = 1
where slug = 'i-said-yes';

update public.books
set
  title = 'Strange Altars',
  subtitle = 'A Journey to the Places Where Transformation Begins',
  description = 'A spiritual guide to understanding foundations, confronting ungodly altars, and walking in God''s transforming power.',
  audience = 'For: believers, families, and prayer-minded readers',
  benefits = array[
    'Understand spiritual foundations with clarity.',
    'Confront ungodly altars through biblical insight.',
    'Walk in God''s transforming power with renewed faith.'
  ],
  price = 4000,
  currency = 'NGN',
  price_display = '₦4,000',
  status = 'published',
  sort_order = 2
where slug = 'strange-altars';
