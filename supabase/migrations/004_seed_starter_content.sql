update public.site_settings
set
  site_name = 'Shekinah Books',
  tagline = 'Faith-filled books for marriage, purpose, and Christian living.',
  hero_headline = 'Pastor Awe',
  hero_subheadline = 'Faith-filled books for marriage, purpose, and Christian living.',
  hero_cta_text = 'Browse Books',
  hero_trust_cue = 'Biblical encouragement and practical wisdom for families, leaders, and believers.',
  author_name = 'Pastor Awe',
  about_bio = 'Pastor Awe has served in Christian ministry for about 30 years, teaching, counselling, and helping believers grow in faith, family life, and purpose. Replace this placeholder with the final approved biography, ministry history, church affiliation, awards, and personal testimony.',
  whatsapp = '2348000000000',
  email = 'hello@example.com',
  facebook = 'https://facebook.com/YOUR-PAGE',
  instagram = 'https://instagram.com/YOUR-HANDLE',
  youtube = 'https://youtube.com/@YOUR-CHANNEL',
  footer_text = 'Faith-filled books for marriage, purpose, and Christian living.'
where id = 1;

insert into public.books (
  slug,
  title,
  subtitle,
  description,
  audience,
  benefits,
  price,
  currency,
  price_display,
  selar_url,
  amazon_url,
  featured,
  status,
  sort_order
) values
  (
    'i-said-yes',
    'I Said Yes',
    'A Christian testimony on marriage, courtship, and covenant',
    'A faith-filled book on Christian marriage, courtship, and the testimony behind a covenant decision. It speaks to readers who want a Christ-centred view of choosing, preparing, and saying yes with conviction. Replace this draft description with the final back-cover copy, endorsements, and exact reader promise before launch.',
    'Single adults, engaged couples, marriage counsellors, and believers seeking biblical wisdom for courtship and covenant decisions.',
    array[
      'Understand courtship through a Christian and pastoral lens.',
      'Reflect on testimony, timing, and conviction before marriage.',
      'Gain discussion points for couples, families, and premarital classes.'
    ],
    3000,
    'NGN',
    'NGN 3000 / USD 9.99',
    'https://selar.com/YOUR-I-SAID-YES-LINK',
    'https://amazon.com/YOUR-I-SAID-YES-KDP-LINK',
    true,
    'published',
    1
  ),
  (
    'book-two',
    'Book Two',
    'Placeholder title for the next publication',
    'Use this placeholder to preview the books grid while the client confirms the final title, cover, pricing, and purchase links. Add the real description when the book details are ready.',
    'Replace this with the exact audience for the second book, such as parents, leaders, couples, or new believers.',
    array[
      'Replace with the first clear reader outcome.',
      'Replace with the second clear reader outcome.',
      'Replace with the third clear reader outcome.'
    ],
    null,
    'NGN',
    'Price coming soon',
    'https://selar.com/YOUR-BOOK-TWO-LINK',
    'https://amazon.com/YOUR-BOOK-TWO-KDP-LINK',
    false,
    'draft',
    2
  ),
  (
    'book-three',
    'Book Three',
    'Placeholder title for another book',
    'This card is intentionally driven by data only. Replace this object with the real book information, and the grid will update without editing the BookCard or Books page.',
    'Replace this with the exact audience for the third book.',
    array[
      'Replace with the first benefit or lesson.',
      'Replace with the second benefit or lesson.',
      'Replace with the third benefit or lesson.'
    ],
    null,
    'NGN',
    'Price coming soon',
    'https://selar.com/YOUR-BOOK-THREE-LINK',
    null,
    false,
    'draft',
    3
  )
on conflict (slug) do update
set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  audience = excluded.audience,
  benefits = excluded.benefits,
  price = excluded.price,
  currency = excluded.currency,
  price_display = excluded.price_display,
  selar_url = excluded.selar_url,
  amazon_url = excluded.amazon_url,
  featured = excluded.featured,
  status = excluded.status,
  sort_order = excluded.sort_order;

insert into public.testimonials (book_id, quote, name, role, status, sort_order)
select null, 'A timely voice for homes and believers who want biblical wisdom in plain, practical language.', 'Reader testimonial', null, 'published', 1
where not exists (
  select 1 from public.testimonials
  where book_id is null and quote = 'A timely voice for homes and believers who want biblical wisdom in plain, practical language.'
);

insert into public.testimonials (book_id, quote, name, role, status, sort_order)
select b.id, 'A sincere and pastoral guide for anyone thinking seriously about Christian marriage.', 'Early reader', null, 'published', 1
from public.books b
where b.slug = 'i-said-yes'
and not exists (
  select 1 from public.testimonials t
  where t.book_id = b.id and t.quote = 'A sincere and pastoral guide for anyone thinking seriously about Christian marriage.'
);
