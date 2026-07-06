export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          category: string | null;
          hook: string | null;
          description: string | null;
          audience: string | null;
          benefits: string[] | null;
          cover_path: string | null;
          cover_alt: string | null;
          price: number | null;
          currency: string | null;
          price_display: string | null;
          selar_url: string | null;
          amazon_url: string | null;
          featured: boolean | null;
          status: string;
          sort_order: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          category?: string | null;
          hook?: string | null;
          description?: string | null;
          audience?: string | null;
          benefits?: string[] | null;
          cover_path?: string | null;
          cover_alt?: string | null;
          price?: number | null;
          currency?: string | null;
          price_display?: string | null;
          selar_url?: string | null;
          amazon_url?: string | null;
          featured?: boolean | null;
          status?: string;
          sort_order?: number | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          category?: string | null;
          hook?: string | null;
          description?: string | null;
          audience?: string | null;
          benefits?: string[] | null;
          cover_path?: string | null;
          cover_alt?: string | null;
          price?: number | null;
          currency?: string | null;
          price_display?: string | null;
          selar_url?: string | null;
          amazon_url?: string | null;
          featured?: boolean | null;
          status?: string;
          sort_order?: number | null;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          book_id: string | null;
          quote: string;
          name: string;
          role: string | null;
          status: string;
          sort_order: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          book_id?: string | null;
          quote: string;
          name: string;
          role?: string | null;
          status?: string;
          sort_order?: number | null;
        };
        Update: {
          id?: string;
          book_id?: string | null;
          quote?: string;
          name?: string;
          role?: string | null;
          status?: string;
          sort_order?: number | null;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: number;
          site_name: string | null;
          tagline: string | null;
          hero_headline: string | null;
          hero_subheadline: string | null;
          hero_cta_text: string | null;
          hero_trust_cue: string | null;
          hero_image_path: string | null;
          author_name: string | null;
          about_bio: string | null;
          portrait_path: string | null;
          whatsapp: string | null;
          email: string | null;
          facebook: string | null;
          instagram: string | null;
          youtube: string | null;
          footer_text: string | null;
          credibility_ministry: string | null;
          credibility_books: string | null;
          credibility_teaching: string | null;
          credibility_family: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          site_name?: string | null;
          tagline?: string | null;
          hero_headline?: string | null;
          hero_subheadline?: string | null;
          hero_cta_text?: string | null;
          hero_trust_cue?: string | null;
          hero_image_path?: string | null;
          author_name?: string | null;
          about_bio?: string | null;
          portrait_path?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          facebook?: string | null;
          instagram?: string | null;
          youtube?: string | null;
          footer_text?: string | null;
          credibility_ministry?: string | null;
          credibility_books?: string | null;
          credibility_teaching?: string | null;
          credibility_family?: string | null;
        };
        Update: {
          id?: number;
          site_name?: string | null;
          tagline?: string | null;
          hero_headline?: string | null;
          hero_subheadline?: string | null;
          hero_cta_text?: string | null;
          hero_trust_cue?: string | null;
          hero_image_path?: string | null;
          author_name?: string | null;
          about_bio?: string | null;
          portrait_path?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          facebook?: string | null;
          instagram?: string | null;
          youtube?: string | null;
          footer_text?: string | null;
          credibility_ministry?: string | null;
          credibility_books?: string | null;
          credibility_teaching?: string | null;
          credibility_family?: string | null;
        };
        Relationships: [];
      };
      admins: {
        Row: { email: string };
        Insert: { email: string };
        Update: { email?: string };
        Relationships: [];
      };
      social_links: {
        Row: {
          id: string;
          platform: string;
          display_name: string;
          handle: string | null;
          url: string | null;
          description: string | null;
          category: string | null;
          icon_path: string | null;
          is_featured: boolean | null;
          show_in_footer: boolean | null;
          show_on_contact_page: boolean | null;
          status: string;
          sort_order: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          platform: string;
          display_name: string;
          handle?: string | null;
          url?: string | null;
          description?: string | null;
          category?: string | null;
          icon_path?: string | null;
          is_featured?: boolean | null;
          show_in_footer?: boolean | null;
          show_on_contact_page?: boolean | null;
          status?: string;
          sort_order?: number | null;
        };
        Update: {
          id?: string;
          platform?: string;
          display_name?: string;
          handle?: string | null;
          url?: string | null;
          description?: string | null;
          category?: string | null;
          icon_path?: string | null;
          is_featured?: boolean | null;
          show_in_footer?: boolean | null;
          show_on_contact_page?: boolean | null;
          status?: string;
          sort_order?: number | null;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          reason: string | null;
          message: string;
          status: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          reason?: string | null;
          message: string;
          status?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          reason?: string | null;
          message?: string;
          status?: string;
        };
        Relationships: [];
      };
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Views: Record<PropertyKey, never>;
    Enums: Record<PropertyKey, never>;
    CompositeTypes: Record<PropertyKey, never>;
  };
};
