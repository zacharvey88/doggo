export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accommodation: {
        Row: {
          accommodation_id: number
          address: string
          booking_url: string
          city: string
          country: string
          created_at: string
          description: string
          phone: string | null
          photos: Json
          postcode: string
          state: string | null
          title: string
          user_id: string
        }
        Insert: {
          accommodation_id?: number
          address: string
          booking_url: string
          city: string
          country: string
          created_at?: string
          description: string
          phone?: string | null
          photos: Json
          postcode: string
          state?: string | null
          title: string
          user_id: string
        }
        Update: {
          accommodation_id?: number
          address?: string
          booking_url?: string
          city?: string
          country?: string
          created_at?: string
          description?: string
          phone?: string | null
          photos?: Json
          postcode?: string
          state?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      airlines: {
        Row: {
          airline_id: number
          airline_logo_url: string | null
          airline_name: string
          airline_pet_policy_url: string
          pet_policy_cabin: string | null
          pet_policy_cargo: string | null
          pet_policy_checked_baggage: string | null
          pet_policy_guidelines: string | null
          pet_policy_reservations: string | null
          pet_policy_restrictions: string | null
        }
        Insert: {
          airline_id?: number
          airline_logo_url?: string | null
          airline_name: string
          airline_pet_policy_url: string
          pet_policy_cabin?: string | null
          pet_policy_cargo?: string | null
          pet_policy_checked_baggage?: string | null
          pet_policy_guidelines?: string | null
          pet_policy_reservations?: string | null
          pet_policy_restrictions?: string | null
        }
        Update: {
          airline_id?: number
          airline_logo_url?: string | null
          airline_name?: string
          airline_pet_policy_url?: string
          pet_policy_cabin?: string | null
          pet_policy_cargo?: string | null
          pet_policy_checked_baggage?: string | null
          pet_policy_guidelines?: string | null
          pet_policy_reservations?: string | null
          pet_policy_restrictions?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          is_host: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_host?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_host?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey1"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews_accommodation: {
        Row: {
          accommodation_id: number
          created_at: string
          rating: number
          review_id: number
          review_text: string
          user_id: string
        }
        Insert: {
          accommodation_id: number
          created_at?: string
          rating: number
          review_id?: number
          review_text: string
          user_id: string
        }
        Update: {
          accommodation_id?: number
          created_at?: string
          rating?: number
          review_id?: number
          review_text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews_airlines: {
        Row: {
          airline_id: number
          created_at: string
          rating: number
          review_id: number
          review_text: string
          user_id: string
        }
        Insert: {
          airline_id: number
          created_at?: string
          rating: number
          review_id?: number
          review_text: string
          user_id: string
        }
        Update: {
          airline_id?: number
          created_at?: string
          rating?: number
          review_id?: number
          review_text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_airlines_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["airline_id"]
          },
          {
            foreignKeyName: "reviews_airlines_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          accommodation_id: number | null
          airline_id: number | null
          created_at: string
          end_date: string | null
          start_date: string | null
          title: string
          trip_id: number
          user_id: string
        }
        Insert: {
          accommodation_id?: number | null
          airline_id?: number | null
          created_at?: string
          end_date?: string | null
          start_date?: string | null
          title: string
          trip_id?: number
          user_id: string
        }
        Update: {
          accommodation_id?: number | null
          airline_id?: number | null
          created_at?: string
          end_date?: string | null
          start_date?: string | null
          title?: string
          trip_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodation"
            referencedColumns: ["accommodation_id"]
          },
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vets: {
        Row: {
          address: string | null
          created_at: string
          id: number
          photos: Json | null
          rating: number | null
          title: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: number
          photos?: Json | null
          rating?: number | null
          title?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: number
          photos?: Json | null
          rating?: number | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
