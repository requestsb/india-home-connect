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
      localities: {
        Row: {
          city: string
          id: number
          locality: string
        }
        Insert: {
          city: string
          id?: number
          locality: string
        }
        Update: {
          city?: string
          id?: number
          locality?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          supplier_type: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          supplier_type?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          supplier_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      property: {
        Row: {
          amenities: string[] | null
          Bathrooms: number | null
          bedrooms: string | null
          city: string | null
          "Covered Area (sq.ft)": number | null
          created_at: string
          description: string | null
          facing: string | null
          "Floor Number": number | null
          furnishing: string | null
          id: number
          listing_type: string | null
          locality: string | null
          ownership: string | null
          "Possession Status": string | null
          price: number | null
          "Property Type": string | null
          property_category: string | null
          sale_type: string | null
          sub_property_type: string | null
          supplier_type: string | null
          title: string | null
          "Total Floors": number | null
          user_id: string | null
        }
        Insert: {
          amenities?: string[] | null
          Bathrooms?: number | null
          bedrooms?: string | null
          city?: string | null
          "Covered Area (sq.ft)"?: number | null
          created_at?: string
          description?: string | null
          facing?: string | null
          "Floor Number"?: number | null
          furnishing?: string | null
          id?: number
          listing_type?: string | null
          locality?: string | null
          ownership?: string | null
          "Possession Status"?: string | null
          price?: number | null
          "Property Type"?: string | null
          property_category?: string | null
          sale_type?: string | null
          sub_property_type?: string | null
          supplier_type?: string | null
          title?: string | null
          "Total Floors"?: number | null
          user_id?: string | null
        }
        Update: {
          amenities?: string[] | null
          Bathrooms?: number | null
          bedrooms?: string | null
          city?: string | null
          "Covered Area (sq.ft)"?: number | null
          created_at?: string
          description?: string | null
          facing?: string | null
          "Floor Number"?: number | null
          furnishing?: string | null
          id?: number
          listing_type?: string | null
          locality?: string | null
          ownership?: string | null
          "Possession Status"?: string | null
          price?: number | null
          "Property Type"?: string | null
          property_category?: string | null
          sale_type?: string | null
          sub_property_type?: string | null
          supplier_type?: string | null
          title?: string | null
          "Total Floors"?: number | null
          user_id?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
