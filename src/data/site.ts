export type SiteConfig = {
  pastorName: string;
  wordmark: string;
  tagline: string;
  shortIntro: string;
  bio: string;
  missionStatement: string;
  portraitImage: string;
  contactEmail: string;
  whatsappNumber: string;
  domain: string;
  emailSignupAction: string;
  credibility: {
    ministry: string;
    books: string;
    teaching: string;
    family: string;
  };
  testimonials: {
    quote: string;
    name: string;
  }[];
};

export const siteConfig: SiteConfig = {
  pastorName: "Pastor Akinwumi Awe", // TODO: confirm full display name
  wordmark: "Mikehelens Manuscripts & Publications",
  tagline: "Christian books, testimonies, and faith-building manuscripts.",
  shortIntro:
    "Pastor Akinwumi Awe writes from decades of ministry experience, offering biblical encouragement and practical wisdom for families, leaders, and believers seeking to live faithfully.", // TODO: confirm
  bio:
    "Pastor Akinwumi Awe has served in Christian ministry for about 30 years, teaching, counselling, and helping believers grow in faith, family life, and purpose. Replace this placeholder with the final approved biography, ministry history, church affiliation, awards, and personal testimony.", // TODO: confirm
  missionStatement:
    "To publish accessible Christian manuscripts that strengthen homes, deepen faith, and point readers back to God's word in everyday life.", // TODO: confirm
  portraitImage: "/images/pastor-awe-placeholder.svg", // TODO: confirm real portrait
  contactEmail: "hello@mikehelens.com", // TODO: confirm
  whatsappNumber: "2348000000000", // TODO: confirm
  domain: "https://mikehelens.com",
  emailSignupAction: "https://example.com/email-provider-embed", // TODO: confirm email provider
  credibility: {
    ministry:
      "For over 30 years, Pastor Akinwumi Awe has led God's people with wisdom and spiritual insight, since first receiving his call to ministry in 1996 and entering full-time ministry in 2000 after seminary training at Christ Apostolic Church Theological Seminary, Ile-Ife.",
    books:
      "Pastor Awe's teaching ministry has produced Strange Altars and I Said Yes, drawn from a personal sermon archive of over 2,000 messages — with more titles currently in development.",
    teaching:
      "Pastor Awe is currently pursuing a Master's in Organisational Leadership and has walked alongside couples and church leaders through real pastoral conflict resolution and spiritual formation training.",
    family:
      "Pastor Akinwumi and Pastor (Mrs) Oluwafayokemi Helen Awe co-founded Shekinah International Academy together and share their own story of divine guidance in marriage in their book, I Said Yes.",
  },
  testimonials: [
    {
      quote:
        "A timely voice for homes and believers who want biblical wisdom in plain, practical language.",
      name: "Reader testimonial", // TODO: confirm
    },
    {
      quote:
        "The writing feels pastoral, sincere, and grounded in real ministry experience.",
      name: "Church leader", // TODO: confirm
    },
    {
      quote:
        "Helpful for couples, families, and young adults seeking a Christ-centred foundation.",
      name: "Marriage class participant", // TODO: confirm
    },
    {
      quote:
        "Warm, direct, and easy to share with someone preparing for a godly home.",
      name: "Early reader", // TODO: confirm
    },
  ],
};
