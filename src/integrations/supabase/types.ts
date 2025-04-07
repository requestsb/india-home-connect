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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
