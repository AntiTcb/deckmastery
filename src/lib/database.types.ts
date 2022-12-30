export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          id: number
          name: string | null
          text: string | null
          image_url: string | null
        }
        Insert: {
          id: number
          name?: string | null
          text?: string | null
          image_url?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          text?: string | null
          image_url?: string | null
        }
      }
      combo_tags: {
        Row: {
          id: number
          created_at: string | null
          combo_id: number | null
          tag_id: number | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          combo_id?: number | null
          tag_id?: number | null
        }
        Update: {
          id?: number
          created_at?: string | null
          combo_id?: number | null
          tag_id?: number | null
        }
      }
      combos: {
        Row: {
          id: number
          created_at: string | null
          replay_url: string
          title: string
          status: Database["public"]["Enums"]["replay_status"] | null
          uploaded_by: string
          description: string | null
          cards: number[] | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          replay_url: string
          title: string
          status?: Database["public"]["Enums"]["replay_status"] | null
          uploaded_by: string
          description?: string | null
          cards?: number[] | null
        }
        Update: {
          id?: number
          created_at?: string | null
          replay_url?: string
          title?: string
          status?: Database["public"]["Enums"]["replay_status"] | null
          uploaded_by?: string
          description?: string | null
          cards?: number[] | null
        }
      }
      combos_cards: {
        Row: {
          combo_id: number
          card_id: number
        }
        Insert: {
          combo_id: number
          card_id: number
        }
        Update: {
          combo_id?: number
          card_id?: number
        }
      }
      likes: {
        Row: {
          id: number
          created_at: string | null
          combo_id: number
          liked_by: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          combo_id: number
          liked_by: string
        }
        Update: {
          id?: number
          created_at?: string | null
          combo_id?: number
          liked_by?: string
        }
      }
      session: {
        Row: {
          id: string
          user_id: string | null
          expires: number
          idle_expires: number
        }
        Insert: {
          id: string
          user_id?: string | null
          expires: number
          idle_expires: number
        }
        Update: {
          id?: string
          user_id?: string | null
          expires?: number
          idle_expires?: number
        }
      }
      tags: {
        Row: {
          id: number
          name: string
          type: string
        }
        Insert: {
          id?: number
          name: string
          type: string
        }
        Update: {
          id?: number
          name?: string
          type?: string
        }
      }
      user: {
        Row: {
          id: string
          created_at: string | null
          provider_id: string
          hashed_password: string | null
          discord_email: string | null
          patreon_email: string | null
          username: string
          role: Database["public"]["Enums"]["roles"],
          is_enabled: boolean
        }
        Insert: {
          id?: string
          created_at?: string | null
          provider_id: string
          hashed_password?: string | null
          discord_email?: string | null
          patreon_email?: string | null
          username: string
          role?: Database["public"]["Enums"]["roles"]
        }
        Update: {
          id?: string
          created_at?: string | null
          provider_id?: string
          hashed_password?: string | null
          discord_email?: string | null
          patreon_email?: string | null
          username?: string
          role?: Database["public"]["Enums"]["roles"],
          is_enabled?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      search_cards: {
        Args: { card_name: string }
        Returns: {
          id: number
          name: string
          text: string
          image: string
          word_similarity: number
          strict_similarity: number
          word_dist: number
          avg_similarity: number
        }[]
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      replay_status: "approved" | "pending" | "denied"
      roles: "user" | "patron" | "editor" | "admin"
    }
  }
}
